#!/usr/bin/env node

const https = require('https');
const fs = require('fs');
const path = require('path');

// CONFIGURATION
const CONFIG = {
  siteDir: './app',
  maxCoins: 500,
  batchSize: 2,
  delayMs: 3000,
  countries: ['pakistan','india','indonesia','philippines','bangladesh','malaysia','vietnam','thailand','south-korea','singapore','uae','saudi-arabia','sri-lanka','nepal','japan','china','myanmar','cambodia','hong-kong','taiwan','iran','iraq','jordan','kuwait','qatar','oman','bahrain','turkey','egypt','nigeria','kenya','ghana','south-africa','ethiopia','tanzania','cameroon','senegal','morocco','algeria','tunisia'],
  currencies: ['pkr','inr','idr','php','bdt','myr','vnd','thb','krw','sgd','aed','sar','usd','eur','gbp','jpy','cad','aud','hkd','twd','cny','try','egp','ngn','kes','brl','mxn','rub','uah','pln'],
  years: ['2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035','2040','2050'],
  coinGeckoApi: 'https://api.coingecko.com/api/v3',
  cacheDir: '.cache'
};

// COLORS FOR CONSOLE OUTPUT
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// UTILITY FUNCTIONS
function log(message, color = 'white') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logError(message) {
  log(`ERROR: ${message}`, 'red');
}

function logSuccess(message) {
  log(`SUCCESS: ${message}`, 'green');
}

function logInfo(message) {
  log(`INFO: ${message}`, 'cyan');
}

function logWarning(message) {
  log(`WARNING: ${message}`, 'yellow');
}

function showSpinner(message) {
  process.stdout.write(`${colors.cyan}${message}...${colors.reset}`);
}

function hideSpinner() {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
}

// ENSURE CACHE DIRECTORY EXISTS
function ensureCacheDir() {
  if (!fs.existsSync(CONFIG.cacheDir)) {
    fs.mkdirSync(CONFIG.cacheDir, { recursive: true });
  }
}

