
import { GoogleGenAI, Type } from "@google/genai";
import { McqItemType } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const mcqSchema = {
  type: Type.OBJECT,
  properties: {
    question_en: { type: Type.STRING, description: "The multiple-choice question in English." },
    question_ur: { type: Type.STRING, description: "The multiple-choice question translated into Urdu." },
    options: {
      type: Type.ARRAY,
      description: "An array of 5 possible answers.",
      items: {
        type: Type.OBJECT,
        properties: {
          option_en: { type: Type.STRING, description: "The answer option in English." },
          option_ur: { type: Type.STRING, description: "The answer option translated into Urdu." },
        },
        required: ["option_en", "option_ur"],
      },
    },
    correct_answer_index: {
      type: Type.INTEGER,
      description: "The 0-based index of the correct option in the 'options' array.",
    },
  },
  required: ["question_en", "question_ur", "options", "correct_answer_index"],
};

const responseSchema = {
    type: Type.ARRAY,
    items: mcqSchema
};

export const generateMcqs = async (
  topic: string,
  numMcqs: number,
  difficulty: string
): Promise<McqItemType[]> => {
  const prompt = `
    Generate ${numMcqs} multiple-choice questions (MCQs) on the topic of "${topic}".
    The subject is Pakistan Studies, which includes the history of Muslims in the Indian subcontinent before independence, the Pakistan Movement, and post-independence history.
    The difficulty level should be ${difficulty}.
    If the topic involves historical events, please ensure the questions are in chronological order.

    For each MCQ, you must provide:
    1. A question in English.
    2. An accurate Urdu translation of the question.
    3. Exactly 5 plausible options, each with an English version and an accurate Urdu translation.
    4. The 0-based index of the single correct answer.

    Return the result as a valid JSON array that adheres to the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
            temperature: 0.7,
        }
    });
    
    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    // Basic validation
    if (!Array.isArray(parsedJson)) {
        throw new Error("API did not return a valid array.");
    }

    return parsedJson as McqItemType[];

  } catch (error) {
    console.error("Error generating MCQs:", error);
    throw new Error("Failed to generate MCQs. The model might be unable to process the request for the given topic. Please try a different topic or adjust the settings.");
  }
};
