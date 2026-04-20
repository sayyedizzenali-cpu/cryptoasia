export const dynamicParams = true;
export const revalidate = 300;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  return {
    title: `${params.slug} News Today`,
    description: `Latest ${params.slug} cryptocurrency news and updates.`,
  };
}

export default function CoinNewsPage({ params }) {
  return (
    <div className="container" style={{padding:'40px 24px'}}>
      <div className="breadcrumb">
        <a href="/">Home</a> › <a href="/news">News</a> › <span>{params.slug} News</span>
      </div>
      <h1>{params.slug} News Today</h1>
      <p>Latest {params.slug} cryptocurrency news and updates.</p>
    </div>
  );
}
