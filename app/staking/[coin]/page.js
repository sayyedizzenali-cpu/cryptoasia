import { BreadcrumbList, FAQPage } from '@/schemas';
import StakingCalculator from '@/components/StakingCalculator';
import { getBreadcrumbJsonLd } from '@/lib/breadcrumbs';

export const dynamicParams = true;
export const revalidate = 3600;



export async function generateStaticParams() {
  return [
    {       coin: 'bitcoin' },
    {       coin: 'ethereum' },
    {       coin: 'tether' },
    {       coin: 'ripple' },
    {       coin: 'binancecoin' },
    {       coin: 'usd-coin' },
    {       coin: 'solana' },
    {       coin: 'tron' },
    {       coin: 'figure-heloc' },
    {       coin: 'dogecoin' },
    {       coin: 'whitebit' },
    {       coin: 'usds' },
    {       coin: 'hyperliquid' },
    {       coin: 'leo-token' },
    {       coin: 'cardano' },
    {       coin: 'bitcoin-cash' },
    {       coin: 'chainlink' },
    {       coin: 'monero' },
    {       coin: 'memecore' },
    {       coin: 'canton-network' },
    {       coin: 'stellar' },
    {       coin: 'ethena-usde' },
    {       coin: 'zcash' },
    {       coin: 'dai' },
    {       coin: 'usd1-wlfi' },
    {       coin: 'litecoin' },
    {       coin: 'paypal-usd' },
    {       coin: 'avalanche-2' },
    {       coin: 'hedera-hashgraph' },
    {       coin: 'sui' },
    {       coin: 'rain' },
    {       coin: 'shiba-inu' },
    {       coin: 'the-open-network' },
    {       coin: 'crypto-com-chain' },
    {       coin: 'hashnote-usyc' },
    {       coin: 'tether-gold' },
    {       coin: 'blackrock-usd-institutional-digital-liquidity-fund' },
    {       coin: 'world-liberty-financial' },
    {       coin: 'bittensor' },
    {       coin: 'pax-gold' },
    {       coin: 'global-dollar' },
    {       coin: 'polkadot' },
    {       coin: 'mantle' },
    {       coin: 'uniswap' },
    {       coin: 'sky' },
    {       coin: 'falcon-finance' },
    {       coin: 'pi-network' },
    {       coin: 'okb' },
    {       coin: 'near' },
    {       coin: 'aster-2' },
    {       coin: 'htx-dao' },
    {       coin: 'pepe' },
    {       coin: 'janus-henderson-anemoy-treasury-fund' },
    {       coin: 'ripple-usd' },
    {       coin: 'internet-computer' },
    {       coin: 'aave' },
    {       coin: 'ondo-us-dollar-yield' },
    {       coin: 'bitget-token' },
    {       coin: 'bfusd' },
    {       coin: 'usdd' },
    {       coin: 'ethereum-classic' },
    {       coin: 'ondo-finance' },
    {       coin: 'kucoin-shares' },
    {       coin: 'gatechain-token' },
    {       coin: 'quant-network' },
    {       coin: 'morpho' },
    {       coin: 'pump-fun' },
    {       coin: 'united-stables' },
    {       coin: 'eutbl' },
    {       coin: 'ethena' },
    {       coin: 'polygon-ecosystem-token' },
    {       coin: 'kaspa' },
    {       coin: 'render-token' },
    {       coin: 'cosmos' },
    {       coin: 'algorand' },
    {       coin: 'nexo' },
    {       coin: 'usdtb' },
    {       coin: 'worldcoin-wld' },
    {       coin: 'superstate-short-duration-us-government-securities-fund-ustb' },
    {       coin: 'arbitrum' },
    {       coin: 'aptos' },
    {       coin: 'blockchain-capital' },
    {       coin: 'filecoin' },
    {       coin: 'flare-networks' },
    {       coin: 'official-trump' },
    {       coin: 'dexe' },
    {       coin: 'just' },
    {       coin: 'hash-2' },
    {       coin: 'beldex' },
    {       coin: 'vechain' },
    {       coin: 'jupiter-exchange-solana' },
    {       coin: 'xdce-crowd-sale' },
    {       coin: 'ousg' },
    {       coin: 'midnight-3' },
    {       coin: 'ylds' },
    {       coin: 'gho' },
    {       coin: 'stable-2' },
    {       coin: 'usual-usd' },
    {       coin: 'bonk' },
    {       coin: 'siren-2' },
    {       coin: 'pancakeswap-token' },
    {       coin: 'true-usd' },
    {       coin: 'edgex' },
    {       coin: 'a7a5' },
    {       coin: 'fetch-ai' },
    {       coin: 'pudgy-penguins' },
    {       coin: 'bianrensheng' },
    {       coin: 'chiliz' },
    {       coin: 'virtual-protocol' },
    {       coin: 'adi-token' },
    {       coin: 'dash' },
    {       coin: 'euro-coin' },
    {       coin: 'venice-token' },
    {       coin: 'first-digital-usd' },
    {       coin: 'blockstack' },
    {       coin: 'janus-henderson-anemoy-aaa-clo-fund' },
    {       coin: 'tezos' },
    {       coin: 'layerzero' },
    {       coin: 'ether-fi' },
    {       coin: 'usx' },
    {       coin: 'monad' },
    {       coin: 'sei-network' },
    {       coin: 'kinesis-gold' },
    {       coin: 'hastra-prime' },
    {       coin: 'aerodrome-finance' },
    {       coin: 'celestia' },
    {       coin: 'sun-token' },
    {       coin: 'curve-dao-token' },
    {       coin: 'decred' },
    {       coin: 'apenft' },
    {       coin: 'injective-protocol' },
    {       coin: 'mantra-dao' },
    {       coin: 'bittorrent' },
    {       coin: 'bitcoin-cash-sv' },
    {       coin: 'gnosis' },
    {       coin: 'conflux-token' },
    {       coin: 'spx6900' },
    {       coin: 'floki' },
    {       coin: 'kinesis-silver' },
    {       coin: 'lido-dao' },
    {       coin: 'doublezero' },
    {       coin: 'jasmycoin' },
    {       coin: 'kaia' },
    {       coin: 'usdai' },
    {       coin: 'frax' },
    {       coin: 'the-graph' },
    {       coin: 'crvusd' },
    {       coin: 'ape-and-pepe' },
    {       coin: 'syrup' },
    {       coin: 'optimism' },
    {       coin: 'official-fo' },
    {       coin: 'zebec-network' },
    {       coin: 'pyth-network' },
    {       coin: 'iota' },
    {       coin: 'plasma' },
    {       coin: 'kite-2' },
    {       coin: 'olympus' },
    {       coin: 'compound-governance-token' },
    {       coin: 'terra-luna' },
    {       coin: 'reallink' },
    {       coin: 'lighter' },
    {       coin: 'ethereum-name-service' },
    {       coin: 'pendle' },
    {       coin: 'theta-token' },
    {       coin: 'usda-2' },
    {       coin: 'agora-dollar' },
    {       coin: 'pieverse' },
    {       coin: 'the-sandbox' },
    {       coin: 'undeads-games' },
    {       coin: 'starknet' },
    {       coin: 'btse-token' },
    {       coin: 'the9bit' },
    {       coin: 'tradable-na-rent-financing-platform-sstn' },
    {       coin: 'neo' },
    {       coin: 'fartcoin' },
    {       coin: 'vision-3' },
    {       coin: 'genius-3' },
    {       coin: 'dogwifcoin' },
    {       coin: 'telcoin' },
    {       coin: 'ethgas-2' },
    {       coin: 'helium' },
    {       coin: 'grass' },
    {       coin: 'axie-infinity' },
    {       coin: 'swissborg' },
    {       coin: 'humanity' },
    {       coin: 'apxusd' },
    {       coin: 're-protocol-reusd' },
    {       coin: 'story-2' },
    {       coin: 'decentraland' },
    {       coin: 'chain-2' },
    {       coin: 'falcon-finance-ff' },
    {       coin: 'raydium' },
    {       coin: 'trust-wallet-token' },
    {       coin: 'nusd-2' },
    {       coin: 'spiko-us-t-bills-money-market-fund' },
    {       coin: 'walrus-2' },
    {       coin: 'wefi' },
    {       coin: 'sonic-3' },
    {       coin: 'mx-token' },
    {       coin: 'tradable-apac-diversified-finance-provider-sstn' },
    {       coin: 'bnb48-club-token' },
    {       coin: 'convex-finance' },
    {       coin: 'basic-attention-token' },
    {       coin: 'skyai' },
    {       coin: 'satoshi-stablecoin' },
    {       coin: 'circle-internet-group-ondo-tokenized-stock' },
    {       coin: 'zksync' },
    {       coin: 'fidelity-digital-interest-token' },
    {       coin: 'jito-governance-token' },
    {       coin: 'gala' },
    {       coin: 'centrifuge-2' },
    {       coin: 'newton-project' },
    {       coin: 'safepal' },
    {       coin: 'onyc' },
    {       coin: 'ravedao' },
    {       coin: 'gusd' },
    {       coin: 'stasis-eurs' },
    {       coin: 'usa' },
    {       coin: 'thorchain' },
    {       coin: 'zano' },
    {       coin: 'ecash' },
    {       coin: 'arweave' },
    {       coin: 'ribbita-by-virtuals' },
    {       coin: 'gekko' },
    {       coin: 'immutable-x' },
    {       coin: 'frax-usd' },
    {       coin: 'akash-network' },
    {       coin: 'asteroid-shiba' },
    {       coin: 'theo-short-duration-us-treasury-fund' },
    {       coin: 'tradable-latam-fintech-sstn' },
    {       coin: 'sosovalue' },
    {       coin: 'vaulta' },
    {       coin: 'apollo-diversified-credit-securitize-fund' },
    {       coin: '1inch' },
    {       coin: 'golem' },
    {       coin: 'origintrail' },
    {       coin: 'instadapp' },
    {       coin: 'avant-usd' },
    {       coin: 'eigenlayer' },
    {       coin: 'zero-gravity' },
    {       coin: 'ozone-chain' },
    {       coin: 'elrond-erd-2' },
    {       coin: 'shuffle-2' },
    {       coin: 'societe-generale-forge-eurcv' },
    {       coin: 'sentient' },
    {       coin: 'cash-4' },
    {       coin: 'gmt-token' },
    {       coin: 'pleasing-usd' },
    {       coin: 'enjincoin' },
    {       coin: 'astherus-usdf' },
    {       coin: 'lido-earn-eth' },
    {       coin: 'tokenize-xchange' },
    {       coin: 'reserve-rights-token' },
    {       coin: 'luxxcoin' },
    {       coin: 'dydx-chain' },
    {       coin: 'tradable-singapore-fintech-ssl-2' },
    {       coin: 'ultima' },
    {       coin: 'aethir' },
    {       coin: 'tradoor' },
    {       coin: 'tradable-na-third-party-online-merchant-sstn' },
    {       coin: 'gas' },
    {       coin: 'bitmart-token' },
    {       coin: 'wemix-token' },
    {       coin: 'safe' },
    {       coin: 'zencash' },
    {       coin: 'quantum-resistant-ledger' },
    {       coin: 'nxm' },
    {       coin: 'cheems-token' },
    {       coin: 'qubic-network' },
    {       coin: 'tradable-latam-middle-market-lender-sstl' },
    {       coin: 'jusd' },
    {       coin: 'usdu' },
    {       coin: 'unibase' },
    {       coin: 'grx-chain' },
    {       coin: 'river' },
    {       coin: 'securitize-tokenized-aaa-clo-fund' },
    {       coin: 'livepeer' },
    {       coin: 'apecoin' },
    {       coin: 'cap-usd' },
    {       coin: 'melania-meme' },
    {       coin: 'rollbit-coin' },
    {       coin: 'havven' },
    {       coin: 'beam-2' },
    {       coin: 'mnee-usd-stablecoin' },
    {       coin: 'impossible-cloud-network-token' },
    {       coin: 'palm-usd' },
    {       coin: 'cow-protocol' },
    {       coin: 'ring-usd' },
    {       coin: 'standx-dusd' },
    {       coin: 'unity-usd' },
    {       coin: 'tradable-singapore-fintech-ssl' },
    {       coin: 'yearn-finance' },
    {       coin: 'kaito' },
    {       coin: 'precious-metals-usd' },
    {       coin: 'chutes' },
    {       coin: 'berachain-bera' },
    {       coin: 'stp-network' },
    {       coin: 'banana-for-scale-2' },
    {       coin: 'ravencoin' },
    {       coin: 'qtum' },
    {       coin: 'lovebit' },
    {       coin: 'four' },
    {       coin: 'flying-tulip' },
    {       coin: 'build-on' },
    {       coin: 'ordinals' },
    {       coin: 'seeker' },
    {       coin: 'lombard-protocol' },
    {       coin: 'pleasing-gold' },
    {       coin: '0x' },
    {       coin: 'kamino' },
    {       coin: 'blur' },
    {       coin: 'ini' },
    {       coin: 'infinifi-usd' },
    {       coin: 'superfarm' },
    {       coin: 'vicicoin' },
    {       coin: 'xdai' },
    {       coin: 'mag7-ssi' },
    {       coin: 'kusama' },
    {       coin: 'usda-3' },
    {       coin: 'theta-fuel' },
    {       coin: 'everything' },
    {       coin: 'linea' },
    {       coin: 'oasis-network' },
    {       coin: 'exod' },
    {       coin: 'arkham' },
    {       coin: 'railgun' },
    {       coin: 'keeta' },
    {       coin: 'zilliqa' },
    {       coin: 'would' },
    {       coin: 'digibyte' },
    {       coin: 'nexpace' },
    {       coin: 'dai-on-pulsechain' },
    {       coin: 'aioz-network' },
    {       coin: 'creditcoin-2' },
    {       coin: 'turbo' },
    {       coin: 'gauntlet-usd-alpha' },
    {       coin: 'bc-token' },
    {       coin: 'ondo-u-s-dollar-token' },
    {       coin: 'amp-token' },
    {       coin: 'mina-protocol' },
    {       coin: 'baby-doge-coin' },
    {       coin: 'dog-go-to-the-moon-rune' },
    {       coin: 'derive' },
    {       coin: 'helio-protocol-hay' },
    {       coin: 'matrixdock-gold' },
    {       coin: 'deep' },
    {       coin: 'holotoken' },
    {       coin: 'coinex-token' },
    {       coin: 'toshi' },
    {       coin: 'ontology' },
    {       coin: 'tradable-na-neobank-sstl' },
    {       coin: 'cygnus-finance-global-usd' },
    {       coin: 'felix-feusd' },
    {       coin: 'ronin' },
    {       coin: 'bitcastle-token' },
    {       coin: 'meteora' },
    {       coin: 'nervos-network' },
    {       coin: 'wormhole' },
    {       coin: 'fogo' },
    {       coin: 'mimblewimblecoin' },
    {       coin: 'zetachain' },
    {       coin: 'threshold-network-token' },
    {       coin: 'gamer-tag' },
    {       coin: 'spark-2' },
    {       coin: 'astar' },
    {       coin: 'dusk-network' },
    {       coin: 'nano' },
    {       coin: 'tagger' },
    {       coin: 'metal-blockchain' },
    {       coin: 'temple' },
    {       coin: 'cysic' },
    {       coin: 'movement' },
    {       coin: 'based-brett' },
    {       coin: 'fasttoken' },
    {       coin: 'midas-mf-one' },
    {       coin: 'request-network' },
    {       coin: 'loaded-lions' },
    {       coin: 'jupusd' },
    {       coin: 'ai-rig-complex' },
    {       coin: 'apes-2-2' },
    {       coin: 'irys' },
    {       coin: 'vaneck-treasury-fund' },
    {       coin: 'usdgo' },
    {       coin: 'plume' },
    {       coin: 'debridge' },
    {       coin: 'basedhype' },
    {       coin: 'dola-usd' },
    {       coin: 'proton' },
    {       coin: 'comedian' },
    {       coin: 'sahara-ai' },
    {       coin: 'mindwavedao' },
    {       coin: 'gmx' },
    {       coin: 'get-ai' },
    {       coin: 'puff-the-dragon' },
    {       coin: 'usdx' },
    {       coin: 'aelf' },
    {       coin: 'tronbank' },
    {       coin: 'aztec' },
    {       coin: 'polymesh' },
    {       coin: 'targon' },
    {       coin: 'apyusd' },
    {       coin: 'zora' },
    {       coin: 'non-playable-coin' },
    {       coin: 'greyhunt' },
    {       coin: 'pythia' },
    {       coin: 'audiera' },
    {       coin: 'quantixai' },
    {       coin: 'alchemist-ai' },
    {       coin: 'tradable-north-america-pos-lender-sstn' },
    {       coin: 'kava' },
    {       coin: 'axelar' },
    {       coin: 'unifai-network' },
    {       coin: 'rosa-inu' },
    {       coin: 'mbg-by-multibank-group' },
    {       coin: 'megausd' },
    {       coin: 'agentfun-ai' },
    {       coin: 'sushi' },
    {       coin: 'swop-2' },
    {       coin: 'eurite' },
    {       coin: 'home' },
    {       coin: 'zama' },
    {       coin: 'bitkub-coin' },
    {       coin: 'verus-coin' },
    {       coin: 'soon-2' },
    {       coin: 'verge' },
    {       coin: 'babylon' },
    {       coin: 'concordium' },
    {       coin: 'popcat' },
    {       coin: 'numeraire' },
    {       coin: 'flow' },
    {       coin: 'chainopera-ai' },
    {       coin: 'unit-pump' },
    {       coin: 'rekt-4' },
    {       coin: 'tria' },
    {       coin: 'vethor-token' },
    {       coin: 'peanut-the-squirrel' },
    {       coin: 'world-mobile-token' },
    {       coin: 'block-street' },
    {       coin: 'hashkey-ecopoints' },
    {       coin: 'bitdca' },
    {       coin: 'moo-deng' },
    {       coin: 'vvs-finance' },
    {       coin: 'orca' },
    {       coin: 'mog-coin' },
    {       coin: 'velo' },
    {       coin: 'mocaverse' },
    {       coin: 'tdccp' },
    {       coin: 'affine' },
    {       coin: 'kelp-gain' },
    {       coin: 'magic-eden' },
    {       coin: 'geodnet' },
    {       coin: 'escoin-token' },
    {       coin: 'tesla-xstock' },
    {       coin: 'tradable-na-legal-receivables-ssl' },
    {       coin: 'wiki-cat' },
    {       coin: 'brz' },
    {       coin: 'dual' },
    {       coin: 'pay-coin' },
    {       coin: 'yooldo-games' },
    {       coin: 'main-street-usd' },
    {       coin: 'tellor' },
    {       coin: 'cat-in-a-dogs-world' },
    {       coin: 'ankr' },
    {       coin: 'fidelity-digital-dollar' },
    {       coin: 'celium' },
    {       coin: 'celo' },
    {       coin: 'xyo-network' },
    {       coin: 'straitsx-xusd' },
    {       coin: 'mantra' },
    {       coin: 'usdkg' },
    {       coin: 'alloy-tether' },
    {       coin: 'bio-protocol' },
    {       coin: 'meta-2-2' },
    {       coin: 'law-blocks' },
    {       coin: 'tradable-eu-latam-pos-financing-sstl' },
    {       coin: 'deso' },
    {       coin: 'mimbogamegroup' },
    {       coin: 'circle-xstock' },
    {       coin: 'aleo' },
    {       coin: 'main-street-yield' },
    {       coin: 'siacoin' },
    {       coin: 'redstone-oracles' },
    {       coin: 'midas-mtbill' },
    {       coin: 'mask-network' },
    {       coin: 'fractal-bitcoin' },
    {       coin: 'sygnum-fiusd-liquidity-fund' },
    {       coin: 'succinct' },
    {       coin: 'casper-network' },
    {       coin: 'api3' },
    {       coin: 'merlin-chain' },
    {       coin: 'openledger-2' },
    {       coin: 'chia' },
    {       coin: 'frax-share' },
    {       coin: 'venus' },
    {       coin: 'palladium-network' },
    {       coin: 'gohome' },
    {       coin: 'space-and-time' },
    {       coin: 'orbs' },
    {       coin: 'midas-mhyper' },
    {       coin: 'crown-brlv' }
  ]
}