// FETCH JSON HELPER USING HTTPS MODULE
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'CryptoAsia-Generator/1.0 (https://cryptoasia.com; contact@cryptoasia.com)'
      }
    };
    
    https.get(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          
          // Check for rate limit error
          if (jsonData && jsonData.status && jsonData.status.error_code === 429) {
            reject(new Error(`Rate limit exceeded: ${JSON.stringify(jsonData)}`));
          } else {
            resolve(jsonData);
          }
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error.message}. Raw response: ${data.substring(0, 200)}`));
        }
      });
    }).on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });
  });
}

// DELAY FUNCTION
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// GET COINS LIST WITH CACHING
async function getCoinsList(max = CONFIG.maxCoins) {
  const cacheFile = path.join(CONFIG.cacheDir, 'coins.json');
  const cacheTime = 60 * 60 * 1000; // 1 hour
  
  // Check cache
  if (fs.existsSync(cacheFile)) {
    const stats = fs.statSync(cacheFile);
    const age = Date.now() - stats.mtime;
    
    if (age < cacheTime) {
      logInfo('Loading coins from cache...');
      const cachedData = fs.readFileSync(cacheFile, 'utf8');
      const coins = JSON.parse(cachedData);
      logSuccess(`Loaded ${coins.length} coins from cache`);
      return coins;
    }
  }
  
  // Fetch fresh data with batching and retry logic
  logInfo(`Fetching ${max} coins from CoinGecko API...`);
  showSpinner('Downloading');
  
  try {
    const allCoins = [];
    const batchSize = 2; // Use 2 pages of 250 coins each
    const coinsPerBatch = 250;
    let fetchedCount = 0;
    
    for (let page = 1; page <= batchSize; page++) {
      let pageSuccess = false;
      let lastError = null;
      
      // Retry logic: try 3 times with 10 second delays
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          logInfo(`Fetching page ${page} of ${batchSize} (attempt ${attempt}/3)...`);
          
          const markets = await fetchJSON(`${CONFIG.coinGeckoApi}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerBatch}&page=${page}`);
          
          // Validate response
          if (!Array.isArray(markets)) {
            throw new Error(`Invalid API response on page ${page}: expected array, got ${typeof markets}. Response: ${JSON.stringify(markets).substring(0, 200)}`);
          }
          
          const batchCoins = markets.map(coin => ({
            id: coin.id,
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            current_price: coin.current_price,
            market_cap: coin.market_cap,
            market_cap_rank: coin.market_cap_rank,
            price_change_percentage_24h: coin.price_change_percentage_24h,
            total_volume: coin.total_volume,
            circulating_supply: coin.circulating_supply,
            last_updated: coin.last_updated
          }));
          
          allCoins.push(...batchCoins);
          fetchedCount += batchCoins.length;
          
          logSuccess(`Page ${page}: fetched ${batchCoins.length} coins (total: ${fetchedCount})`);
          pageSuccess = true;
          break; // Success, exit retry loop
          
        } catch (error) {
          lastError = error;
          logError(`Page ${page} attempt ${attempt} failed: ${error.message}`);
          
          // If this is the last attempt, don't wait
          if (attempt < 3) {
            logWarning(`Waiting 10 seconds before retry...`);
            await delay(10000); // 10 second delay
          }
        }
      }
      
      if (!pageSuccess) {
        logError(`Failed to fetch page ${page} after 3 attempts: ${lastError.message}`);
        continue; // Continue with next page
      }
      
      // Add delay between API calls to avoid rate limiting
      if (page < batchSize) {
        logInfo(`Waiting ${CONFIG.delayMs/1000} seconds before next request...`);
        await delay(CONFIG.delayMs);
      }
      
      // Stop if we have enough coins
      if (allCoins.length >= max) {
        break;
      }
    }
    
    // Trim to exact max if we got more
    const finalCoins = allCoins.slice(0, max);
    
    if (finalCoins.length === 0) {
      throw new Error('No coins could be fetched from API');
    }
    
    // Save to cache
    ensureCacheDir();
    fs.writeFileSync(cacheFile, JSON.stringify(finalCoins, null, 2));
    
    hideSpinner();
    logSuccess(`Successfully fetched ${finalCoins.length} coins from CoinGecko API`);
    return finalCoins;
    
  } catch (error) {
    hideSpinner();
    logError(`Failed to fetch coins: ${error.message}`);
    
    // Fallback to cache if available
    if (fs.existsSync(cacheFile)) {
      logWarning('Using cached data as fallback');
      const cachedData = fs.readFileSync(cacheFile, 'utf8');
      const coins = JSON.parse(cachedData);
      logSuccess(`Loaded ${coins.length} coins from cache as fallback`);
      return coins;
    }
    
    // Last resort: use minimal mock data
    logWarning('Using minimal mock data as last resort');
    const mockCoins = [
      { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', current_price: 45000, market_cap: 880000000000, market_cap_rank: 1, price_change_percentage_24h: 2.5, total_volume: 28000000000, circulating_supply: 19000000, last_updated: new Date().toISOString() },
      { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', current_price: 2800, market_cap: 336000000000, market_cap_rank: 2, price_change_percentage_24h: 1.8, total_volume: 15000000000, circulating_supply: 120000000, last_updated: new Date().toISOString() },
      { id: 'tether', symbol: 'USDT', name: 'Tether', current_price: 1, market_cap: 95000000000, market_cap_rank: 3, price_change_percentage_24h: 0.1, total_volume: 45000000000, circulating_supply: 95000000000, last_updated: new Date().toISOString() },
      { id: 'binancecoin', symbol: 'BNB', name: 'BNB', current_price: 320, market_cap: 49000000000, market_cap_rank: 4, price_change_percentage_24h: 1.2, total_volume: 1200000000, circulating_supply: 153000000, last_updated: new Date().toISOString() },
      { id: 'solana', symbol: 'SOL', name: 'Solana', current_price: 105, market_cap: 45000000000, market_cap_rank: 5, price_change_percentage_24h: 3.1, total_volume: 2100000000, circulating_supply: 429000000, last_updated: new Date().toISOString() }
    ];
    
    logSuccess(`Using mock data: ${mockCoins.length} coins`);
    return mockCoins;
  }
}

// UPDATE GENERATE STATIC PARAMS IN A FILE
function updateGenerateStaticParams(filePath, params) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Always update generateStaticParams function - remove existing if present
    const existingFunctionRegex = /export async function generateStaticParams\(\)\s*\{[\s\S]*?^\}/gm;
    content = content.replace(existingFunctionRegex, '');
    
    logInfo(`Updating generateStaticParams in ${filePath}...`);
    
    // Find the position to insert the function (after exports, before other functions)
    const insertPosition = content.indexOf('export async function generateMetadata');
    
    if (insertPosition === -1) {
      logError(`Could not find insertion point in ${filePath}`);
      return false;
    }
    
    // Generate new params array
    const paramsString = params.map(param => {
      if (typeof param === 'string') {
        return `    { slug: '${param}' }`;
      } else if (typeof param === 'object') {
        const entries = Object.entries(param).map(([key, value]) => `      ${key}: '${value}'`);
        return `    { ${entries.join(', ')} }`;
      }
    }).join(',\n');
    
    // Create the new function
    const newFunction = `export async function generateStaticParams() {
  return [
${paramsString}
  ]
}

