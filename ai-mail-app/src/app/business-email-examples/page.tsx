export const metadata = {
  title: "ビジネスメール例文集｜AIで謝罪・お礼・依頼メールを作成",
  description:
    "ビジネスメールの例文や書き方を紹介。謝罪メール・お礼メール・依頼メールをAIで簡単に作成できます。",
};

export default function BusinessEmailExamplesPage() {
  return (
    <main className="min-h-screen bg-washi">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="font-display text-3xl text-ink mb-4">
          ビジネスメール例文集
        </h1>
        <p className="text-sm text-ink/60 leading-relaxed mb-8">
          謝罪メール・お礼メール・依頼メールなど、よく使うビジネスメールの作成に使えるページです。
          下の各ツールから、状況に合わせたメールをAIで自動生成できます。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="/apology-email"
            className="rounded-md border border-ink/10 bg-white/70 p-5 hover:border-vermilion/40 transition"
          >
            <h2 className="text-base font-medium text-ink">AI謝罪メール作成</h2>
            <p className="mt-2 text-xs text-ink/45">
              取引先や顧客へのお詫びメールを自動生成
            </p>
          </a>

          <a
            href="/thank-you-email"
            className="rounded-md border border-ink/10 bg-white/70 p-5 hover:border-vermilion/40 transition"
          >
            <h2 className="text-base font-medium text-ink">AIお礼メール作成</h2>
            <p className="mt-2 text-xs text-ink/45">
              感謝を伝えるビジネスメールを自動生成
            </p>
          </a>

          <a
            href="/request-email"
            className="rounded-md border border-ink/10 bg-white/70 p-5 hover:border-vermilion/40 transition"
          >
            <h2 className="text-base font-medium text-ink">AI依頼メール作成</h2>
            <p className="mt-2 text-xs text-ink/45">
              丁寧なお願いメールを自動生成
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}
