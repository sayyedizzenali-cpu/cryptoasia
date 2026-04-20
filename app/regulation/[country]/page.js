import { ASIA_COUNTRIES } from '@/lib/coingecko';
import { getExchangesByCountry } from '@/lib/exchanges';

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  return ASIA_COUNTRIES.map((country) => ({
    country: country.code,
  }));
}

export async function generateMetadata({ params }) {
  const country = ASIA_COUNTRIES.find(c => c.code === params.country);
  
  if (!country) {
    return {
      title: 'Country Not Found | CryptoAsia',
      description: 'The requested country regulation guide could not be found.',
    };
  }

  return {
    title: `Is Crypto Legal in ${country.name}? Regulation Guide 2026 | CryptoAsia`,
    description: `Complete guide to cryptocurrency regulation and legality in ${country.name}. Learn about crypto laws, taxes, licensed exchanges, and government stance in 2026.`,
    keywords: [
      'cryptocurrency regulation',
      `${country.name.toLowerCase()} crypto laws`,
      'crypto legality',
      'cryptocurrency tax',
      'licensed exchanges',
      'government crypto policy',
      params.country,
    ],
    openGraph: {
      title: `Is Crypto Legal in ${country.name}? Regulation Guide 2026`,
      description: `Complete guide to cryptocurrency regulation and legality in ${country.name}. Learn about crypto laws, taxes, licensed exchanges, and government stance in 2026.`,
      type: 'article',
      images: [
        {
          url: '/images/og-regulation.jpg',
          width: 1200,
          height: 630,
          alt: `Cryptocurrency Regulation in ${country.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Is Crypto Legal in ${country.name}? Regulation Guide 2026`,
      description: `Complete guide to cryptocurrency regulation and legality in ${country.name}. Learn about crypto laws, taxes, licensed exchanges, and government stance in 2026.`,
      images: ['/images/og-regulation.jpg'],
    },
    alternates: {
      canonical: `https://cryptoasia.com/regulation/${params.country}`,
    },
  };
}

// Regulation data for Asian countries
const REGULATION_DATA = {
  JP: {
    legalStatus: 'Legal',
    statusColor: 'green',
    summary: 'Cryptocurrency is legal and regulated in Japan. The country has one of the most comprehensive regulatory frameworks for digital assets.',
    overview: 'Japan legalized cryptocurrency as a payment method in 2017 through amendments to the Payment Services Act. The Financial Services Agency (FSA) oversees cryptocurrency exchanges, requiring them to register and maintain proper security measures. Japan\'s regulatory approach emphasizes consumer protection while fostering innovation in the blockchain sector.',
    taxTreatment: 'Cryptocurrency gains are classified as miscellaneous income and taxed at progressive rates up to 55%. Losses can be deducted from other miscellaneous income up to ¥200,000 annually. Corporate crypto activities face corporate income tax on gains.',
    licensedExchanges: [
      { name: 'bitFlyer', status: 'Licensed', users: '2.5M+' },
      { name: 'Coincheck', status: 'Licensed', users: '2.2M+' },
      { name: 'Zaif', status: 'Licensed', users: '500K+' },
      { name: 'Binance Japan', status: 'Licensed', users: '1M+' },
    ],
    timeline: [
      { year: '2017', event: 'Cryptocurrency legalized as payment method' },
      { year: '2018', event: 'FSA establishes comprehensive exchange regulations' },
      { year: '2020', event: 'New crypto taxation guidelines implemented' },
      { year: '2022', event: 'Stablecoin regulations introduced' },
      { year: '2024', event: 'Web3 promotion policies announced' },
    ],
    governmentStance: 'Supportive with strong regulation. The Japanese government actively promotes blockchain technology while maintaining strict oversight of cryptocurrency markets to protect consumers.',
    faqs: [
      {
        question: 'Is cryptocurrency trading legal in Japan?',
        answer: 'Yes, cryptocurrency trading is legal in Japan. All exchanges must be registered with the Financial Services Agency (FSA) and comply with strict security and operational requirements.'
      },
      {
        question: 'How are cryptocurrency gains taxed in Japan?',
        answer: 'Cryptocurrency gains are taxed as miscellaneous income at progressive rates up to 55%. The tax is calculated by adding crypto gains to your other miscellaneous income for the year.'
      },
      {
        question: 'Can I use cryptocurrency for payments in Japan?',
        answer: 'Yes, cryptocurrency is legally recognized as a payment method. However, actual usage for everyday payments remains limited compared to traditional payment methods.'
      },
      {
        question: 'Are there restrictions on foreign cryptocurrency exchanges in Japan?',
        answer: 'Foreign exchanges must obtain a license from the FSA to operate in Japan. Unlicensed foreign exchanges cannot legally serve Japanese residents.'
      },
      {
        question: 'What consumer protections exist for Japanese crypto investors?',
        answer: 'Japanese investors enjoy strong protections including mandatory exchange insurance, strict security requirements, and the right to compensation in case of exchange hacks or insolvency.'
      },
    ],
  },
  KR: {
    legalStatus: 'Legal',
    statusColor: 'green',
    summary: 'Cryptocurrency is legal in South Korea but heavily regulated. Trading is permitted through licensed exchanges with strict KYC requirements.',
    overview: 'South Korea has established a comprehensive regulatory framework for cryptocurrencies. The country requires real-name verification for all cryptocurrency trading accounts and implements strict anti-money laundering measures. While cryptocurrency trading is legal, initial coin offerings (ICOs) remain banned.',
    taxTreatment: 'Cryptocurrency gains were planned to be taxed at 20% above 2.5 million won annually, but implementation has been delayed. Current tax treatment is under review, with new legislation expected in 2026.',
    licensedExchanges: [
      { name: 'Upbit', status: 'Licensed', users: '8M+' },
      { name: 'Bithumb', status: 'Licensed', users: '7M+' },
      { name: 'Coinone', status: 'Licensed', users: '2M+' },
      { name: 'Korbit', status: 'Licensed', users: '1.5M+' },
    ],
    timeline: [
      { year: '2017', event: 'ICO ban implemented' },
      { year: '2018', event: 'Real-name verification system introduced' },
      { year: '2021', event: 'Cryptocurrency taxation law passed' },
      { year: '2022', event: 'Tax implementation delayed' },
      { year: '2023', event: 'Virtual Asset User Protection Act enacted' },
    ],
    governmentStance: 'Cautiously supportive. The Korean government recognizes cryptocurrency innovation but prioritizes investor protection and market stability. Regulations continue to evolve.',
    faqs: [
      {
        question: 'Is cryptocurrency trading legal in South Korea?',
        answer: 'Yes, cryptocurrency trading is legal through licensed exchanges that comply with real-name verification requirements. However, ICOs remain banned.'
      },
      {
        question: 'What is the real-name verification system?',
        answer: 'All cryptocurrency traders must use real-name bank accounts linked to their trading accounts. This system prevents anonymous trading and enhances AML compliance.'
      },
      {
        question: 'Are there taxes on cryptocurrency gains in South Korea?',
        answer: 'Taxation is currently under review. A 20% tax on gains above 2.5 million won was planned but delayed. New tax legislation is expected in 2026.'
      },
      {
        question: 'Can foreigners trade cryptocurrency in South Korea?',
        answer: 'Foreigners can trade if they have a Korean bank account and complete real-name verification. Some exchanges may have additional requirements for foreign residents.'
      },
      {
        question: 'What protections exist for Korean crypto investors?',
        answer: 'The Virtual Asset User Protection Act provides insurance coverage, strict security requirements, and compensation mechanisms for exchange failures or hacks.'
      },
    ],
  },
  SG: {
    legalStatus: 'Legal',
    statusColor: 'green',
    summary: 'Cryptocurrency is legal and well-regulated in Singapore. The city-state has established clear guidelines while fostering fintech innovation.',
    overview: 'Singapore has emerged as a cryptocurrency hub in Asia through its supportive yet comprehensive regulatory approach. The Monetary Authority of Singapore (MAS) requires cryptocurrency service providers to obtain licenses under the Payment Services Act. Singapore\'s regulatory framework emphasizes innovation while maintaining strong consumer protection and financial stability standards.',
    taxTreatment: 'Singapore does not impose capital gains tax on cryptocurrency investments. However, businesses trading cryptocurrencies as part of regular operations may face income tax on profits. GST does not apply to cryptocurrency transactions.',
    licensedExchanges: [
      { name: 'Coinhako', status: 'Licensed', users: '500K+' },
      { name: 'Independent Reserve', status: 'Licensed', users: '200K+' },
      { name: 'Crypto.com', status: 'Licensed', users: '1M+' },
      { name: 'Luno', status: 'Licensed', users: '300K+' },
    ],
    timeline: [
      { year: '2017', event: 'MAS issues regulatory guidelines for ICOs' },
      { year: '2019', event: 'Payment Services Act enacted' },
      { year: '2020', event: 'Cryptocurrency licensing framework established' },
      { year: '2022', event: 'Stablecoin regulations proposed' },
      { year: '2024', event: 'Digital token service provider licensing expanded' },
    ],
    governmentStance: 'Highly supportive. Singapore actively positions itself as a global cryptocurrency hub through clear regulations, innovation programs, and support for blockchain development.',
    faqs: [
      {
        question: 'Is cryptocurrency completely tax-free in Singapore?',
        answer: 'Long-term cryptocurrency investments are generally tax-free as Singapore does not impose capital gains tax. However, businesses trading crypto regularly may face income tax.'
      },
      {
        question: 'Do I need a license to operate a cryptocurrency business in Singapore?',
        answer: 'Yes, cryptocurrency service providers must obtain a license from MAS under the Payment Services Act. The type of license depends on the specific services offered.'
      },
      {
        question: 'Are there restrictions on cryptocurrency advertising in Singapore?',
        answer: 'Yes, cryptocurrency advertising is regulated. Service providers must ensure advertisements are not misleading and include appropriate risk warnings.'
      },
      {
        question: 'Can Singapore residents use foreign cryptocurrency exchanges?',
        answer: 'Yes, Singapore residents can use foreign exchanges, but MAS-licensed exchanges offer better investor protections and regulatory oversight.'
      },
      {
        question: 'What initiatives support cryptocurrency innovation in Singapore?',
        answer: 'Singapore offers regulatory sandboxes, grants for blockchain projects, and supports fintech development through various government programs and partnerships.'
      },
    ],
  },
  CN: {
    legalStatus: 'Restricted',
    statusColor: 'yellow',
    summary: 'Cryptocurrency is heavily restricted in China. Trading and mining are prohibited, but ownership exists in a legal gray area.',
    overview: 'China maintains one of the strictest cryptocurrency regulatory regimes in Asia. The government prohibits cryptocurrency trading, initial coin offerings, and mining activities. Financial institutions are banned from providing cryptocurrency services. However, cryptocurrency ownership itself is not explicitly illegal, creating a complex legal situation for Chinese citizens.',
    taxTreatment: 'No official tax guidance exists due to the prohibition on cryptocurrency trading. Any gains from prohibited activities would likely face legal challenges rather than tax implications.',
    licensedExchanges: [
      { name: 'No licensed exchanges', status: 'Prohibited', users: 'N/A' },
    ],
    timeline: [
      { year: '2017', event: 'ICO ban implemented' },
      { year: '2019', event: 'Cryptocurrency trading restrictions' },
      { year: '2021', event: 'Complete mining and trading ban' },
      { year: '2022', event: 'Crackdown on foreign exchange access' },
      { year: '2024', event: 'Digital yuan expansion continues' },
    ],
    governmentStance: 'Prohibitive. The Chinese government actively suppresses cryptocurrency activities while promoting its own central bank digital currency (digital yuan).',
    faqs: [
      {
        question: 'Is it illegal to own cryptocurrency in China?',
        answer: 'Cryptocurrency ownership exists in a legal gray area. While not explicitly illegal, accessing exchanges and trading is prohibited, making ownership practically difficult.'
      },
      {
        question: 'Can Chinese citizens use foreign cryptocurrency exchanges?',
        answer: 'No, Chinese authorities actively block access to foreign exchanges and have cracked down on residents using VPNs to access them.'
      },
      {
        question: 'What are the penalties for cryptocurrency trading in China?',
        answer: 'Penalties can include fines, account freezes, and other administrative measures. The government has taken enforcement actions against cryptocurrency activities.'
      },
      {
        question: 'What is the digital yuan?',
        answer: 'The digital yuan (e-CNY) is China\'s central bank digital currency, which the government promotes as an alternative to private cryptocurrencies.'
      },
      {
        question: 'Are there any legal cryptocurrency activities in China?',
        answer: 'Blockchain technology development is encouraged, but cryptocurrency-related activities are prohibited. The focus is on non-crypto blockchain applications.'
      },
    ],
  },
  IN: {
    legalStatus: 'Legal',
    statusColor: 'green',
    summary: 'Cryptocurrency is legal in India with a 30% tax on gains and 1% TDS. Regulatory framework continues to develop.',
    overview: 'India has moved from uncertainty to establishing a clear tax framework for cryptocurrencies. While not explicitly banned, cryptocurrency faces high taxation and regulatory scrutiny. The Reserve Bank of India maintains cautionary stance, but the government has not prohibited cryptocurrency trading. Regulatory frameworks continue to evolve under consultation.',
    taxTreatment: 'Cryptocurrency gains are taxed at 30% regardless of holding period. Additionally, a 1% Tax Deducted at Source (TDS) applies to crypto transfers above certain thresholds. No deductions are allowed except for acquisition costs.',
    licensedExchanges: [
      { name: 'WazirX', status: 'Operating', users: '15M+' },
      { name: 'CoinDCX', status: 'Operating', users: '10M+' },
      { name: 'ZebPay', status: 'Operating', users: '5M+' },
      { name: 'Bitbns', status: 'Operating', users: '3M+' },
    ],
    timeline: [
      { year: '2018', event: 'RBI banking restrictions imposed' },
      { year: '2020', event: 'Supreme Court lifts banking ban' },
      { year: '2022', event: '30% crypto tax and 1% TDS implemented' },
      { year: '2023', event: 'Crypto regulation consultations begin' },
      { year: '2025', event: 'Comprehensive crypto bill expected' },
    ],
    governmentStance: 'Cautious with high taxation. The Indian government acknowledges cryptocurrency existence but imposes high taxes and maintains regulatory caution. Comprehensive legislation is under development.',
    faqs: [
      {
        question: 'Is cryptocurrency trading legal in India?',
        answer: 'Yes, cryptocurrency trading is legal but subject to 30% tax on gains and 1% TDS on transactions. The regulatory framework continues to evolve.'
      },
      {
        question: 'How does the 30% crypto tax work in India?',
        answer: 'All cryptocurrency gains are taxed at 30% regardless of holding period. No deductions are allowed except for the cost of acquisition. Losses cannot be carried forward.'
      },
      {
        question: 'What is the 1% TDS on cryptocurrency?',
        answer: 'A 1% Tax Deducted at Source applies to cryptocurrency transfers above certain thresholds. The TDS can be claimed back when filing annual tax returns.'
      },
      {
        question: 'Are Indian banks allowed to process crypto transactions?',
        answer: 'Yes, following the 2020 Supreme Court decision, banks are allowed to provide services to cryptocurrency exchanges and traders, though some maintain cautious policies.'
      },
      {
        question: 'What regulations can we expect in India?',
        answer: 'Comprehensive cryptocurrency legislation is expected in 2025, potentially addressing consumer protection, exchange regulation, and clearer tax guidelines.'
      },
    ],
  },
  TH: {
    legalStatus: 'Legal',
    statusColor: 'green',
    summary: 'Cryptocurrency is legal and regulated in Thailand. Exchanges must be licensed, and clear tax guidelines exist.',
    overview: 'Thailand has established a comprehensive regulatory framework for cryptocurrencies under the supervision of the Securities and Exchange Commission (SEC). The country requires cryptocurrency exchanges to obtain licenses and implement strict security measures. Thailand\'s approach balances innovation promotion with investor protection.',
    taxTreatment: 'Cryptocurrency gains are subject to 15% withholding tax for individuals and 17% corporate tax for companies. The Revenue Department has issued clear guidelines for cryptocurrency taxation.',
    licensedExchanges: [
      { name: 'Bitkub', status: 'Licensed', users: '3M+' },
      { name: 'Satang Pro', status: 'Licensed', users: '500K+' },
      { name: 'Zipmex', status: 'Licensed', users: '200K+' },
      { name: 'ERX', status: 'Licensed', users: '100K+' },
    ],
    timeline: [
      { year: '2018', event: 'Royal Decree on Digital Asset Business enacted' },
      { year: '2019', event: 'First cryptocurrency exchanges licensed' },
      { year: '2021', event: 'ICO regulations implemented' },
      { year: '2022', event: 'Tax guidelines for crypto issued' },
      { year: '2024', event: 'DeFi regulations under consideration' },
    ],
    governmentStance: 'Supportive with regulation. Thailand actively develops cryptocurrency regulations while promoting blockchain technology adoption in various sectors.',
    faqs: [
      {
        question: 'Is cryptocurrency legal in Thailand?',
        answer: 'Yes, cryptocurrency is legal and regulated. Exchanges must be licensed by the SEC, and clear guidelines exist for digital asset businesses.'
      },
      {
        question: 'How are cryptocurrency gains taxed in Thailand?',
        answer: 'Individuals pay 15% withholding tax on crypto gains, while companies face 17% corporate tax. The tax applies to profits from trading and mining activities.'
      },
      {
        question: 'Can foreigners use Thai cryptocurrency exchanges?',
        answer: 'Yes, foreigners can use licensed Thai exchanges, but they must complete KYC requirements and may face additional verification steps.'
      },
      {
        question: 'Are ICOs legal in Thailand?',
        answer: 'Yes, ICOs are legal but require approval from the SEC. Token issuers must meet specific disclosure and investor protection requirements.'
      },
      {
        question: 'What protections exist for Thai crypto investors?',
        answer: 'Licensed exchanges must maintain insurance, implement security measures, and follow strict operating guidelines. The SEC provides investor protection mechanisms.'
      },
    ],
  },
  ID: {
    legalStatus: 'Legal',
    statusColor: 'green',
    summary: 'Cryptocurrency is legal as a commodity in Indonesia. Trading is permitted through licensed exchanges under commodity market supervision.',
    overview: 'Indonesia classifies cryptocurrencies as commodities that can be traded on physical markets under the supervision of the Commodity Futures Trading Regulatory Agency (Bappebti). The country has established licensing requirements for cryptocurrency exchanges and clear trading guidelines. Bank Indonesia maintains a prohibition on using cryptocurrencies as payment instruments.',
    taxTreatment: 'Cryptocurrency trading is subject to income tax on gains, typically at the individual income tax rate (up to 30%). Value-added tax (VAT) of 11% applies to cryptocurrency transactions as commodities.',
    licensedExchanges: [
      { name: 'Indodax', status: 'Licensed', users: '4M+' },
      { name: 'Tokocrypto', status: 'Licensed', users: '2M+' },
      { name: 'Pintu', status: 'Licensed', users: '1M+' },
      { name: 'Reku', status: 'Licensed', users: '500K+' },
    ],
    timeline: [
      { year: '2018', event: 'Cryptocurrency classified as commodities' },
      { year: '2019', event: 'Bappebti establishes crypto trading regulations' },
      { year: '2020', event: 'First crypto exchanges licensed' },
      { year: '2022', event: 'Tax guidelines for crypto trading issued' },
      { year: '2024', event: 'Crypto asset regulations expanded' },
    ],
    governmentStance: 'Cautiously supportive. Indonesia permits cryptocurrency trading as commodities while prohibiting their use as payment instruments. The regulatory framework continues to develop.',
    faqs: [
      {
        question: 'Can I use cryptocurrency for payments in Indonesia?',
        answer: 'No, Bank Indonesia prohibits using cryptocurrencies as payment instruments. They can only be traded as commodities on licensed exchanges.'
      },
      {
        question: 'How are cryptocurrency gains taxed in Indonesia?',
        answer: 'Gains are subject to income tax (up to 30%) and 11% VAT on transactions. Tax treatment depends on whether trading is considered investment or business activity.'
      },
      {
        question: 'Are Indonesian cryptocurrency exchanges safe?',
        answer: 'Licensed exchanges must meet Bappebti requirements including security standards, capital requirements, and investor protection measures. Choose only licensed exchanges.'
      },
      {
        question: 'Can foreigners trade crypto in Indonesia?',
        answer: 'Yes, foreigners can trade on licensed Indonesian exchanges after completing KYC requirements. Some exchanges may have additional requirements for non-residents.'
      },
      {
        question: 'What is Bappebti\'s role in crypto regulation?',
        answer: 'Bappebti supervises cryptocurrency trading as commodities, licenses exchanges, and ensures market integrity and investor protection in the crypto market.'
      },
    ],
  },
  MY: {
    legalStatus: 'Legal',
    statusColor: 'green',
    summary: 'Cryptocurrency is legal in Malaysia and regulated as securities. The Securities Commission oversees crypto exchanges and trading activities.',
    overview: 'Malaysia has established a comprehensive regulatory framework for cryptocurrencies under the Securities Commission Malaysia (SC). Digital assets are classified as securities, requiring exchanges to obtain licenses and comply with capital market regulations. The country\'s approach emphasizes investor protection while encouraging fintech innovation.',
    taxTreatment: 'Cryptocurrency gains are generally treated as capital gains and are not taxed for individuals. However, gains from trading as a business activity may be subject to income tax.',
    licensedExchanges: [
      { name: 'Luno Malaysia', status: 'Licensed', users: '1M+' },
      { name: 'Sinegy', status: 'Licensed', users: '100K+' },
      { name: 'Tokenize Xchange', status: 'Licensed', users: '50K+' },
    ],
    timeline: [
      { year: '2019', event: 'Digital Asset Order issued' },
      { year: '2020', event: 'First digital exchanges licensed' },
      { year: '2021', event: 'Crypto guidelines for financial institutions' },
      { year: '2022', event: 'DeFi regulations under review' },
      { year: '2024', event: 'Digital asset regulations expanded' },
    ],
    governmentStance: 'Supportive with regulation. Malaysia actively develops cryptocurrency regulations to foster fintech innovation while maintaining market integrity and investor protection.',
    faqs: [
      {
        question: 'Is cryptocurrency trading legal in Malaysia?',
        answer: 'Yes, cryptocurrency trading is legal through licensed digital exchanges. The Securities Commission regulates crypto assets as securities.'
      },
      {
        question: 'Do I pay tax on cryptocurrency gains in Malaysia?',
        answer: 'Individual cryptocurrency gains are generally not taxed as capital gains. However, trading as a business activity may be subject to income tax.'
      },
      {
        question: 'Which exchanges are licensed in Malaysia?',
        answer: 'Luno Malaysia, Sinegy, and Tokenize Xchange are licensed by the Securities Commission. Always verify exchange licensing before trading.'
      },
      {
        question: 'Can Malaysians use foreign cryptocurrency exchanges?',
        answer: 'Malaysians can use foreign exchanges, but licensed Malaysian exchanges offer better investor protections and regulatory oversight.'
      },
      {
        question: 'What protections exist for Malaysian crypto investors?',
        answer: 'Licensed exchanges must maintain insurance, implement security measures, and follow securities regulations. The SC provides investor compensation mechanisms.'
      },
    ],
  },
  VN: {
    legalStatus: 'Unclear',
    statusColor: 'gray',
    summary: 'Cryptocurrency regulation in Vietnam is developing. Trading exists in a legal gray area with new regulations expected.',
    overview: 'Vietnam is developing cryptocurrency regulations but currently lacks comprehensive legal framework. While not explicitly prohibited, cryptocurrency trading operates in a legal gray area. The government has shown interest in blockchain technology and is working on establishing clear regulations for digital assets.',
    taxTreatment: 'No clear tax guidelines exist due to regulatory uncertainty. Income tax may apply to crypto gains, but specific rules have not been established.',
    licensedExchanges: [
      { name: 'No official licensing framework', status: 'Developing', users: 'N/A' },
    ],
    timeline: [
      { year: '2018', event: 'Initial crypto discussions begin' },
      { year: '2021', event: 'Blockchain technology promotion' },
      { year: '2022', event: 'Crypto regulations under development' },
      { year: '2023', event: 'Digital asset framework proposals' },
      { year: '2025', event: 'Comprehensive regulations expected' },
    ],
    governmentStance: 'Developing. Vietnam is working on cryptocurrency regulations while promoting blockchain technology adoption. The government recognizes crypto potential but seeks proper regulatory framework.',
    faqs: [
      {
        question: 'Is cryptocurrency legal in Vietnam?',
        answer: 'Cryptocurrency exists in a legal gray area. While not explicitly prohibited, comprehensive regulations are still under development.'
      },
      {
        question: 'Can Vietnamese citizens trade cryptocurrency?',
        answer: 'Many Vietnamese citizens trade cryptocurrency, but the regulatory framework is not fully established. Traders should exercise caution and stay informed about regulatory developments.'
      },
      {
        question: 'Are there licensed exchanges in Vietnam?',
        answer: 'No official licensing framework exists yet. Vietnamese traders typically use international exchanges while local regulations develop.'
      },
      {
        question: 'What is the government\'s stance on blockchain?',
        answer: 'Vietnam actively promotes blockchain technology adoption while developing cryptocurrency regulations. The government recognizes blockchain\'s potential for various applications.'
      },
      {
        question: 'When can we expect clear crypto regulations in Vietnam?',
        answer: 'Comprehensive cryptocurrency regulations are expected by 2025. The government is actively working on establishing a clear legal framework.'
      },
    ],
  },
  PH: {
    legalStatus: 'Legal',
    statusColor: 'green',
    summary: 'Cryptocurrency is legal in the Philippines. The Bangko Sentral ng Pilipinas regulates exchanges while maintaining consumer protection.',
    overview: 'The Philippines has established a regulatory framework for cryptocurrencies under the Bangko Sentral ng Pilipinas (BSP). Virtual currency exchanges must register with the BSP and comply with AML/KYC requirements. The country\'s approach balances innovation promotion with financial stability and consumer protection concerns.',
    taxTreatment: 'Cryptocurrency gains are subject to income tax, typically at individual rates (20-35%). The Bureau of Internal Revenue has issued guidelines for crypto taxation.',
    licensedExchanges: [
      { name: 'Coins.ph', status: 'Registered', users: '10M+' },
      { name: 'PDAX', status: 'Registered', users: '500K+' },
      { name: 'Binance Philippines', status: 'Registered', users: '1M+' },
    ],
    timeline: [
      { year: '2017', event: 'BSP issues VCE guidelines' },
      { year: '2018', event: 'First virtual currency exchanges registered' },
      { year: '2020', event: 'Tax guidelines for crypto issued' },
      { year: '2022', event: 'AML regulations strengthened' },
      { year: '2024', event: 'Digital asset regulations expanded' },
    ],
    governmentStance: 'Cautiously supportive. The Philippines permits cryptocurrency activities while maintaining regulatory oversight and consumer protection measures.',
    faqs: [
      {
        question: 'Is cryptocurrency legal in the Philippines?',
        answer: 'Yes, cryptocurrency is legal and regulated. Virtual currency exchanges must register with the BSP and comply with AML/KYC requirements.'
      },
      {
        question: 'How are cryptocurrency gains taxed in the Philippines?',
        answer: 'Crypto gains are subject to income tax at individual rates (20-35%). The exact rate depends on total annual income and tax bracket.'
      },
      {
        question: 'Which exchanges are registered in the Philippines?',
        answer: 'Coins.ph, PDAX, and Binance Philippines are registered with the BSP. Always verify exchange registration before trading.'
      },
      {
        question: 'Can Filipinos use foreign cryptocurrency exchanges?',
        answer: 'Yes, Filipinos can use foreign exchanges, but BSP-registered exchanges offer better regulatory protections and consumer safeguards.'
      },
      {
        question: 'What protections exist for Filipino crypto investors?',
        answer: 'Registered exchanges must implement security measures, maintain insurance, and comply with BSP regulations. Consumer protection mechanisms are in place.'
      },
    ],
  },
  BD: {
    legalStatus: 'Restricted',
    statusColor: 'yellow',
    summary: 'Cryptocurrency faces restrictions in Bangladesh. The central bank has warned against crypto activities, but enforcement remains limited.',
    overview: 'Bangladesh maintains a cautious stance toward cryptocurrencies. The central bank has issued warnings against cryptocurrency transactions, citing financial stability and money laundering concerns. However, enforcement remains limited, and cryptocurrency trading continues informally. The country has not established comprehensive cryptocurrency regulations.',
    taxTreatment: 'No clear tax framework exists due to the restrictive stance. Any crypto activities would likely face legal challenges rather than clear tax implications.',
    licensedExchanges: [
      { name: 'No licensed exchanges', status: 'Restricted', users: 'N/A' },
    ],
    timeline: [
      { year: '2017', event: 'Central bank issues crypto warning' },
      { year: '2018', event: 'General anti-money laundering concerns' },
      { year: '2021', event: 'Renewed warnings against crypto' },
      { year: '2022', event: 'Limited enforcement actions' },
      { year: '2024', event: 'Regulations still under consideration' },
    ],
    governmentStance: 'Restrictive. The Bangladeshi government maintains caution toward cryptocurrencies, citing financial stability concerns, but comprehensive regulations are not fully established.',
    faqs: [
      {
        question: 'Is cryptocurrency illegal in Bangladesh?',
        answer: 'Cryptocurrency is not explicitly illegal but faces official restrictions and warnings. The central bank advises against crypto transactions.'
      },
      {
        question: 'Can Bangladeshi citizens trade cryptocurrency?',
        answer: 'While some Bangladeshis trade cryptocurrency, it operates in a legally uncertain environment with official warnings against such activities.'
      },
      {
        question: 'Are there any licensed cryptocurrency exchanges in Bangladesh?',
        answer: 'No, there are no officially licensed cryptocurrency exchanges in Bangladesh due to the restrictive regulatory stance.'
      },
      {
        question: 'What are the risks of cryptocurrency trading in Bangladesh?',
        answer: 'Risks include regulatory uncertainty, potential legal challenges, and limited consumer protections. Traders should exercise extreme caution.'
      },
      {
        question: 'Is there any hope for crypto regulation in Bangladesh?',
        answer: 'Regulations remain under consideration. The government may develop frameworks in the future, but current stance remains restrictive.'
      },
    ],
  },
  LK: {
    legalStatus: 'Unclear',
    statusColor: 'gray',
    summary: 'Cryptocurrency regulation in Sri Lanka is unclear. The central bank has issued warnings but comprehensive regulations are not established.',
    overview: 'Sri Lanka\'s cryptocurrency regulatory framework remains underdeveloped. The central bank has issued warnings about cryptocurrency risks, but comprehensive regulations have not been established. The country faces economic challenges that have influenced regulatory priorities. Cryptocurrency trading continues in a legally uncertain environment.',
    taxTreatment: 'No clear tax guidelines exist due to regulatory uncertainty. Standard income tax principles may apply to crypto gains, but specific rules are not established.',
    licensedExchanges: [
      { name: 'No official licensing', status: 'Unclear', users: 'N/A' },
    ],
    timeline: [
      { year: '2018', event: 'Central bank issues crypto warnings' },
      { year: '2021', event: 'Economic crisis affects regulatory priorities' },
      { year: '2022', event: 'Limited regulatory development' },
      { year: '2023', event: 'Crypto discussions continue' },
      { year: '2025', event: 'Regulations may be considered' },
    ],
    governmentStance: 'Unclear. Sri Lanka has issued warnings about cryptocurrency risks but has not established comprehensive regulatory framework.',
    faqs: [
      {
        question: 'Is cryptocurrency legal in Sri Lanka?',
        answer: 'Cryptocurrency exists in a legal gray area. The central bank has issued warnings, but comprehensive regulations are not established.'
      },
      {
        question: 'Can Sri Lankans trade cryptocurrency?',
        answer: 'Some Sri Lankans trade cryptocurrency, but the regulatory environment is uncertain. Traders should be aware of potential risks.'
      },
      {
        question: 'Are there licensed exchanges in Sri Lanka?',
        answer: 'No official licensing framework exists. Sri Lankan traders typically use international exchanges.'
      },
      {
        question: 'What is the central bank\'s position on crypto?',
        answer: 'The central bank has warned about cryptocurrency risks and advised caution, but has not implemented comprehensive regulations.'
      },
      {
        question: 'What should Sri Lankan crypto investors consider?',
        answer: 'Investors should consider regulatory uncertainty, potential legal challenges, and lack of consumer protections. Extreme caution is advised.'
      },
    ],
  },
  NP: {
    legalStatus: 'Banned',
    statusColor: 'red',
    summary: 'Cryptocurrency is banned in Nepal. The central bank prohibits all crypto activities and has taken enforcement actions.',
    overview: 'Nepal maintains one of the strictest cryptocurrency stances in Asia. The Nepal Rastra Bank (central bank) has explicitly prohibited all cryptocurrency activities, including trading, mining, and transactions. The government has taken enforcement actions against cryptocurrency operations, making Nepal one of the few countries with comprehensive cryptocurrency prohibition.',
    taxTreatment: 'Not applicable as cryptocurrency activities are prohibited.',
    licensedExchanges: [
      { name: 'Cryptocurrency banned', status: 'Prohibited', users: 'N/A' },
    ],
    timeline: [
      { year: '2019', event: 'Central bank bans cryptocurrency' },
      { year: '2021', event: 'Enforcement actions against crypto operations' },
      { year: '2022', event: 'Arrests for crypto trading activities' },
      { year: '2023', event: 'Continued enforcement of ban' },
      { year: '2024', event: 'Ban remains strictly enforced' },
    ],
    governmentStance: 'Prohibitive. The Nepali government strictly prohibits all cryptocurrency activities and actively enforces the ban.',
    faqs: [
      {
        question: 'Is any cryptocurrency activity legal in Nepal?',
        answer: 'No, all cryptocurrency activities including trading, mining, and transactions are banned by the Nepal Rastra Bank.'
      },
      {
        question: 'What are the penalties for cryptocurrency activities in Nepal?',
        answer: 'Penalties can include fines, imprisonment, and other legal consequences. The government actively enforces the cryptocurrency ban.'
      },
      {
        question: 'Can Nepalis use foreign cryptocurrency exchanges?',
        answer: 'No, using foreign cryptocurrency exchanges is also prohibited and can result in legal consequences.'
      },
      {
        question: 'Why did Nepal ban cryptocurrency?',
        answer: 'The ban was implemented due to concerns about financial stability, potential for illegal activities, and lack of regulatory framework.'
      },
      {
        question: 'Is there any chance of crypto legalization in Nepal?',
        answer: 'Current stance remains strictly prohibitive. Any future changes would require significant policy shifts and regulatory development.'
      },
    ],
  },
  MM: {
    legalStatus: 'Unclear',
    statusColor: 'gray',
    summary: 'Cryptocurrency regulation in Myanmar is unclear due to political instability. No comprehensive framework exists.',
    overview: 'Myanmar\'s cryptocurrency regulatory environment remains unclear due to ongoing political instability and governance challenges. The country has not established comprehensive cryptocurrency regulations, and enforcement mechanisms are limited. Cryptocurrency trading continues in an uncertain legal environment.',
    taxTreatment: 'No clear tax framework exists due to regulatory uncertainty and political instability.',
    licensedExchanges: [
      { name: 'No official licensing', status: 'Unclear', users: 'N/A' },
    ],
    timeline: [
      { year: '2018', event: 'Limited crypto discussions' },
      { year: '2021', event: 'Political instability affects regulation' },
      { year: '2022', event: 'Regulatory development stalled' },
      { year: '2023', event: 'Uncertain regulatory environment' },
      { year: '2025', event: 'Future regulations uncertain' },
    ],
    governmentStance: 'Unclear due to political situation. Myanmar has not established comprehensive cryptocurrency regulations.',
    faqs: [
      {
        question: 'Is cryptocurrency legal in Myanmar?',
        answer: 'Cryptocurrency exists in a legal gray area due to unclear regulations and political instability. No comprehensive framework exists.'
      },
      {
        question: 'Can Myanmar citizens trade cryptocurrency?',
        answer: 'Some Myanmar citizens trade cryptocurrency, but the regulatory environment is uncertain and potentially risky.'
      },
      {
        question: 'Are there licensed exchanges in Myanmar?',
        answer: 'No official licensing framework exists. Myanmar traders typically use international exchanges.'
      },
      {
        question: 'What risks exist for crypto trading in Myanmar?',
        answer: 'Risks include regulatory uncertainty, political instability, lack of consumer protections, and potential legal challenges.'
      },
      {
        question: 'What is the future of crypto regulation in Myanmar?',
        answer: 'Future regulations remain uncertain due to ongoing political challenges. Comprehensive frameworks may develop when stability improves.'
      },
    ],
  },
  KH: {
    legalStatus: 'Unclear',
    statusColor: 'gray',
    summary: 'Cryptocurrency regulation in Cambodia is developing. The central bank maintains caution while exploring digital payment options.',
    overview: 'Cambodia is gradually developing its approach to cryptocurrencies. The National Bank of Cambodia maintains caution toward private cryptocurrencies while developing its own digital payment systems. The country has not established comprehensive cryptocurrency regulations, but shows interest in blockchain technology applications. Cryptocurrency trading continues in a legally uncertain environment.',
    taxTreatment: 'No clear tax guidelines exist due to developing regulatory framework.',
    licensedExchanges: [
      { name: 'No official licensing', status: 'Developing', users: 'N/A' },
    ],
    timeline: [
      { year: '2018', event: 'Initial crypto discussions' },
      { year: '2020', event: 'Central bank explores digital payments' },
      { year: '2022', event: 'Blockchain technology interest' },
      { year: '2023', event: 'Regulatory framework development begins' },
      { year: '2025', event: 'Comprehensive regulations expected' },
    ],
    governmentStance: 'Cautiously developing. Cambodia maintains caution toward private cryptocurrencies while exploring blockchain technology and digital payment innovations.',
    faqs: [
      {
        question: 'Is cryptocurrency legal in Cambodia?',
        answer: 'Cryptocurrency exists in a legal gray area. Comprehensive regulations are still developing, and the central bank maintains caution.'
      },
      {
        question: 'Can Cambodians trade cryptocurrency?',
        answer: 'Some Cambodians trade cryptocurrency, but the regulatory environment is uncertain. Traders should stay informed about regulatory developments.'
      },
      {
        question: 'What is Bakong and how does it relate to crypto?',
        answer: 'Bakong is Cambodia\'s national digital payment system developed by the central bank. It\'s not a cryptocurrency but represents the government\'s approach to digital payments.'
      },
      {
        question: 'Are there licensed exchanges in Cambodia?',
        answer: 'No official licensing framework exists yet. Cambodian traders typically use international exchanges.'
      },
      {
        question: 'What is Cambodia\'s stance on blockchain technology?',
        answer: 'Cambodia shows interest in blockchain technology applications while maintaining caution toward private cryptocurrencies. The government explores various blockchain use cases.'
      },
    ],
  },
  LA: {
    legalStatus: 'Unclear',
    statusColor: 'gray',
    summary: 'Cryptocurrency regulation in Laos is unclear. The country has shown some interest in blockchain technology but lacks comprehensive crypto regulations.',
    overview: 'Laos maintains an unclear stance toward cryptocurrencies. The country has shown some interest in blockchain technology applications but has not established comprehensive cryptocurrency regulations. The Bank of Laos has not issued detailed guidelines on digital assets. Cryptocurrency trading continues in a legally uncertain environment with limited regulatory oversight.',
    taxTreatment: 'No clear tax framework exists due to regulatory uncertainty.',
    licensedExchanges: [
      { name: 'No official licensing', status: 'Unclear', users: 'N/A' },
    ],
    timeline: [
      { year: '2018', event: 'Limited crypto awareness' },
      { year: '2020', event: 'Blockchain technology interest' },
      { year: '2022', event: 'Regulatory discussions begin' },
      { year: '2023', event: 'Limited regulatory development' },
      { year: '2025', event: 'Future regulations uncertain' },
    ],
    governmentStance: 'Unclear. Laos has not established comprehensive cryptocurrency regulations but shows some interest in blockchain technology.',
    faqs: [
      {
        question: 'Is cryptocurrency legal in Laos?',
        answer: 'Cryptocurrency exists in a legal gray area. Laos has not established comprehensive regulations for digital assets.'
      },
      {
        question: 'Can Laotians trade cryptocurrency?',
        answer: 'Some Laotians trade cryptocurrency, but the regulatory environment is uncertain. Traders should exercise caution.'
      },
      {
        question: 'Are there licensed exchanges in Laos?',
        answer: 'No official licensing framework exists. Laotian traders typically use international exchanges.'
      },
      {
        question: 'What is Laos\'s position on blockchain technology?',
        answer: 'Laos has shown some interest in blockchain technology applications but has not developed comprehensive cryptocurrency regulations.'
      },
      {
        question: 'What risks exist for crypto trading in Laos?',
        answer: 'Risks include regulatory uncertainty, lack of consumer protections, and potential future regulatory changes.'
      },
    ],
  },
};

export default async function RegulationPage({ params }) {
  const country = ASIA_COUNTRIES.find(c => c.code === params.country);
  const regulation = REGULATION_DATA[params.country];

  if (!country || !regulation) {
    notFound();
  }

  // Get exchanges for this country
  const exchanges = getExchangesByCountry(country.name);

  // JSON-LD schemas
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: regulation.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://cryptoasia.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Regulation',
        item: 'https://cryptoasia.com/regulation',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: country.name,
        item: `https://cryptoasia.com/regulation/${params.country}`,
      },
    ],
  };

  const statusColors = {
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    gray: 'bg-gray-100 text-gray-800',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex text-sm text-gray-600" aria-label="Breadcrumb">
              <a href="/" className="hover:text-gray-900">Home</a>
              <span className="mx-2">/</span>
              <a href="/regulation" className="hover:text-gray-900">Regulation</a>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{country.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm mb-4 ${statusColors[regulation.statusColor]}`}>
                <span className="w-2 h-2 bg-current rounded-full mr-2"></span>
                Status: {regulation.legalStatus}
              </div>
              <h1 className="text-4xl font-bold mb-4">
                Is Crypto Legal in {country.name}?
              </h1>
              <p className="text-xl text-blue-100 mb-6 max-w-3xl mx-auto">
                {regulation.summary}
              </p>
              <div className="flex items-center justify-center text-sm text-blue-200">
                <span>Updated April 2026</span>
                <span className="mx-2">·</span>
                <span>Comprehensive Regulation Guide</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Summary */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Quick Summary</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${statusColors[regulation.statusColor]}`}>
                  {regulation.legalStatus}
                </div>
                <p className="text-sm text-gray-600 mt-2">Legal Status</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{regulation.licensedExchanges.length}</div>
                <p className="text-sm text-gray-600">Licensed Exchanges</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{regulation.faqs.length}</div>
                <p className="text-sm text-gray-600">Key Questions</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{regulation.timeline.length}</div>
                <p className="text-sm text-gray-600">Regulatory Events</p>
              </div>
            </div>
          </div>
        </div>

        {/* Regulation Overview */}
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Regulation Overview</h2>
            <p className="text-gray-700 leading-relaxed">{regulation.overview}</p>
          </div>
        </div>

        {/* Tax Treatment */}
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Tax Treatment</h2>
            <p className="text-gray-700 leading-relaxed">{regulation.taxTreatment}</p>
          </div>
        </div>

        {/* Licensed Exchanges */}
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Licensed Exchanges</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Exchange</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Users</th>
                  </tr>
                </thead>
                <tbody>
                  {regulation.licensedExchanges.map((exchange, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{exchange.name}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                          exchange.status === 'Licensed' ? 'bg-green-100 text-green-800' :
                          exchange.status === 'Operating' ? 'bg-blue-100 text-blue-800' :
                          exchange.status === 'Registered' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {exchange.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{exchange.users}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Regulatory Timeline</h2>
            <div className="space-y-4">
              {regulation.timeline.map((event, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-20 text-sm font-medium text-gray-500">
                    {event.year}
                  </div>
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="ml-4 text-gray-700">{event.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Government Stance */}
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-4">Government Stance</h2>
            <p className="text-gray-700 leading-relaxed">{regulation.governmentStance}</p>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-6xl mx-auto px-4 pb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {regulation.faqs.map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Other Countries */}
        <div className="max-w-6xl mx-auto px-4 pb-12">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Cryptocurrency Regulation in Other Asian Countries</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {ASIA_COUNTRIES.filter(c => c.code !== params.country).map((otherCountry) => (
                <a
                  key={otherCountry.code}
                  href={`/regulation/${otherCountry.code}`}
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="font-medium">{otherCountry.name}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {REGULATION_DATA[otherCountry.code]?.legalStatus || 'Unknown'}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