`;
    
    // Insert the function
    content = content.slice(0, insertPosition) + newFunction + content.slice(insertPosition);
    
    fs.writeFileSync(filePath, content);
    return true;
    
  } catch (error) {
    logError(`Failed to update ${filePath}: ${error.message}`);
    return false;
  }
}

// GENERATE COIN PAGES
function generateCoinPages(coins) {
  logInfo('Generating coin pages...');
  
  const filePath = path.join(CONFIG.siteDir, 'coins/[slug]/page.js');
  const params = coins.slice(0, 100).map(coin => coin.id); // Top 100 coins
  
  const success = updateGenerateStaticParams(filePath, params);
  if (success) {
    logSuccess(`Generated ${params.length} coin pages`);
  }
  
  return success;
}

// GENERATE BUY PAGES
function generateBuyPages(coins) {
  logInfo('Generating buy pages...');
  
  const filePath = path.join(CONFIG.siteDir, 'buy/[coin]/[country]/page.js');
  const params = [];
  
  // Top 200 coins x all countries
  const topCoins = coins.slice(0, 200);
  topCoins.forEach(coin => {
    CONFIG.countries.forEach(country => {
      params.push({ coin: coin.id, country });
    });
  });
  
  const success = updateGenerateStaticParams(filePath, params);
  if (success) {
    logSuccess(`Generated ${params.length} buy pages`);
  }
  
  return success;
}

// GENERATE PRICE PAGES
function generatePricePages(coins) {
  logInfo('Generating price pages...');
  
  const filePath = path.join(CONFIG.siteDir, 'price/[coin]/[currency]/page.js');
  const params = [];
  
  // All 500 coins x all currencies
  const allCoins = coins.slice(0, 500);
  allCoins.forEach(coin => {
    CONFIG.currencies.forEach(currency => {
      params.push({ coin: coin.id, currency });
    });
  });
  
  const success = updateGenerateStaticParams(filePath, params);
  if (success) {
    logSuccess(`Generated ${params.length} price pages`);
  }
  
  return success;
}

// GENERATE PREDICTION PAGES
function generatePredictionPages(coins) {
  logInfo('Generating prediction pages...');
  
  const filePath = path.join(CONFIG.siteDir, 'prediction/[coin]/[year]/page.js');
  const params = [];
  
  // Top 200 coins x all years
  const topCoins = coins.slice(0, 200);
  topCoins.forEach(coin => {
    CONFIG.years.forEach(year => {
      params.push({ coin: coin.id, year });
    });
  });
  
  const success = updateGenerateStaticParams(filePath, params);
  if (success) {
    logSuccess(`Generated ${params.length} prediction pages`);
  }
  
  return success;
}

// GENERATE COMPARE PAGES
function generateComparePages(coins) {
  logInfo('Generating compare pages...');
  
  const filePath = path.join(CONFIG.siteDir, 'compare/[pair]/page.js');
  const params = [];
  
  // Top 20 coins pairs
  const topCoins = coins.slice(0, 20);
  for (let i = 0; i < topCoins.length; i++) {
    for (let j = i + 1; j < topCoins.length; j++) {
      params.push({ pair: `${topCoins[i].id}-vs-${topCoins[j].id}` });
    }
  }
  
  const success = updateGenerateStaticParams(filePath, params);
  if (success) {
    logSuccess(`Generated ${params.length} compare pages`);
  }
  
  return success;
}

// GENERATE SITEMAP
function generateSitemap(coins) {
  logInfo('Generating sitemap...');
  
  const urls = [];
  
  // Base pages
  urls.push('https://cryptoasia.com/');
  urls.push('https://cryptoasia.com/trending');
  urls.push('https://cryptoasia.com/learn');
  urls.push('https://cryptoasia.com/about');
  urls.push('https://cryptoasia.com/glossary');
  
  // Regulation pages
  CONFIG.countries.forEach(country => {
    urls.push(`https://cryptoasia.com/regulation/${country}`);
  });
  
  // Coin pages (top 100)
  coins.slice(0, 100).forEach(coin => {
    urls.push(`https://cryptoasia.com/coins/${coin.id}`);
  });
  
  // Buy pages (top 50 coins x countries)
  coins.slice(0, 50).forEach(coin => {
    CONFIG.countries.forEach(country => {
      urls.push(`https://cryptoasia.com/buy/${coin.id}/${country}`);
    });
  });
  
  // Price pages (top 100 coins x currencies)
  coins.slice(0, 100).forEach(coin => {
    CONFIG.currencies.forEach(currency => {
      urls.push(`https://cryptoasia.com/price/${coin.id}/${currency}`);
    });
  });
  
  // Prediction pages (top 50 coins x years)
  coins.slice(0, 50).forEach(coin => {
    CONFIG.years.forEach(year => {
      urls.push(`https://cryptoasia.com/prediction/${coin.id}/${year}`);
    });
  });
  
  // Compare pages (top 20 coins pairs)
  const topCoins = coins.slice(0, 20);
  for (let i = 0; i < topCoins.length; i++) {
    for (let j = i + 1; j < topCoins.length; j++) {
      urls.push(`https://cryptoasia.com/compare/${topCoins[i].id}-vs-${topCoins[j].id}`);
    }
  }
  
  // Exchange pages
  CONFIG.countries.forEach(country => {
    urls.push(`https://cryptoasia.com/exchange/${country}`);
  });
  
  // Write to file
  ensureCacheDir();
  const sitemapFile = path.join(CONFIG.cacheDir, 'sitemap-urls.txt');
  fs.writeFileSync(sitemapFile, urls.join('\n'));
  
  logSuccess(`Generated sitemap with ${urls.length} URLs`);
  return true;
}

