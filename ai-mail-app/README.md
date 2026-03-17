# AIビジネスメール生成

AIが丁寧な日本語ビジネスメールを自動生成するWebアプリです。

## 技術スタック

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Anthropic Claude API**

## セットアップ

### 1. 依存パッケージのインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local.example` をコピーして `.env.local` を作成し、APIキーを設定します。

```bash
cp .env.local.example .env.local
```

`.env.local` を開いて `your_api_key_here` を実際のAPIキーに置き換えてください。

APIキーは [Anthropic Console](https://console.anthropic.com) で取得できます。

### 3. 開発サーバーの起動

```bash
npm run dev
```

`http://localhost:3000` でアクセスできます。

## Vercelへのデプロイ

1. GitHubリポジトリにプッシュ
2. [Vercel](https://vercel.com) でリポジトリをインポート
3. 環境変数 `ANTHROPIC_API_KEY` を設定
4. デプロイ完了

## プロジェクト構成

```
src/
└── app/
    ├── api/
    │   └── generate/
    │       └── route.ts   # AI生成APIエンドポイント
    ├── globals.css        # グローバルスタイル
    ├── layout.tsx         # レイアウト・SEOメタデータ
    └── page.tsx           # メインページ
```
