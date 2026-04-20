export const dynamicParams = true;
export const revalidate = 300;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  return {
    title: `Crypto News ${params.country}`,
    description: `Latest cryptocurrency news and updates for ${params.country}.`,
  };
}

export default function NewsCountryPage({ params }) {
  return (
    <div className="container" style={{padding:'40px 24px'}}>
      <div className="breadcrumb">
        <a href="/">Home</a> · <a href="/news">News</a> · <span>{params.country}</span>
      </div>
      <h1>Crypto News {params.country}</h1>
      <p>Latest cryptocurrency news and updates for {params.country}.</p>
    </div>
  );
}