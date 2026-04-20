import { BreadcrumbList, FAQPage } from '@/schemas';
import CoinNewsSection from '@/components/CoinNewsSection';
import { getBreadcrumbJsonLd } from '@/lib/breadcrumbs';

export const dynamicParams = true;
export const revalidate = 300;



export async function generateStaticParams() {
  return [
    {       slug: 'bitcoin' },
    {       slug: 'ethereum' },
    {       slug: 'tether' },
    {       slug: 'ripple' },
    {       slug: 'binancecoin' },
    {       slug: 'usd-coin' },
    {       slug: 'solana' },
    {       slug: 'tron' },
    {       slug: 'figure-heloc' },
    {       slug: 'dogecoin' },
    {       slug: 'whitebit' },
    {       slug: 'usds' },
    {       slug: 'hyperliquid' },
    {       slug: 'leo-token' },
    {       slug: 'cardano' },
    {       slug: 'bitcoin-cash' },
    {       slug: 'chainlink' },
    {       slug: 'monero' },
    {       slug: 'memecore' },
    {       slug: 'canton-network' },
    {       slug: 'stellar' },
    {       slug: 'ethena-usde' },
    {       slug: 'zcash' },
    {       slug: 'dai' },
    {       slug: 'usd1-wlfi' },
    {       slug: 'litecoin' },
    {       slug: 'paypal-usd' },
    {       slug: 'avalanche-2' },
    {       slug: 'hedera-hashgraph' },
    {       slug: 'sui' },
    {       slug: 'rain' },
    {       slug: 'shiba-inu' },
    {       slug: 'the-open-network' },
    {       slug: 'crypto-com-chain' },
    {       slug: 'hashnote-usyc' },
    {       slug: 'tether-gold' },
    {       slug: 'blackrock-usd-institutional-digital-liquidity-fund' },
    {       slug: 'world-liberty-financial' },
    {       slug: 'bittensor' },
    {       slug: 'pax-gold' },
    {       slug: 'global-dollar' },
    {       slug: 'polkadot' },
    {       slug: 'mantle' },
    {       slug: 'uniswap' },
    {       slug: 'sky' },
    {       slug: 'falcon-finance' },
    {       slug: 'pi-network' },
    {       slug: 'okb' },
    {       slug: 'near' },
    {       slug: 'aster-2' },
    {       slug: 'htx-dao' },
    {       slug: 'pepe' },
    {       slug: 'janus-henderson-anemoy-treasury-fund' },
    {       slug: 'ripple-usd' },
    {       slug: 'internet-computer' },
    {       slug: 'aave' },
    {       slug: 'ondo-us-dollar-yield' },
    {       slug: 'bitget-token' },
    {       slug: 'bfusd' },
    {       slug: 'usdd' },
    {       slug: 'ethereum-classic' },
    {       slug: 'ondo-finance' },
    {       slug: 'kucoin-shares' },
    {       slug: 'gatechain-token' },
    {       slug: 'quant-network' },
    {       slug: 'morpho' },
    {       slug: 'pump-fun' },
    {       slug: 'united-stables' },
    {       slug: 'eutbl' },
    {       slug: 'ethena' },
    {       slug: 'polygon-ecosystem-token' },
    {       slug: 'kaspa' },
    {       slug: 'render-token' },
    {       slug: 'cosmos' },
    {       slug: 'algorand' },
    {       slug: 'nexo' },
    {       slug: 'usdtb' },
    {       slug: 'worldcoin-wld' },
    {       slug: 'superstate-short-duration-us-government-securities-fund-ustb' },
    {       slug: 'arbitrum' },
    {       slug: 'aptos' },
    {       slug: 'blockchain-capital' },
    {       slug: 'filecoin' },
    {       slug: 'flare-networks' },
    {       slug: 'official-trump' },
    {       slug: 'dexe' },
    {       slug: 'just' },
    {       slug: 'hash-2' },
    {       slug: 'beldex' },
    {       slug: 'vechain' },
    {       slug: 'jupiter-exchange-solana' },
    {       slug: 'xdce-crowd-sale' },
    {       slug: 'ousg' },
    {       slug: 'midnight-3' },
    {       slug: 'ylds' },
    {       slug: 'gho' },
    {       slug: 'stable-2' },
    {       slug: 'usual-usd' },
    {       slug: 'bonk' },
    {       slug: 'siren-2' },
    {       slug: 'pancakeswap-token' },
    {       slug: 'true-usd' },
    {       slug: 'edgex' },
    {       slug: 'a7a5' },
    {       slug: 'fetch-ai' },
    {       slug: 'pudgy-penguins' },
    {       slug: 'bianrensheng' },
    {       slug: 'chiliz' },
    {       slug: 'virtual-protocol' },
    {       slug: 'adi-token' },
    {       slug: 'dash' },
    {       slug: 'euro-coin' },
    {       slug: 'venice-token' },
    {       slug: 'first-digital-usd' },
    {       slug: 'blockstack' },
    {       slug: 'janus-henderson-anemoy-aaa-clo-fund' },
    {       slug: 'tezos' },
    {       slug: 'layerzero' },
    {       slug: 'ether-fi' },
    {       slug: 'usx' },
    {       slug: 'monad' },
    {       slug: 'sei-network' },
    {       slug: 'kinesis-gold' },
    {       slug: 'hastra-prime' },
    {       slug: 'aerodrome-finance' },
    {       slug: 'celestia' },
    {       slug: 'sun-token' },
    {       slug: 'curve-dao-token' },
    {       slug: 'decred' },
    {       slug: 'apenft' },
    {       slug: 'injective-protocol' },
    {       slug: 'mantra-dao' },
    {       slug: 'bittorrent' },
    {       slug: 'bitcoin-cash-sv' },
    {       slug: 'gnosis' },
    {       slug: 'conflux-token' },
    {       slug: 'spx6900' },
    {       slug: 'floki' },
    {       slug: 'kinesis-silver' },
    {       slug: 'lido-dao' },
    {       slug: 'doublezero' },
    {       slug: 'jasmycoin' },
    {       slug: 'kaia' },
    {       slug: 'usdai' },
    {       slug: 'frax' },
    {       slug: 'the-graph' },
    {       slug: 'crvusd' },
    {       slug: 'ape-and-pepe' },
    {       slug: 'syrup' },
    {       slug: 'optimism' },
    {       slug: 'official-fo' },
    {       slug: 'zebec-network' },
    {       slug: 'pyth-network' },
    {       slug: 'iota' },
    {       slug: 'plasma' },
    {       slug: 'kite-2' },
    {       slug: 'olympus' },
    {       slug: 'compound-governance-token' },
    {       slug: 'terra-luna' },
    {       slug: 'reallink' },
    {       slug: 'lighter' },
    {       slug: 'ethereum-name-service' },
    {       slug: 'pendle' },
    {       slug: 'theta-token' },
    {       slug: 'usda-2' },
    {       slug: 'agora-dollar' },
    {       slug: 'pieverse' },
    {       slug: 'the-sandbox' },
    {       slug: 'undeads-games' },
    {       slug: 'starknet' },
    {       slug: 'btse-token' },
    {       slug: 'the9bit' },
    {       slug: 'tradable-na-rent-financing-platform-sstn' },
    {       slug: 'neo' },
    {       slug: 'fartcoin' },
    {       slug: 'vision-3' },
    {       slug: 'genius-3' },
    {       slug: 'dogwifcoin' },
    {       slug: 'telcoin' },
    {       slug: 'ethgas-2' },
    {       slug: 'helium' },
    {       slug: 'grass' },
    {       slug: 'axie-infinity' },
    {       slug: 'swissborg' },
    {       slug: 'humanity' },
    {       slug: 'apxusd' },
    {       slug: 're-protocol-reusd' },
    {       slug: 'story-2' },
    {       slug: 'decentraland' },
    {       slug: 'chain-2' },
    {       slug: 'falcon-finance-ff' },
    {       slug: 'raydium' },
    {       slug: 'trust-wallet-token' },
    {       slug: 'nusd-2' },
    {       slug: 'spiko-us-t-bills-money-market-fund' },
    {       slug: 'walrus-2' },
    {       slug: 'wefi' },
    {       slug: 'sonic-3' },
    {       slug: 'mx-token' },
    {       slug: 'tradable-apac-diversified-finance-provider-sstn' },
    {       slug: 'bnb48-club-token' },
    {       slug: 'convex-finance' },
    {       slug: 'basic-attention-token' },
    {       slug: 'skyai' },
    {       slug: 'satoshi-stablecoin' },
    {       slug: 'circle-internet-group-ondo-tokenized-stock' },
    {       slug: 'zksync' },
    {       slug: 'fidelity-digital-interest-token' },
    {       slug: 'jito-governance-token' },
    {       slug: 'gala' },
    {       slug: 'centrifuge-2' },
    {       slug: 'newton-project' },
    {       slug: 'safepal' },
    {       slug: 'onyc' },
    {       slug: 'ravedao' },
    {       slug: 'gusd' },
    {       slug: 'stasis-eurs' },
    {       slug: 'usa' },
    {       slug: 'thorchain' },
    {       slug: 'zano' },
    {       slug: 'ecash' },
    {       slug: 'arweave' },
    {       slug: 'ribbita-by-virtuals' },
    {       slug: 'gekko' },
    {       slug: 'immutable-x' },
    {       slug: 'frax-usd' },
    {       slug: 'akash-network' },
    {       slug: 'asteroid-shiba' },
    {       slug: 'theo-short-duration-us-treasury-fund' },
    {       slug: 'tradable-latam-fintech-sstn' },
    {       slug: 'sosovalue' },
    {       slug: 'vaulta' },
    {       slug: 'apollo-diversified-credit-securitize-fund' },
    {       slug: '1inch' },
    {       slug: 'golem' },
    {       slug: 'origintrail' },
    {       slug: 'instadapp' },
    {       slug: 'avant-usd' },
    {       slug: 'eigenlayer' },
    {       slug: 'zero-gravity' },
    {       slug: 'ozone-chain' },
    {       slug: 'elrond-erd-2' },
    {       slug: 'shuffle-2' },
    {       slug: 'societe-generale-forge-eurcv' },
    {       slug: 'sentient' },
    {       slug: 'cash-4' },
    {       slug: 'gmt-token' },
    {       slug: 'pleasing-usd' },
    {       slug: 'enjincoin' },
    {       slug: 'astherus-usdf' },
    {       slug: 'lido-earn-eth' },
    {       slug: 'tokenize-xchange' },
    {       slug: 'reserve-rights-token' },
    {       slug: 'luxxcoin' },
    {       slug: 'dydx-chain' },
    {       slug: 'tradable-singapore-fintech-ssl-2' },
    {       slug: 'ultima' },
    {       slug: 'aethir' },
    {       slug: 'tradoor' },
    {       slug: 'tradable-na-third-party-online-merchant-sstn' },
    {       slug: 'gas' },
    {       slug: 'bitmart-token' },
    {       slug: 'wemix-token' },
    {       slug: 'safe' },
    {       slug: 'zencash' },
    {       slug: 'quantum-resistant-ledger' },
    {       slug: 'nxm' },
    {       slug: 'cheems-token' },
    {       slug: 'qubic-network' },
    {       slug: 'tradable-latam-middle-market-lender-sstl' },
    {       slug: 'jusd' },
    {       slug: 'usdu' },
    {       slug: 'unibase' },
    {       slug: 'grx-chain' },
    {       slug: 'river' },
    {       slug: 'securitize-tokenized-aaa-clo-fund' },
    {       slug: 'livepeer' },
    {       slug: 'apecoin' },
    {       slug: 'cap-usd' },
    {       slug: 'melania-meme' },
    {       slug: 'rollbit-coin' },
    {       slug: 'havven' },
    {       slug: 'beam-2' },
    {       slug: 'mnee-usd-stablecoin' },
    {       slug: 'impossible-cloud-network-token' },
    {       slug: 'palm-usd' },
    {       slug: 'cow-protocol' },
    {       slug: 'ring-usd' },
    {       slug: 'standx-dusd' },
    {       slug: 'unity-usd' },
    {       slug: 'tradable-singapore-fintech-ssl' },
    {       slug: 'yearn-finance' },
    {       slug: 'kaito' },
    {       slug: 'precious-metals-usd' },
    {       slug: 'chutes' },
    {       slug: 'berachain-bera' },
    {       slug: 'stp-network' },
    {       slug: 'banana-for-scale-2' },
    {       slug: 'ravencoin' },
    {       slug: 'qtum' },
    {       slug: 'lovebit' },
    {       slug: 'four' },
    {       slug: 'flying-tulip' },
    {       slug: 'build-on' },
    {       slug: 'ordinals' },
    {       slug: 'seeker' },
    {       slug: 'lombard-protocol' },
    {       slug: 'pleasing-gold' },
    {       slug: '0x' },
    {       slug: 'kamino' },
    {       slug: 'blur' },
    {       slug: 'ini' },
    {       slug: 'infinifi-usd' },
    {       slug: 'superfarm' },
    {       slug: 'vicicoin' },
    {       slug: 'xdai' },
    {       slug: 'mag7-ssi' },
    {       slug: 'kusama' },
    {       slug: 'usda-3' },
    {       slug: 'theta-fuel' },
    {       slug: 'everything' },
    {       slug: 'linea' },
    {       slug: 'oasis-network' },
    {       slug: 'exod' },
    {       slug: 'arkham' },
    {       slug: 'railgun' },
    {       slug: 'keeta' },
    {       slug: 'zilliqa' },
    {       slug: 'would' },
    {       slug: 'digibyte' },
    {       slug: 'nexpace' },
    {       slug: 'dai-on-pulsechain' },
    {       slug: 'aioz-network' },
    {       slug: 'creditcoin-2' },
    {       slug: 'turbo' },
    {       slug: 'gauntlet-usd-alpha' },
    {       slug: 'bc-token' },
    {       slug: 'ondo-u-s-dollar-token' },
    {       slug: 'amp-token' },
    {       slug: 'mina-protocol' },
    {       slug: 'baby-doge-coin' },
    {       slug: 'dog-go-to-the-moon-rune' },
    {       slug: 'derive' },
    {       slug: 'helio-protocol-hay' },
    {       slug: 'matrixdock-gold' },
    {       slug: 'deep' },
    {       slug: 'holotoken' },
    {       slug: 'coinex-token' },
    {       slug: 'toshi' },
    {       slug: 'ontology' },
    {       slug: 'tradable-na-neobank-sstl' },
    {       slug: 'cygnus-finance-global-usd' },
    {       slug: 'felix-feusd' },
    {       slug: 'ronin' },
    {       slug: 'bitcastle-token' },
    {       slug: 'meteora' },
    {       slug: 'nervos-network' },
    {       slug: 'wormhole' },
    {       slug: 'fogo' },
    {       slug: 'mimblewimblecoin' },
    {       slug: 'zetachain' },
    {       slug: 'threshold-network-token' },
    {       slug: 'gamer-tag' },
    {       slug: 'spark-2' },
    {       slug: 'astar' },
    {       slug: 'dusk-network' },
    {       slug: 'nano' },
    {       slug: 'tagger' },
    {       slug: 'metal-blockchain' },
    {       slug: 'temple' },
    {       slug: 'cysic' },
    {       slug: 'movement' },
    {       slug: 'based-brett' },
    {       slug: 'fasttoken' },
    {       slug: 'midas-mf-one' },
    {       slug: 'request-network' },
    {       slug: 'loaded-lions' },
    {       slug: 'jupusd' },
    {       slug: 'ai-rig-complex' },
    {       slug: 'apes-2-2' },
    {       slug: 'irys' },
    {       slug: 'vaneck-treasury-fund' },
    {       slug: 'usdgo' },
    {       slug: 'plume' },
    {       slug: 'debridge' },
    {       slug: 'basedhype' },
    {       slug: 'dola-usd' },
    {       slug: 'proton' },
    {       slug: 'comedian' },
    {       slug: 'sahara-ai' },
    {       slug: 'mindwavedao' },
    {       slug: 'gmx' },
    {       slug: 'get-ai' },
    {       slug: 'puff-the-dragon' },
    {       slug: 'usdx' },
    {       slug: 'aelf' },
    {       slug: 'tronbank' },
    {       slug: 'aztec' },
    {       slug: 'polymesh' },
    {       slug: 'targon' },
    {       slug: 'apyusd' },
    {       slug: 'zora' },
    {       slug: 'non-playable-coin' },
    {       slug: 'greyhunt' },
    {       slug: 'pythia' },
    {       slug: 'audiera' },
    {       slug: 'quantixai' },
    {       slug: 'alchemist-ai' },
    {       slug: 'tradable-north-america-pos-lender-sstn' },
    {       slug: 'kava' },
    {       slug: 'axelar' },
    {       slug: 'unifai-network' },
    {       slug: 'rosa-inu' },
    {       slug: 'mbg-by-multibank-group' },
    {       slug: 'megausd' },
    {       slug: 'agentfun-ai' },
    {       slug: 'sushi' },
    {       slug: 'swop-2' },
    {       slug: 'eurite' },
    {       slug: 'home' },
    {       slug: 'zama' },
    {       slug: 'bitkub-coin' },
    {       slug: 'verus-coin' },
    {       slug: 'soon-2' },
    {       slug: 'verge' },
    {       slug: 'babylon' },
    {       slug: 'concordium' },
    {       slug: 'popcat' },
    {       slug: 'numeraire' },
    {       slug: 'flow' },
    {       slug: 'chainopera-ai' },
    {       slug: 'unit-pump' },
    {       slug: 'rekt-4' },
    {       slug: 'tria' },
    {       slug: 'vethor-token' },
    {       slug: 'peanut-the-squirrel' },
    {       slug: 'world-mobile-token' },
    {       slug: 'block-street' },
    {       slug: 'hashkey-ecopoints' },
    {       slug: 'bitdca' },
    {       slug: 'moo-deng' },
    {       slug: 'vvs-finance' },
    {       slug: 'orca' },
    {       slug: 'mog-coin' },
    {       slug: 'velo' },
    {       slug: 'mocaverse' },
    {       slug: 'tdccp' },
    {       slug: 'affine' },
    {       slug: 'kelp-gain' },
    {       slug: 'magic-eden' },
    {       slug: 'geodnet' },
    {       slug: 'escoin-token' },
    {       slug: 'tesla-xstock' },
    {       slug: 'tradable-na-legal-receivables-ssl' },
    {       slug: 'wiki-cat' },
    {       slug: 'brz' },
    {       slug: 'dual' },
    {       slug: 'pay-coin' },
    {       slug: 'yooldo-games' },
    {       slug: 'main-street-usd' },
    {       slug: 'tellor' },
    {       slug: 'cat-in-a-dogs-world' },
    {       slug: 'ankr' },
    {       slug: 'fidelity-digital-dollar' },
    {       slug: 'celium' },
    {       slug: 'celo' },
    {       slug: 'xyo-network' },
    {       slug: 'straitsx-xusd' },
    {       slug: 'mantra' },
    {       slug: 'usdkg' },
    {       slug: 'alloy-tether' },
    {       slug: 'bio-protocol' },
    {       slug: 'meta-2-2' },
    {       slug: 'law-blocks' },
    {       slug: 'tradable-eu-latam-pos-financing-sstl' },
    {       slug: 'deso' },
    {       slug: 'mimbogamegroup' },
    {       slug: 'circle-xstock' },
    {       slug: 'aleo' },
    {       slug: 'main-street-yield' },
    {       slug: 'siacoin' },
    {       slug: 'redstone-oracles' },
    {       slug: 'midas-mtbill' },
    {       slug: 'mask-network' },
    {       slug: 'fractal-bitcoin' },
    {       slug: 'sygnum-fiusd-liquidity-fund' },
    {       slug: 'succinct' },
    {       slug: 'casper-network' },
    {       slug: 'api3' },
    {       slug: 'merlin-chain' },
    {       slug: 'openledger-2' },
    {       slug: 'chia' },
    {       slug: 'frax-share' },
    {       slug: 'venus' },
    {       slug: 'palladium-network' },
    {       slug: 'gohome' },
    {       slug: 'space-and-time' },
    {       slug: 'orbs' },
    {       slug: 'midas-mhyper' },
    {       slug: 'crown-brlv' }
  ]
}

