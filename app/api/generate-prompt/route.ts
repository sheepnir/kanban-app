import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { title, description } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Card title is required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const message = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert software development assistant specializing in helping developers plan and implement features efficiently. Your task is to take a feature title and optional description, and generate a detailed, comprehensive prompt that Claude Code (an AI programming assistant) can use to implement this feature.

The prompt should include:
1. Clear objective and goals
2. Technical requirements and constraints
3. File structure and organization
4. Key components or functions needed
5. Best practices and design patterns
6. Testing considerations
7. Performance and accessibility requirements
8. Any relevant code examples or patterns

Make the prompt specific, actionable, and comprehensive enough that Claude Code can independently implement the feature with minimal additional context. Format the prompt in a clear, structured way that's easy to follow.`,
        },
        {
          role: "user",
          content: `Feature Title: ${title}${
            description ? `\n\nDescription: ${description}` : ""
          }

Please generate a detailed implementation prompt for this feature that I can use with Claude Code.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    const generatedPrompt =
      message.choices[0]?.message?.content ||
      "Failed to generate prompt. Please try again.";

    return NextResponse.json({ prompt: generatedPrompt });
  } catch (error) {
    console.error("Error generating prompt:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: `Failed to generate prompt: ${error.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate prompt" },
      { status: 500 }
    );
  }
}
