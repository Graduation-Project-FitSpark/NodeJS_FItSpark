import axios from "axios";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

export const sendMessageToOpenAI = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer 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`, // Use environment variable
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse = response.data.choices[0].message.content;
    res.json({ response: aiResponse });
  } catch (error) {
    console.error(
      "Error sending message to OpenAI:",
      error.response?.data || error.message
    );

    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  }
};
