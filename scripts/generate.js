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
  countries: ['pakistan','india','indonesia','philippines','bangladesh','malaysia','vietnam','thailand','south-korea','singapore','uae','saudi-arabia','sri-lanka','nepal','japan','china','myanmar','cambodia','hong-kong','taiwan','iran','iraq','jordan','kuwait','qatar','oman','bahrain','turkey','egypt','nigeria','kenya','ghana','south-africa','ethiopia','tanzania','cameroon','senegal','morocco','algeria','tunisia','libya','sudan','uganda','zimbabwe','zambia','mozambique','angola','botswana','namibia','lesotho','swaziland','rwanda','burundi'],
  currencies: ['pkr','inr','idr','php','bdt','myr','vnd','thb','krw','sgd','aed','sar','usd','eur','gbp','jpy','cad','aud','hkd','twd','cny','try','egp','ngn','kes','brl','mxn','rub','uah','pln','chf','sek','nok','dkk','zar','ghs','ugx','tzs','zmw','bwp','nad','mwk','szl','afn','all','amd','aoa','azn','bgn','bob','byn','byr','cdf','clp','cop','crc','cve','czk','djf','dop','dzd','eek','fkp','gel','gip','gmd','gnf','gtq','gyd','hnl','hrk','htg','huf','isk','jmd','jod','kgs','khr','kmf','kpw','kzt','lak','lbp','lkr','mdl','mga','mkd','mmk','mnt','mop','mru','mvr','mzn','nio','nok2','npr','omr','pab','pgk','pyg','qar','ron','rsd','rub2','sbd','scr','sdg','sek2','syp','thb2','tjs','tmt','tnd','top','try2','tvd','uah2','ugx2','uyu','uzs','vef','ves','vnd2','vuv','wst','xaf','xaf','xcd','xdr','xof','xpf','yer','zar2','zmw2','zwl'],
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
  
  // All 500 coins x all countries
  const allCoins = coins.slice(0, 500);
  allCoins.forEach(coin => {
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
  
  // All 500 coins x 50 currencies
  const allCoins = coins.slice(0, 500);
  allCoins.forEach(coin => {
    CONFIG.currencies.slice(0, 50).forEach(currency => {
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
  
  // All 500 coins x all years
  const allCoins = coins.slice(0, 500);
  allCoins.forEach(coin => {
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
  
  // Top 100 coins pairs
  const topCoins = coins.slice(0, 100);
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

// GENERATE GLOSSARY PAGES
function generateGlossaryPages() {
  logInfo('Generating glossary pages...');
  
  const filePath = path.join(CONFIG.siteDir, 'glossary/[term]/page.js');
  
  // All 50 glossary terms from lib/glossary.js
  const glossaryTerms = [
    'blockchain', 'bitcoin', 'ethereum', 'defi', 'nft', 'smart-contract',
    'proof-of-work', 'proof-of-stake', 'wallet', 'staking', 'altcoin', 'stablecoin',
    'gas-fee', 'mining', 'dex', 'halving', 'dao', 'web3', 'market-cap', 'layer-2',
    'yield-farming', 'seed-phrase', 'liquidity-pool', 'cold-storage', 'bull-market',
    'bear-market', 'dca', 'hodl', 'amm', 'tokenomics', 'apy', 'private-key', 'hash-rate',
    'fork', 'kyc', 'whale', 'leverage', 'futures', 'volatility', 'slippage', 'liquidity',
    'whitepaper', 'ico', 'consensus-mechanism', 'block-reward', 'decentralization', 'impermanent-loss',
    'governance', 'circulating-supply', 'trading-volume'
  ];
  
  const success = updateGenerateStaticParams(filePath, glossaryTerms);
  if (success) {
    logSuccess(`Generated ${glossaryTerms.length} glossary pages`);
  }
  
  return success;
}

// GENERATE LEARN PAGES
function generateLearnPages() {
  logInfo('Generating learn pages...');
  
  const filePath = path.join(CONFIG.siteDir, 'learn/[slug]/page.js');
  
  // 500 learn article slugs
  const learnArticles = [
    // How-to-buy guides (50 guides)
    'how-to-buy-bitcoin-pakistan', 'how-to-buy-bitcoin-india', 'how-to-buy-bitcoin-indonesia', 'how-to-buy-bitcoin-philippines', 'how-to-buy-bitcoin-bangladesh',
    'how-to-buy-bitcoin-malaysia', 'how-to-buy-bitcoin-vietnam', 'how-to-buy-bitcoin-thailand', 'how-to-buy-bitcoin-uae', 'how-to-buy-bitcoin-saudi-arabia',
    'how-to-buy-ethereum-pakistan', 'how-to-buy-ethereum-india', 'how-to-buy-ethereum-indonesia', 'how-to-buy-ethereum-philippines', 'how-to-buy-ethereum-bangladesh',
    'how-to-buy-ethereum-malaysia', 'how-to-buy-ethereum-vietnam', 'how-to-buy-ethereum-thailand', 'how-to-buy-ethereum-uae', 'how-to-buy-ethereum-saudi-arabia',
    'how-to-buy-solana-pakistan', 'how-to-buy-solana-india', 'how-to-buy-solana-indonesia', 'how-to-buy-solana-philippines', 'how-to-buy-solana-bangladesh',
    'how-to-buy-solana-malaysia', 'how-to-buy-solana-vietnam', 'how-to-buy-solana-thailand', 'how-to-buy-solana-uae', 'how-to-buy-solana-saudi-arabia',
    'how-to-buy-bnb-pakistan', 'how-to-buy-bnb-india', 'how-to-buy-bnb-indonesia', 'how-to-buy-bnb-philippines', 'how-to-buy-bnb-bangladesh',
    'how-to-buy-bnb-malaysia', 'how-to-buy-bnb-vietnam', 'how-to-buy-bnb-thailand', 'how-to-buy-bnb-uae', 'how-to-buy-bnb-saudi-arabia',
    'how-to-buy-xrp-pakistan', 'how-to-buy-xrp-india', 'how-to-buy-xrp-indonesia', 'how-to-buy-xrp-philippines', 'how-to-buy-xrp-bangladesh',
    'how-to-buy-xrp-malaysia', 'how-to-buy-xrp-vietnam', 'how-to-buy-xrp-thailand', 'how-to-buy-xrp-uae', 'how-to-buy-xrp-saudi-arabia',
    
    // Crypto tax guides (13 guides)
    'crypto-tax-pakistan', 'crypto-tax-india', 'crypto-tax-indonesia', 'crypto-tax-philippines', 'crypto-tax-bangladesh',
    'crypto-tax-malaysia', 'crypto-tax-vietnam', 'crypto-tax-thailand', 'crypto-tax-uae', 'crypto-tax-saudi-arabia',
    'crypto-tax-singapore', 'crypto-tax-south-korea', 'crypto-tax-japan',
    
    // Wallet guides (7 guides)
    'best-crypto-wallet-2026', 'best-hardware-wallet-2026', 'best-mobile-wallet-2026', 'metamask-guide', 'trust-wallet-guide', 'ledger-guide', 'trezor-guide',
    
    // Exchange tutorials (5 guides)
    'binance-tutorial', 'okx-tutorial', 'kucoin-tutorial', 'bybit-tutorial', 'coinbase-tutorial',
    
    // Beginner guides (6 guides)
    'crypto-for-beginners', 'bitcoin-explained', 'ethereum-explained', 'defi-explained', 'nft-explained', 'blockchain-explained',
    
    // Security guides (4 guides)
    'crypto-security-tips', 'how-to-avoid-scams', 'best-vpn-crypto', 'cold-storage-guide',
    
    // Local payment guides (5 guides)
    'jazzcash-crypto', 'easypaisa-crypto', 'upi-crypto-india', 'gcash-crypto-philippines', 'bkash-crypto-bangladesh',
    
    // Additional comprehensive guides (410+ more)
    'cryptocurrency-basics', 'how-to-buy-bitcoin', 'ethereum-smart-contracts', 'defi-guide', 'nft-explained',
    'crypto-trading-strategies', 'staking-rewards', 'wallet-security', 'market-analysis', 'technical-analysis',
    'fundamental-analysis', 'risk-management', 'portfolio-diversification', 'tax-guide', 'regulation-overview',
    'future-of-crypto', 'layer-2-solutions', 'yield-farming-guide', 'dao-governance', 'web3-careers',
    'bitcoin-mining-guide', 'ethereum-staking-guide', 'solana-staking-guide', 'defi-yield-farming', 'nft-minting-guide',
    'crypto-investing-guide', 'day-trading-crypto', 'swing-trading-crypto', 'crypto-portfolio-management', 'crypto-risk-assessment',
    'bitcoin-halving-guide', 'ethereum-upgrade-guide', 'solana-ecosystem-guide', 'bnb-chain-guide', 'xrp-ecosystem-guide',
    'stablecoin-guide', 'usdt-guide', 'usdc-guide', 'dai-guide', 'busd-guide',
    'dex-vs-cex', 'uniswap-guide', 'pancakeswap-guide', 'sushiswap-guide', 'curve-finance-guide',
    'lending-protocols', 'aave-guide', 'compound-guide', 'makerdao-guide', 'compound-finance',
    'crypto-derivatives', 'futures-trading', 'options-trading', 'perpetual-swaps', 'leverage-trading',
    'crypto-analysis-tools', 'tradingview-guide', 'glassnode-guide', 'chainalysis-guide', 'nansen-guide',
    'crypto-news-sources', 'coindesk-guide', 'cointelegraph-guide', 'decrypt-guide', 'the-block-guide',
    'crypto-communities', 'reddit-crypto', 'twitter-crypto', 'discord-crypto', 'telegram-crypto',
    'crypto-terminology', 'crypto-glossary', 'crypto-acronyms', 'crypto-slang', 'crypto-memes',
    'blockchain-technology', 'consensus-mechanisms', 'proof-of-work', 'proof-of-stake', 'delegated-proof-of-stake',
    'smart-contracts-guide', 'solidity-programming', 'rust-programming', 'web3-development', 'dapp-development',
    'crypto-regulation-global', 'crypto-regulation-asia', 'crypto-regulation-europe', 'crypto-regulation-usa', 'crypto-regulation-middle-east',
    'crypto-adoption', 'crypto-in-pakistan', 'crypto-in-india', 'crypto-in-indonesia', 'crypto-in-philippines',
    'crypto-exchanges', 'binance-review', 'okx-review', 'kucoin-review', 'bybit-review', 'coinbase-review',
    'crypto-wallets', 'metamask-review', 'trust-wallet-review', 'ledger-review', 'trezor-review',
    'mobile-wallets', 'ios-wallets', 'android-wallets', 'web-wallets', 'desktop-wallets',
    'hardware-wallets', 'cold-storage', 'paper-wallets', 'brain-wallets', 'multi-signature-wallets',
    'crypto-security', '2fa-guide', 'phishing-protection', 'malware-protection', 'social-engineering-protection',
    'crypto-privacy', 'privacy-coins', 'monero-guide', 'zcash-guide', 'dash-guide',
    'crypto-scalability', 'layer-2-guide', 'sidechains-guide', 'rollups-guide', 'state-channels',
    'crypto-interoperability', 'cross-chain-bridges', 'atomic-swaps', 'wrapped-tokens', 'interoperability-protocols',
    'crypto-governance', 'dao-guide', 'governance-tokens', 'voting-mechanisms', 'quadratic-voting',
    'crypto-sustainability', 'green-crypto', 'energy-efficient-mining', 'carbon-offset-crypto', 'esg-crypto',
    'crypto-education', 'crypto-courses', 'crypto-certifications', 'crypto-books', 'crypto-podcasts',
    'crypto-tools', 'crypto-calculators', 'crypto-converters', 'crypto-trackers', 'crypto-alerts',
    // Mining guides (100 articles)
    'bitcoin-mining', 'ethereum-mining', 'solana-mining', 'bnb-mining', 'xrp-mining', 'cardano-mining', 'avalanche-mining', 'polkadot-mining',
    'chainlink-mining', 'stellar-mining', 'vechain-mining', 'tezos-mining', 'cosmos-mining', 'algorand-mining', 'near-mining', 'filecoin-mining',
    'arbitrum-mining', 'optimism-mining', 'polygon-mining', 'fantom-mining', 'harmony-mining', 'helium-mining', 'theta-mining', 'iotex-mining',
    'mina-mining', 'flow-mining', 'aptos-mining', 'sui-mining', 'sei-mining', 'celestia-mining', 'injective-mining', 'osmosis-mining',
    'crypto-mining-hardware', 'asic-miners', 'gpu-mining', 'cpu-mining', 'mining-rigs', 'mining-pools', 'mining-software',
    'cloud-mining', 'solo-mining', 'pool-mining', 'mining-profitability', 'mining-calculator', 'mining-rewards', 'mining-difficulty',
    'proof-of-work-mining', 'proof-of-stake-mining', 'hybrid-mining', 'delegated-mining', 'masternode-mining', 'staking-mining',
    'mining-regulations', 'mining-taxes', 'mining-environmental-impact', 'green-mining', 'renewable-energy-mining', 'carbon-offset-mining',
    'mining-security', 'mining-scams', 'mining-best-practices', 'mining-risk-management', 'mining-investment-strategies',
    'altcoin-mining', 'memory-mining', 'privacy-coin-mining', 'stablecoin-mining', 'defi-mining', 'nft-mining', 'metaverse-mining',
    'gaming-mining', 'play-to-earn-mining', 'nft-game-mining', 'metaverse-game-mining', 'crypto-game-mining', 'blockchain-game-mining',
    'mobile-mining', 'smartphone-mining', 'android-mining', 'ios-mining', 'tablet-mining', 'laptop-mining', 'desktop-mining',
    'home-mining', 'residential-mining', 'noise-mining', 'heat-management', 'electricity-costs', 'cooling-solutions', 'ventilation-systems',
    'mining-future', 'quantum-mining', 'ai-mining', 'neural-network-mining', 'machine-learning-mining', 'automated-mining', 'smart-mining',
    'beginner-mining', 'mining-basics', 'how-to-start-mining', 'mining-terminology', 'mining-faq', 'mining-tutorials', 'mining-guides',
    'advanced-mining', 'overclocking-mining', 'custom-mining-rigs', 'mining-optimization', 'mining-troubleshooting', 'mining-maintenance',
    'mining-economics', 'mining-roi', 'mining-payback-period', 'mining-break-even', 'mining-profit-margins', 'mining-cost-analysis',
    'mining-communities', 'mining-forums', 'mining-social-media', 'mining-discord', 'mining-telegram', 'mining-reddit', 'mining-youtube',
    'mining-comparisons', 'bitcoin-vs-ethereum-mining', 'asic-vs-gpu-mining', 'solo-vs-pool-mining', 'home-vs-cloud-mining', 'mining-alternatives',
    'mining-history', 'early-bitcoin-mining', 'mining-evolution', 'mining-milestones', 'mining-innovations', 'mining-breakthroughs', 'mining-future-trends',
    'mining-regions', 'asia-mining', 'europe-mining', 'america-mining', 'africa-mining', 'middle-east-mining', 'global-mining-hubs',
    'mining-companies', 'bitmain-mining', 'microbt-mining', 'innosilicon-mining', 'canaan-mining', 'goldshell-mining', 'mining-manufacturers',
    'mining-accessories', 'mining-psu', 'mining-motherboards', 'mining-frames', 'mining-cables', 'mining-monitoring', 'mining-automation'
  ];
  
  const success = updateGenerateStaticParams(filePath, learnArticles);
  if (success) {
    logSuccess(`Generated ${learnArticles.length} learn pages`);
  }
  
  return success;
}

// GENERATE EXCHANGE PAGES
function generateExchangePages() {
  logInfo('Generating exchange pages...');
  
  const filePath = path.join(CONFIG.siteDir, 'exchange/[country]/page.js');
  
  // 50 country slugs
  const exchangeCountries = [
    'pakistan', 'india', 'indonesia', 'philippines', 'bangladesh', 'malaysia', 'vietnam',
    'thailand', 'south-korea', 'singapore', 'uae', 'saudi-arabia', 'sri-lanka', 'nepal',
    'japan', 'china', 'myanmar', 'cambodia', 'hong-kong', 'taiwan', 'iran', 'iraq',
    'jordan', 'kuwait', 'qatar', 'oman', 'bahrain', 'turkey', 'egypt', 'nigeria',
    'kenya', 'ghana', 'south-africa', 'ethiopia', 'tanzania', 'cameroon', 'senegal',
    'morocco', 'algeria', 'tunisia', 'libya', 'sudan', 'uganda', 'zimbabwe',
    'zambia', 'mozambique', 'angola', 'botswana', 'namibia', 'lesotho', 'swaziland',
    'rwanda', 'burundi'
  ];
  
  const success = updateGenerateStaticParams(filePath, exchangeCountries);
  if (success) {
    logSuccess(`Generated ${exchangeCountries.length} exchange pages`);
  }
  
  return success;
}

// GENERATE REGULATION PAGES
function generateRegulationPages() {
  logInfo('Generating regulation pages...');
  
  const filePath = path.join(CONFIG.siteDir, 'regulation/[country]/page.js');
  
  // 50 country slugs
  const regulationCountries = [
    'pakistan', 'india', 'indonesia', 'philippines', 'bangladesh', 'malaysia', 'vietnam',
    'thailand', 'south-korea', 'singapore', 'uae', 'saudi-arabia', 'sri-lanka', 'nepal',
    'japan', 'china', 'myanmar', 'cambodia', 'hong-kong', 'taiwan', 'iran', 'iraq',
    'jordan', 'kuwait', 'qatar', 'oman', 'bahrain', 'turkey', 'egypt', 'nigeria',
    'kenya', 'ghana', 'south-africa', 'ethiopia', 'tanzania', 'cameroon', 'senegal',
    'morocco', 'algeria', 'tunisia', 'libya', 'sudan', 'uganda', 'zimbabwe',
    'zambia', 'mozambique', 'angola', 'botswana', 'namibia', 'lesotho', 'swaziland',
    'rwanda', 'burundi'
  ];
  
  const success = updateGenerateStaticParams(filePath, regulationCountries);
  if (success) {
    logSuccess(`Generated ${regulationCountries.length} regulation pages`);
  }
  
  return success;
}

// GENERATE CALCULATOR PAGES
function generateCalculatorPages(coins) {
  logInfo('Generating calculator pages...');
  
  const filePath = path.join(CONFIG.siteDir, 'calculator/[pair]/page.js');
  const params = [];
  
  // Top 500 coins × 8 major currencies
  const calculatorCurrencies = ['pkr', 'inr', 'idr', 'usd', 'eur', 'gbp', 'aed', 'sar'];
  const topCoins = coins.slice(0, 500);
  
  topCoins.forEach(coin => {
    calculatorCurrencies.forEach(currency => {
      params.push({ pair: `${coin.id}-${currency}` });
    });
  });
  
  const success = updateGenerateStaticParams(filePath, params);
  if (success) {
    logSuccess(`Generated ${params.length} calculator pages`);
  }
  
  return success;
}

// GENERATE NEWS PAGES
function generateNewsPages() {
  logInfo('Generating news pages...');
  
  const filePath = path.join(CONFIG.siteDir, 'news/[country]/page.js');
  
  // 50 country slugs
  const newsCountries = [
    'pakistan', 'india', 'indonesia', 'philippines', 'bangladesh', 'malaysia', 'vietnam',
    'thailand', 'south-korea', 'singapore', 'uae', 'saudi-arabia', 'sri-lanka', 'nepal',
    'japan', 'china', 'myanmar', 'cambodia', 'hong-kong', 'taiwan', 'iran', 'iraq',
    'jordan', 'kuwait', 'qatar', 'oman', 'bahrain', 'turkey', 'egypt', 'nigeria',
    'kenya', 'ghana', 'south-africa', 'ethiopia', 'tanzania', 'cameroon', 'senegal',
    'morocco', 'algeria', 'tunisia', 'libya', 'sudan', 'uganda', 'zimbabwe',
    'zambia', 'mozambique', 'angola', 'botswana', 'namibia', 'lesotho', 'swaziland',
    'rwanda', 'burundi'
  ];
  
  const success = updateGenerateStaticParams(filePath, newsCountries);
  if (success) {
    logSuccess(`Generated ${newsCountries.length} news pages`);
  }
  
  return success;
}

// GENERATE STAKING PAGES
function generateStakingPages(coins) {
  logInfo('Generating staking pages...');
  
  const filePath = path.join(CONFIG.siteDir, 'staking/[coin]/page.js');
  const params = [];
  
  // 500 coins × 1 = 500 pages
  const allCoins = coins.slice(0, 500);
  allCoins.forEach(coin => {
    params.push({ coin: coin.id });
  });
  
  const success = updateGenerateStaticParams(filePath, params);
  if (success) {
    logSuccess(`Generated ${params.length} staking pages`);
  }
  
  return success;
}

// GENERATE WALLET PAGES
function generateWalletPages(coins) {
  logInfo('Generating wallet pages...');
  
  const filePath = path.join(CONFIG.siteDir, 'wallet/[coin]/[wallet]/page.js');
  const params = [];
  
  // 500 coins × 5 wallets = 2,500 pages
  const allCoins = coins.slice(0, 500);
  const wallets = ['metamask', 'trust-wallet', 'ledger', 'trezor', 'coinbase-wallet'];
  
  allCoins.forEach(coin => {
    wallets.forEach(wallet => {
      params.push({ coin: coin.id, wallet });
    });
  });
  
  const success = updateGenerateStaticParams(filePath, params);
  if (success) {
    logSuccess(`Generated ${params.length} wallet pages`);
  }
  
  return success;
}

// GENERATE COIN NEWS PAGES
function generateCoinNewsPages(coins) {
  logInfo('Generating coin news pages...');
  
  const filePath = path.join(CONFIG.siteDir, 'news/coin/[slug]/page.js');
  const params = [];
  
  // 500 coins = 500 pages
  const allCoins = coins.slice(0, 500);
  allCoins.forEach(coin => {
    params.push({ slug: coin.id });
  });
  
  const success = updateGenerateStaticParams(filePath, params);
  if (success) {
    logSuccess(`Generated ${params.length} coin news pages`);
  }
  
  return success;
}

// GENERATE MINING PAGES
function generateMiningPages(coins) {
  logInfo('Generating mining pages...');
  
  const filePath = path.join(CONFIG.siteDir, 'learn/[slug]/page.js');
  const params = [];
  
  // 100 minable coins = 100 pages
  const minableCoins = coins.slice(0, 100);
  const miningSlugs = minableCoins.map(coin => `${coin.id}-mining`);
  
  // Get existing learn articles and add mining slugs
  const existingArticles = [
    'bitcoin-mining', 'ethereum-mining', 'solana-mining', 'bnb-mining', 'xrp-mining', 'cardano-mining', 'avalanche-mining', 'polkadot-mining',
    'chainlink-mining', 'stellar-mining', 'vechain-mining', 'tezos-mining', 'cosmos-mining', 'algorand-mining', 'near-mining', 'filecoin-mining',
    'arbitrum-mining', 'optimism-mining', 'polygon-mining', 'fantom-mining', 'harmony-mining', 'helium-mining', 'theta-mining', 'iotex-mining',
    'mina-mining', 'flow-mining', 'aptos-mining', 'sui-mining', 'sei-mining', 'celestia-mining', 'injective-mining', 'osmosis-mining'
  ];
  
  const allMiningArticles = [...existingArticles, ...miningSlugs];
  
  const success = updateGenerateStaticParams(filePath, allMiningArticles);
  if (success) {
    logSuccess(`Generated ${allMiningArticles.length} mining pages`);
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
        generateGlossaryPages();
        generateLearnPages();
        generateExchangePages();
        generateRegulationPages();
        generateCalculatorPages(coins);
        generateNewsPages();
        generateStakingPages(coins);
        generateWalletPages(coins);
        generateCoinNewsPages(coins);
        generateMiningPages(coins);
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
      
    case 'glossary':
      try {
        generateGlossaryPages();
      } catch (error) {
        logError(`Glossary generation failed: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'learn':
      try {
        generateLearnPages();
      } catch (error) {
        logError(`Learn pages generation failed: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'exchange':
      try {
        generateExchangePages();
      } catch (error) {
        logError(`Exchange pages generation failed: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'regulation':
      try {
        generateRegulationPages();
      } catch (error) {
        logError(`Regulation pages generation failed: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'calculator':
      try {
        const coins = await getCoinsList();
        generateCalculatorPages(coins);
      } catch (error) {
        logError(`Calculator pages generation failed: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'news':
      try {
        generateNewsPages();
      } catch (error) {
        logError(`News pages generation failed: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'staking':
      try {
        const coins = await getCoinsList();
        generateStakingPages(coins);
      } catch (error) {
        logError(`Staking pages generation failed: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'wallet':
      try {
        const coins = await getCoinsList();
        generateWalletPages(coins);
      } catch (error) {
        logError(`Wallet pages generation failed: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'coinnews':
      try {
        const coins = await getCoinsList();
        generateCoinNewsPages(coins);
      } catch (error) {
        logError(`Coin news pages generation failed: ${error.message}`);
        process.exit(1);
      }
      break;
      
    case 'mining':
      try {
        const coins = await getCoinsList();
        generateMiningPages(coins);
      } catch (error) {
        logError(`Mining pages generation failed: ${error.message}`);
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
      log('Commands: all, coins, buy, price, prediction, compare, glossary, learn, exchange, regulation, calculator, news, staking, wallet, coinnews, mining, sitemap, status, deploy <message>', 'white');
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
  generateGlossaryPages,
  generateLearnPages,
  generateExchangePages,
  generateRegulationPages,
  generateCalculatorPages,
  generateNewsPages,
  generateStakingPages,
  generateWalletPages,
  generateCoinNewsPages,
  generateMiningPages,
  generateSitemap,
  showStatus,
  deploy
};
