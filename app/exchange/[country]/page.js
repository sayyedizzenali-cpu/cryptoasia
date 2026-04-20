export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  return {
    title: `Crypto Exchanges in ${params.country}`,
    description: `Find the best cryptocurrency exchanges in ${params.country}.`,
  };
}

export default function ExchangePage({ params }) {
  return (
    <div className="container" style={{padding:'40px 24px'}}>
      <div className="breadcrumb">
        <a href="/">Home</a> · <a href="/exchange">Exchanges</a> · <span>{params.country}</span>
      </div>
      <h1>Crypto Exchanges in {params.country}</h1>
      <p>Find the best cryptocurrency exchanges in {params.country}.</p>
    </div>
  );
}