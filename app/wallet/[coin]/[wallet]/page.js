export const dynamicParams = true
export const revalidate = 86400

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }) {
  return {
    title: `How to Store ${params.coin} in ${params.wallet}`,
    description: `Complete guide to store ${params.coin} in ${params.wallet} wallet.`,
  }
}

export default function WalletPage({ params }) {
  return (
    <div style={{maxWidth:'1200px',margin:'0 auto',padding:'40px 24px'}}>
      <p><a href="/">Home</a> &rsaquo; {params.coin} &rsaquo; {params.wallet}</p>
      <h1>{params.coin} {params.wallet} Wallet Guide</h1>
      <p>Learn how to safely store your {params.coin} in {params.wallet}.</p>
    </div>
  )
}