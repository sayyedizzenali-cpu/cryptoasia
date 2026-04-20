export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  return {
    title: `Stake ${params.coin} — Staking Guide`,
    description: `How to stake ${params.coin} and earn rewards safely.`,
  };
}

export default function StakingPage({ params }) {
  return (
    <div className="container" style={{padding:'40px 24px'}}>
      <div className="breadcrumb">
        <a href="/">Home</a> › <a href="/staking">Staking</a> › <span>{params.coin} Staking</span>
      </div>
      <h1>Stake {params.coin} — Staking Guide</h1>
      <p>How to stake {params.coin} and earn rewards safely.</p>
    </div>
  );
}
