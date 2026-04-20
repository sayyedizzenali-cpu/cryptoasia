export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  return {
    title: `Crypto Regulation in ${params.country}`,
    description: `Complete guide to cryptocurrency regulation and legality in ${params.country}.`,
  };
}

export default function RegulationPage({ params }) {
  return (
    <div className="container" style={{padding:'40px 24px'}}>
      <div className="breadcrumb">
        <a href="/">Home</a> · <a href="/regulation">Regulation</a> · <span>{params.country}</span>
      </div>
      <h1>Crypto Regulation in {params.country}</h1>
      <p>Complete guide to cryptocurrency regulation and legality in {params.country}.</p>
    </div>
  );
}