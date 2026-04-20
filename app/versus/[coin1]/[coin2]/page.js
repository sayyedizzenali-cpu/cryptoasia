export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  return {
    title: `${params.coin1} vs ${params.coin2} Comparison`,
    description: `Compare ${params.coin1} vs ${params.coin2} with detailed analysis, price, market cap, and features.`,
  };
}

export default function VersusPage({ params }) {
  return (
    <div style={{maxWidth:'1200px',margin:'0 auto',padding:'40px 24px'}}>
      <p><a href="/">Home</a> &rsaquo; <a href="/versus">Versus</a> &rsaquo; {params.coin1} vs {params.coin2}</p>
      <h1>{params.coin1} vs {params.coin2}</h1>
      <p>Compare {params.coin1} vs {params.coin2} with detailed analysis, price, market cap, and features.</p>
    </div>
  );
}