export async function generateMetadata({ params }) {
  const coinName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  
  return {
    title: `${coinName} News — Latest ${coinName} Updates & Analysis`,
    description: `Stay updated with the latest ${coinName} news, price analysis, market trends, and developments. Get real-time updates on ${coinName} ecosystem and trading insights.`,
    keywords: [`${coinName} news`, `${coinName} price`, `${coinName} analysis`, `${coinName} market`, `${coinName} updates`, `${coinName} trading`],
    openGraph: {
      title: `${coinName} News & Analysis`,
      description: `Latest news and analysis for ${coinName}`,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${coinName} News`,
      description: `Latest ${coinName} news and market analysis`
    },
    alternates: {
      canonical: `https://cryptoasia.com/news/coin/${params.slug}`
    }
  };
}

export async function generateJsonLd({ params }) {
  const coinName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: `${coinName} News`,
    description: `Latest news and updates about ${coinName}`,
    url: `https://cryptoasia.com/news/coin/${params.slug}`,
    coverage: {
      '@type': 'Thing',
      name: `${coinName} cryptocurrency`
    }
  };
}

export default function CoinNewsPage({ params }) {
  const coinName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'News', url: '/news' },
    { name: 'Coin News', url: '/news/coin' },
    { name: coinName, url: `/news/coin/${params.slug}` }
  ]);

  const relatedCoins = [
    { id: 'bitcoin', name: 'Bitcoin' },
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'solana', name: 'Solana' },
    { id: 'bnb', name: 'BNB' },
    { id: 'xrp', name: 'XRP' }
  ];

  const faqs = [
    {
      question: `What affects ${coinName} price?`,
      answer: `${coinName} price is influenced by market supply and demand, adoption rates, regulatory news, technological developments, macroeconomic factors, and overall cryptocurrency market sentiment.`
    },
    {
      question: `Where can I find reliable ${coinName} news?`,
      answer: `Reliable ${coinName} news can be found on official project websites, cryptocurrency news platforms, social media channels, and through technical analysis from blockchain experts. Always verify information from multiple sources.`
    },
    {
      question: `How does ${coinName} market analysis work?`,
      answer: `${coinName} market analysis involves studying price charts, trading volumes, market indicators, on-chain data, and comparing performance against other cryptocurrencies to predict future movements.`
    },
    {
      question: `What are the latest ${coinName} developments?`,
      answer: `Recent ${coinName} developments include protocol upgrades, partnership announcements, ecosystem growth, regulatory compliance efforts, and new feature implementations that could impact its value.`
    },
    {
      question: `How often should I check ${coinName} news?`,
      answer: `For active traders, checking ${coinName} news daily is recommended. Long-term investors may review weekly updates. Major announcements and market-moving events should be monitored in real-time.`
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        })}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center py-3">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <a href="/news" className="text-gray-500 hover:text-gray-700">News</a>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <a href="/news/coin" className="text-gray-500 hover:text-gray-700">Coin News</a>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900 font-medium">
                  {coinName}
                </li>
              </ol>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                {coinName} News
              </h1>
              <p className="text-xl opacity-90">
                Latest {coinName} Updates & Analysis
              </p>
            </div>
          </div>
        </div>

        {/* News Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <CoinNewsSection coinId={params.slug} />
          </div>
        </div>

        {/* Related Coins */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Trending Cryptocurrencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedCoins.map((coin, index) => (
                <a
                  key={index}
                  href={`/coins/${coin.id}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium text-gray-900">{coin.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{coin.id}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
