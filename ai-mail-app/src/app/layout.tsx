import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIビジネスメール生成 | 丁寧な日本語メールをAIが作成",
  description:
    "用途・相手・内容を入力するだけで、AIが丁寧で的確なビジネスメールを自動生成します。お礼・依頼・謝罪など様々なシーンに対応。",
  keywords: "ビジネスメール, AI, 自動生成, 日本語, メール作成",
  openGraph: {
    title: "AIビジネスメール生成",
    description: "AIが丁寧な日本語ビジネスメールを自動生成します。",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
