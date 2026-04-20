export const dynamicParams = true;
export const revalidate = 300;





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