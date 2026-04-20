export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  return {
    title: `Buy ${params.coin} on ${params.exchange}`,
    description: `Complete guide to buying ${params.coin} on ${params.exchange} exchange with step-by-step instructions.`,
  };
}

export default function BuyOnPage({ params }) {
  return (
    <div style={{maxWidth:'1200px',margin:'0 auto',padding:'40px 24px'}}>
      <p><a href="/">Home</a> &rsaquo; <a href="/buy-on">Buy On</a> &rsaquo; {params.coin} &rsaquo; {params.exchange}</p>
      <h1>Buy {params.coin} on {params.exchange}</h1>
      <p>Complete guide to buying {params.coin} on {params.exchange} exchange with step-by-step instructions.</p>
    </div>
  );
}