// SHOW STATUS
function showStatus() {
  log('\n=== CRYPTOASIA GENERATOR STATUS ===', 'bright');
  
  // Check cache
  const coinsCacheFile = path.join(CONFIG.cacheDir, 'coins.json');
  if (fs.existsSync(coinsCacheFile)) {
    const stats = fs.statSync(coinsCacheFile);
    const age = Math.floor((Date.now() - stats.mtime) / (1000 * 60 * 60));
    const coins = JSON.parse(fs.readFileSync(coinsCacheFile, 'utf8'));
    log(`Coins cache: ${coins.length} coins (${age}h old)`, 'green');
  } else {
    log('Coins cache: Not found', 'yellow');
  }
  
  // Check sitemap
  const sitemapFile = path.join(CONFIG.cacheDir, 'sitemap-urls.txt');
  if (fs.existsSync(sitemapFile)) {
    const urls = fs.readFileSync(sitemapFile, 'utf8').split('\n').filter(url => url.trim());
    log(`Sitemap: ${urls.length} URLs`, 'green');
  } else {
    log('Sitemap: Not generated', 'yellow');
  }
  
  // Check page files
  const pageFiles = [
    { name: 'Coin pages', path: 'coins/[slug]/page.js', count: 100 },
    { name: 'Buy pages', path: 'buy/[coin]/[country]/page.js', count: 50 * CONFIG.countries.length },
    { name: 'Price pages', path: 'price/[coin]/[currency]/page.js', count: 100 * CONFIG.currencies.length },
    { name: 'Prediction pages', path: 'prediction/[coin]/[year]/page.js', count: 50 * CONFIG.years.length },
    { name: 'Compare pages', path: 'compare/[pair]/page.js', count: 190 } // 20 choose 2
  ];
  
  pageFiles.forEach(file => {
    const filePath = path.join(CONFIG.siteDir, file.path);
    if (fs.existsSync(filePath)) {
      log(`${file.name}: File exists (${file.count} potential pages)`, 'green');
    } else {
      log(`${file.name}: File not found`, 'red');
    }
  });
  
  log('\n=== AVAILABLE COMMANDS ===', 'bright');
  log('  all          - Generate all pages and sitemap', 'cyan');
  log('  coins        - Generate coin pages only', 'cyan');
  log('  buy          - Generate buy pages only', 'cyan');
  log('  price        - Generate price pages only', 'cyan');
  log('  prediction   - Generate prediction pages only', 'cyan');
  log('  compare      - Generate compare pages only', 'cyan');
  log('  sitemap      - Generate sitemap only', 'cyan');
  log('  status       - Show current status', 'cyan');
  log('  deploy <msg> - Git commit and push changes', 'cyan');
  
  log('\n=== CONFIGURATION ===', 'bright');
  log(`Max coins: ${CONFIG.maxCoins}`, 'white');
  log(`Countries: ${CONFIG.countries.length}`, 'white');
  log(`Currencies: ${CONFIG.currencies.length}`, 'white');
  log(`Years: ${CONFIG.years.length}`, 'white');
}

