const groqUrl = "https://api.groq.com/openai/v1/chat/completions";

export const generateResponse = async (prompt) => {
  try {
    const res = await fetch(groqUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "Return ONLY valid JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error("Groq API error: " + err);
    }

    const data = await res.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.log("error from generateResponse", error);
  }
};
