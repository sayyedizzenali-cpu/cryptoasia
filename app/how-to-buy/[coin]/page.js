export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  return {
    title: `How to Buy ${params.coin}`,
    description: `Complete step-by-step guide on how to buy ${params.coin} safely and securely.`,
  };
}

export default function HowToBuyPage({ params }) {
  return (
    <div style={{maxWidth:'1200px',margin:'0 auto',padding:'40px 24px'}}>
      <p><a href="/">Home</a> &rsaquo; <a href="/how-to-buy">How to Buy</a> &rsaquo; {params.coin}</p>
      <h1>How to Buy {params.coin}</h1>
      <p>Complete step-by-step guide on how to buy {params.coin} safely and securely.</p>
    </div>
  );
}