// DEPLOY FUNCTION
function deploy(message = 'Auto-update generated pages') {
  logInfo('Deploying to git...');
  
  const { execSync } = require('child_process');
  
  try {
    showSpinner('Adding files');
    execSync('git add .', { stdio: 'pipe' });
    hideSpinner();
    
    showSpinner('Committing changes');
    execSync(`git commit -m "${message}"`, { stdio: 'pipe' });
    hideSpinner();
    
    showSpinner('Pushing to remote');
    execSync('git push', { stdio: 'pipe' });
    hideSpinner();
    
    logSuccess('Deployment completed');
    
  } catch (error) {
    hideSpinner();
    logError(`Deployment failed: ${error.message}`);
  }
}

// MAIN FUNCTION
async function main() {
  const command = process.argv[2];
  const args = process.argv.slice(3);
  
  log('\n=== CRYPTOASIA GENERATOR ===', 'bright');
  
  switch (command) {
    case 'all':
      logInfo('Starting full generation...');
      try {
        const coins = await getCoinsList();
        generateCoinPages(coins);
        generateBuyPages(coins);
        generatePricePages(coins);
        generatePredictionPages(coins);
        generateComparePages(coins);
        generateSitemap(coins);
        logSuccess('All pages generated successfully');
      } catch (error) {
        logError(`Generation failed: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'coins':
      try {
        const coins = await getCoinsList();
        generateCoinPages(coins);
      } catch (error) {
        logError(`Coin generation failed: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'buy':
      try {
        const coins = await getCoinsList();
        generateBuyPages(coins);
      } catch (error) {
        logError(`Buy pages generation failed: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'price':
      try {
        const coins = await getCoinsList();
        generatePricePages(coins);
      } catch (error) {
        logError(`Price pages generation failed: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'prediction':
      try {
        const coins = await getCoinsList();
        generatePredictionPages(coins);
      } catch (error) {
        logError(`Prediction pages generation failed: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'compare':
      try {
        const coins = await getCoinsList();
        generateComparePages(coins);
      } catch (error) {
        logError(`Compare pages generation failed: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'sitemap':
      try {
        const coins = await getCoinsList();
        generateSitemap(coins);
      } catch (error) {
        logError(`Sitemap generation failed: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'status':
      showStatus();
      break;
      
    case 'deploy':
      const message = args.join(' ') || 'Auto-update generated pages';
      deploy(message);
      break;
      
    default:
      logError('Unknown command');
      log('\nUsage: node generate.js <command>', 'white');
      log('Commands: all, coins, buy, price, prediction, compare, sitemap, status, deploy <message>', 'white');
      process.exit(1);
  }
}

// RUN MAIN FUNCTION
if (require.main === module) {
  main().catch(error => {
    logError(`Unhandled error: ${error.message}`);
    process.exit(1);
  });
}

// EXPORT FOR TESTING
module.exports = {
  CONFIG,
  getCoinsList,
  generateCoinPages,
  generateBuyPages,
  generatePricePages,
  generatePredictionPages,
  generateComparePages,
  generateSitemap,
  showStatus,
  deploy
};
