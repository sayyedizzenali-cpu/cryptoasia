export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  return {
    title: `${params.coin} Review`,
    description: `Comprehensive ${params.coin} review covering features, security, fees, and user experience.`,
  };
}

export default function ReviewPage({ params }) {
  return (
    <div style={{maxWidth:'1200px',margin:'0 auto',padding:'40px 24px'}}>
      <p><a href="/">Home</a> &rsaquo; <a href="/review">Reviews</a> &rsaquo; {params.coin}</p>
      <h1>{params.coin} Review</h1>
      <p>Comprehensive {params.coin} review covering features, security, fees, and user experience.</p>
    </div>
  );
}
