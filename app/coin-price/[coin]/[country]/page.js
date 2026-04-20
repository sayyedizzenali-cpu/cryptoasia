export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  return {
    title: `${params.coin} Price in ${params.country}`,
    description: `Live ${params.coin} price in ${params.country} currency with real-time updates and charts.`,
  };
}

export default function CoinPricePage({ params }) {
  return (
    <div style={{maxWidth:'1200px',margin:'0 auto',padding:'40px 24px'}}>
      <p><a href="/">Home</a> &rsaquo; <a href="/coin-price">Coin Price</a> &rsaquo; {params.coin} &rsaquo; {params.country}</p>
      <h1>{params.coin} Price in {params.country}</h1>
      <p>Live {params.coin} price in {params.country} currency with real-time updates and charts.</p>
    </div>
  );
}
