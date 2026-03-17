import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { purpose, recipient, content } = await req.json();

    if (!purpose || !recipient || !content) {
      return NextResponse.json(
        { error: "必要な項目が不足しています。" },
        { status: 400 }
      );
    }

    const prompt = `
あなたは日本語のビジネスメール作成アシスタントです。
以下の条件に沿って、自然で丁寧な日本語のビジネスメールを作成してください。

【用途】
${purpose}

【相手】
${recipient}

【内容】
${content}

要件:
- 件名も含める
- 丁寧で自然な日本語にする
- そのまま送れる形に整える
- 冗長すぎず簡潔にする
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "あなたは優秀な日本語ビジネスメール作成アシスタントです。",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const result = response.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ result });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { error: "メール生成中にエラーが発生しました。" },
      { status: 500 }
    );
  }
}
