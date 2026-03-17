import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { purpose, recipient, content } = await req.json();

    if (!purpose || !recipient || !content) {
      return NextResponse.json(
        { error: "用途・相手・内容は必須項目です。" },
        { status: 400 }
      );
    }

    const prompt = `あなたは日本のビジネスマナーに精通したプロのビジネスライターです。
以下の情報をもとに、丁寧で適切なビジネスメールを作成してください。

【用途】${purpose}
【相手】${recipient}
【内容・要点】${content}

以下のルールに従ってメールを作成してください：
- 件名から本文まで完全なメールとして出力すること
- 敬語・謙譲語・丁寧語を適切に使い分けること
- 簡潔かつ礼儀正しい文体にすること
- 署名は「（署名）」というプレースホルダーで終わること
- 余計な説明や前置きは一切不要。メール本文のみを出力すること`;

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const textContent = message.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("メールの生成に失敗しました。");
    }

    return NextResponse.json({ email: textContent.text });
  } catch (error: unknown) {
    console.error("API error:", error);
    const message =
      error instanceof Error ? error.message : "予期しないエラーが発生しました。";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
