type Skill =
    | "cry_analysis"
    | "nutrition_analysis"
    | "sleep_support"
    | "emotional_support";

function detectSkill(message: string): Skill {
    const msg = message.toLowerCase();

    if (msg.includes("nangis") || msg.includes("cry")) {
        return "cry_analysis";
    }
    if (msg.includes("makan") || msg.includes("food")) {
        return "nutrition_analysis";
    }
    if (msg.includes("tidur") || msg.includes("sleep")) {
        return "sleep_support";
    }

    return "emotional_support";
}

function buildPrompt(
    skill: Skill,
    input: string,
    history: any[],
    babyProfile: any
) {
    const character = `
You are Nayanika, a gentle and empathetic AI babysitter.

Your personality:
- calm
- supportive
- non-judgmental
- reassuring for new mothers
`;

    // 🔥 Structured context
    const profileContext = `
Baby Profile:
- Age: ${babyProfile.age || "unknown"}
`;

    const historyText = (history || [])
        .slice(-5) // ambil 5 terakhir saja
        .map((h) => h.content)
        .join("\n");

    const context = `
${profileContext}

Recent conversation:
${historyText}
`;

    const prompts: Record<Skill, string> = {
        cry_analysis: `
${character}
${context}

A baby is crying.

User input:
${input}

IMPORTANT:
- Always consider baby age if available
- Make advice age-appropriate
- Explicitly mention the baby's age in your response if relevant


Give:
- 3 causes
- suggestions
- reassurance
`,
        nutrition_analysis: `
${character}
${context}

Analyze baby's nutrition.

User input:
${input}

IMPORTANT:
- Adjust advice based on baby's age

Provide:
- assessment
- missing nutrients
- food suggestions
`,
        sleep_support: `
${character}
${context}

Help baby sleep.

User input:
${input}

IMPORTANT:
- Sleep pattern depends on age

Provide:
- reasons
- tips
`,
        emotional_support: `
${character}

Mother is stressed.

User input:
${input}

Respond with empathy
`,
    };

    return prompts[skill];
}

async function extractMemory(input: string) {
  const prompt = `
Extract baby information from this message.

Return ONLY JSON. No explanation.

Format:
{
  "age": string | null
}

User input:
${input}
`;

  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  });

  const data = await res.json();

  try {
    return JSON.parse(data.choices[0].message.content);
  } catch {
    return {};
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const message = body.message;
    const history = body.history || [];
    let babyProfile = body.babyProfile || {};

    if (!message) {
      return Response.json({ error: "Message is required" }, { status: 400 });
    }

    // 🔥 STEP 1: Extract memory
    const extracted = await extractMemory(message);

    // 🔥 STEP 2: Merge ke profile lama
    babyProfile = {
      ...babyProfile,
      ...Object.fromEntries(
        Object.entries(extracted).filter(([_, v]) => v !== null)
      ),
    };

    // 🔥 STEP 3: Normal AI flow
    const skill = detectSkill(message);
    const prompt = buildPrompt(skill, message, history, babyProfile);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const data = await response.json();

    return Response.json({
      skill,
      result: data.choices?.[0]?.message?.content || "No response",
      babyProfile, // 🔥 kirim balik profile baru
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}