export async function generateMetadata({ params }) {
  const coinName = params.coin.charAt(0).toUpperCase() + params.coin.slice(1);
  
  return {
    title: `${coinName} Staking — Earn Rewards by Staking ${coinName}`,
    description: `Learn how to stake ${coinName} and earn passive rewards. Complete guide to ${coinName} staking pools, APY rates, and best staking platforms.`,
    keywords: [`${coinName} staking`, `stake ${coinName}`, `${coinName} rewards`, `${coinName} APY`, `${coinName} validator`],
    openGraph: {
      title: `${coinName} Staking Guide`,
      description: `Complete guide to staking ${coinName} and earning rewards`,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: `${coinName} Staking`,
      description: `Stake ${coinName} and earn rewards`
    },
    alternates: {
      canonical: `https://cryptoasia.com/staking/${params.coin}`
    }
  };
}

export async function generateJsonLd({ params }) {
  const coinName = params.coin.charAt(0).toUpperCase() + params.coin.slice(1);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${coinName} Staking Calculator`,
    description: `Calculate ${coinName} staking rewards and APY rates`,
    url: `https://cryptoasia.com/staking/${params.coin}`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web'
  };
}

export default function StakingPage({ params }) {
  const coinName = params.coin.charAt(0).toUpperCase() + params.coin.slice(1);
  
  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: 'Home', url: '/' },
    { name: 'Staking', url: '/staking' },
    { name: coinName, url: `/staking/${params.coin}` }
  ]);

  const stakingPools = [
    { name: 'Official Pool', apy: '5.2%', lockPeriod: 'Flexible', minStake: '1' },
    { name: 'Binance Staking', apy: '4.8%', lockPeriod: 'Flexible', minStake: '0.1' },
    { name: 'Kraken Staking', apy: '4.5%', lockPeriod: 'Flexible', minStake: '0.01' },
    { name: 'Coinbase Staking', apy: '4.2%', lockPeriod: 'Flexible', minStake: '0.1' },
    { name: 'Ledger Live', apy: '3.8%', lockPeriod: 'Flexible', minStake: '1' }
  ];

  const faqs = [
    {
      question: `What is ${coinName} staking?`,
      answer: `${coinName} staking is the process of locking up your ${coinName} tokens to support network operations and earn rewards in return. It's a way to earn passive income on your crypto holdings.`
    },
    {
      question: `How much can I earn staking ${coinName}?`,
      answer: `Earnings from ${coinName} staking vary by platform and staking method. APY rates typically range from 3% to 8% annually, depending on lock-up period and network conditions.`
    },
    {
      question: `Is ${coinName} staking safe?`,
      answer: `${coinName} staking is generally safe when using reputable platforms. However, risks include smart contract vulnerabilities, slashing penalties, and market volatility. Always do your own research.`
    },
    {
      question: `What are the requirements for ${coinName} staking?`,
      answer: `Requirements vary by platform but typically include minimum staking amounts, compatible wallets, and sometimes a lock-up period. Some platforms may require KYC verification.`
    },
    {
      question: `Can I unstake my ${coinName} anytime?`,
      answer: `Unstaking periods vary by platform. Some offer flexible unstaking with immediate access, while others have lock-up periods ranging from hours to weeks. Check your chosen platform's terms.`
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
                  <a href="/staking" className="text-gray-500 hover:text-gray-700">Staking</a>
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
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                {coinName} Staking
              </h1>
              <p className="text-xl opacity-90">
                Earn Rewards by Staking {coinName}
              </p>
            </div>
          </div>
        </div>

        {/* Staking Calculator */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <StakingCalculator coinId={params.coin} />
          </div>
        </div>

        {/* Staking Pools */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Best {coinName} Staking Platforms
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Platform
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      APY
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lock Period
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Minimum Stake
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stakingPools.map((pool, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {pool.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {pool.apy}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pool.lockPeriod}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {pool.minStake} {coinName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
