export const dynamicParams = true;
export const revalidate = 86400;





export async function generateStaticParams() {
  return [
    { slug: 'pakistan' },
    { slug: 'india' },
    { slug: 'indonesia' },
    { slug: 'philippines' },
    { slug: 'bangladesh' },
    { slug: 'malaysia' },
    { slug: 'vietnam' },
    { slug: 'thailand' },
    { slug: 'south-korea' },
    { slug: 'singapore' },
    { slug: 'uae' },
    { slug: 'saudi-arabia' },
    { slug: 'sri-lanka' },
    { slug: 'nepal' },
    { slug: 'japan' },
    { slug: 'china' },
    { slug: 'myanmar' },
    { slug: 'cambodia' },
    { slug: 'hong-kong' },
    { slug: 'taiwan' },
    { slug: 'iran' },
    { slug: 'iraq' },
    { slug: 'jordan' },
    { slug: 'kuwait' },
    { slug: 'qatar' },
    { slug: 'oman' },
    { slug: 'bahrain' },
    { slug: 'turkey' },
    { slug: 'egypt' },
    { slug: 'nigeria' },
    { slug: 'kenya' },
    { slug: 'ghana' },
    { slug: 'south-africa' },
    { slug: 'ethiopia' },
    { slug: 'tanzania' },
    { slug: 'cameroon' },
    { slug: 'senegal' },
    { slug: 'morocco' },
    { slug: 'algeria' },
    { slug: 'tunisia' },
    { slug: 'libya' },
    { slug: 'sudan' },
    { slug: 'uganda' },
    { slug: 'zimbabwe' },
    { slug: 'zambia' },
    { slug: 'mozambique' },
    { slug: 'angola' },
    { slug: 'botswana' },
    { slug: 'namibia' },
    { slug: 'lesotho' },
    { slug: 'swaziland' },
    { slug: 'rwanda' },
    { slug: 'burundi' }
  ]
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