export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  return {
    title: `${params.pair} Calculator`,
    description: `Calculate ${params.pair} conversions and prices.`,
  };
}

export default function CalculatorPage({ params }) {
  return (
    <div className="container" style={{padding:'40px 24px'}}>
      <div className="breadcrumb">
        <a href="/">Home</a> · <a href="/calculator">Calculator</a> · <span>{params.pair}</span>
      </div>
      <h1>{params.pair} Calculator</h1>
      <p>Calculate {params.pair} conversions and prices.</p>
    </div>
  );
}