"use client";

import { useState, useRef } from "react";

const PURPOSE_PRESETS = [
  "お礼・感謝",
  "依頼・お願い",
  "お詫び・謝罪",
  "ご挨拶・自己紹介",
  "確認・問い合わせ",
  "案内・通知",
  "承諾・了解",
  "お断り・辞退",
];

export default function Home() {
  const [purpose, setPurpose] = useState("");
  const [recipient, setRecipient] = useState("");
  const [content, setContent] = useState("");
  const [generatedEmail, setGeneratedEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async () => {
    if (!purpose.trim() || !recipient.trim() || !content.trim()) {
      setError("すべての項目を入力してください。");
      return;
    }
    setError("");
    setIsLoading(true);
    setGeneratedEmail("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purpose, recipient, content }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "生成に失敗しました。");
      setGeneratedEmail(data.email);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "エラーが発生しました。");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-washi">
      {/* Header */}
      <header className="relative overflow-hidden border-b border-ink/10">
        <div className="absolute inset-0 bg-gradient-to-br from-ink to-ink-light" />
        {/* Decorative vertical lines */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-px bg-washi"
              style={{ left: `${(i + 1) * 12.5}%` }}
            />
          ))}
        </div>
        {/* Red accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-vermilion" />

        <div className="relative mx-auto max-w-3xl px-6 py-10 sm:py-14">
          <div className="flex items-start gap-4">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-vermilion shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-washi">
                <path
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="font-display text-xs font-medium tracking-[0.25em] text-washi/50 uppercase mb-1">
                AI-Powered
              </p>
              <h1 className="font-display text-2xl sm:text-3xl font-medium text-washi leading-tight">
                AIビジネスメール生成
              </h1>
              <p className="mt-2 text-sm text-washi/60 leading-relaxed">
                用途・相手・内容を入力するだけで、丁寧なビジネスメールを自動作成します
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-14">
        {/* Form Card */}
        <div className="animate-fade-in rounded-lg border border-ink/10 bg-white/70 shadow-sm backdrop-blur-sm">
          <div className="border-b border-ink/8 px-6 py-4">
            <h2 className="font-display text-base font-medium text-ink flex items-center gap-2">
              <span className="inline-block h-4 w-0.5 bg-vermilion rounded-full" />
              メール情報の入力
            </h2>
          </div>

          <div className="p-6 space-y-6">
            {/* Purpose */}
            <div className="stagger-1 animate-slide-up">
              <label className="block text-xs font-medium tracking-widest text-ink/50 uppercase mb-2">
                用途
              </label>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {PURPOSE_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setPurpose(preset)}
                    className={`px-3 py-1 rounded-full text-xs border transition-all duration-150 ${
                      purpose === preset
                        ? "bg-vermilion border-vermilion text-white shadow-sm"
                        : "bg-washi border-ink/15 text-ink/60 hover:border-vermilion/40 hover:text-vermilion"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="例：取引先への納期遅延のお詫び"
                className="focus-vermilion w-full rounded-md border border-ink/15 bg-washi/50 px-4 py-3 text-sm text-ink placeholder-ink/30 transition-colors focus:border-vermilion/40 focus:bg-white"
              />
            </div>

            {/* Recipient */}
            <div className="stagger-2 animate-slide-up">
              <label className="block text-xs font-medium tracking-widest text-ink/50 uppercase mb-2">
                相手
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="例：株式会社〇〇 営業部長 山田様"
                className="focus-vermilion w-full rounded-md border border-ink/15 bg-washi/50 px-4 py-3 text-sm text-ink placeholder-ink/30 transition-colors focus:border-vermilion/40 focus:bg-white"
              />
            </div>

            {/* Content */}
            <div className="stagger-3 animate-slide-up">
              <label className="block text-xs font-medium tracking-widest text-ink/50 uppercase mb-2">
                内容・要点
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                placeholder="例：先日の打ち合わせで確認した納期（12月20日）が、部品調達の遅れにより1週間ほど遅延する見込みです。お詫びと新しい納期の提案をしたい。"
                className="focus-vermilion w-full rounded-md border border-ink/15 bg-washi/50 px-4 py-3 text-sm text-ink placeholder-ink/30 transition-colors focus:border-vermilion/40 focus:bg-white leading-relaxed"
              />
              <p className="mt-1.5 text-xs text-ink/35">
                要点を箇条書きや簡単な文章で入力してください
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="animate-fade-in flex items-start gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Generate Button */}
            <div className="stagger-4 animate-slide-up">
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="group relative w-full overflow-hidden rounded-md bg-ink px-6 py-3.5 text-sm font-medium text-washi transition-all duration-200 hover:bg-ink-light disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="absolute inset-0 -translate-x-full bg-vermilion/20 transition-transform duration-500 group-hover:translate-x-0" />
                <span className="relative flex items-center justify-center gap-2.5">
                  {isLoading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      <span>生成中...</span>
                    </>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                        <path
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>メールを生成する</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="mt-8 animate-fade-in rounded-lg border border-ink/10 bg-white/70 shadow-sm">
            <div className="border-b border-ink/8 px-6 py-4">
              <div className="shimmer-box h-4 w-32 rounded" />
            </div>
            <div className="p-6 space-y-3">
              {[100, 80, 95, 70, 85, 60, 90].map((w, i) => (
                <div
                  key={i}
                  className="shimmer-box h-3.5 rounded"
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {generatedEmail && !isLoading && (
          <div ref={resultRef} className="mt-8 animate-slide-up">
            <div className="rounded-lg border border-ink/10 bg-white/80 shadow-sm backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-ink/8 px-6 py-4">
                <h2 className="font-display text-base font-medium text-ink flex items-center gap-2">
                  <span className="inline-block h-4 w-0.5 bg-vermilion rounded-full" />
                  生成されたメール
                </h2>
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline text-xs text-ink/35">
                    {generatedEmail.length}文字
                  </span>
                  <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                      copied
                        ? "border-green-300 bg-green-50 text-green-700"
                        : "border-ink/15 bg-washi text-ink/70 hover:border-vermilion/40 hover:text-vermilion"
                    }`}
                  >
                    {copied ? (
                      <>
                        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        コピー済み
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                          <path
                            d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                            fill="currentColor"
                          />
                          <path
                            d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"
                            fill="currentColor"
                          />
                        </svg>
                        コピー
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className="p-6">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-[1.9] text-ink">
                  {generatedEmail}
                </pre>
              </div>
              {/* Bottom regenerate */}
              <div className="border-t border-ink/8 px-6 py-4">
                <button
                  onClick={handleGenerate}
                  className="text-xs text-ink/40 hover:text-vermilion transition-colors flex items-center gap-1.5"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                    <path
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  再生成する
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="mt-10 stagger-5 animate-slide-up">
          <hr className="brush-rule mb-8" />
          <h3 className="font-display text-sm font-medium text-ink/50 mb-4 tracking-wider">
            ご利用のヒント
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: "✦",
                title: "用途を具体的に",
                desc: "プリセットを選ぶか、「取引先への〇〇」のように具体的に入力するとより精度が上がります",
              },
              {
                icon: "✦",
                title: "相手の情報を詳しく",
                desc: "「株式会社〇〇 部長 田中様」のように役職や会社名を含めるとより適切な敬語が使われます",
              },
              {
                icon: "✦",
                title: "要点を箇条書きで",
                desc: "伝えたいことを箇条書きで列挙するだけでOK。AIが自然な文章に整えます",
              },
            ].map((tip, i) => (
              <div
                key={i}
                className="rounded-md border border-ink/8 bg-white/50 p-4"
              >
                <span className="text-vermilion text-xs">{tip.icon}</span>
                <h4 className="mt-1 text-xs font-medium text-ink/70">{tip.title}</h4>
                <p className="mt-1 text-xs text-ink/40 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-ink/8 mt-16">
        <div className="mx-auto max-w-3xl px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-ink/30 font-display">AIビジネスメール生成</p>
          <p className="text-xs text-ink/25">
            Powered by OpenAI
          </p>
        </div>
      </footer>
    </div>
  );
}
