import { GoogleGenAI, Type } from "@google/genai";
import type { GameStep, Difficulty } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    story: {
      type: Type.STRING,
      description: "A short, engaging paragraph of the story. Maximum 100 words."
    },
    problem: {
      type: Type.STRING,
      description: "A multiplication problem as a string, e.g., '12 * 9'. The complexity should match the requested difficulty."
    },
    correctAnswer: {
      type: Type.NUMBER,
      description: "The numerical correct answer to the multiplication problem."
    },
    choices: {
      type: Type.ARRAY,
      description: "An array of 2-3 short, descriptive action choices for the player. If the story is concluding, this can be an empty array.",
      items: {
        type: Type.STRING
      }
    }
  },
  required: ["story", "problem", "correctAnswer", "choices"],
};

const difficultyDescriptions: Record<Difficulty, string> = {
  easy: "easy 1-digit by 1-digit multiplication (e.g., 7 * 8)",
  medium: "medium 2-digit by 1-digit multiplication (e.g., 15 * 8)",
  hard: "challenging 2-digit by 2-digit multiplication (e.g., 23 * 14)",
};


export async function getNextStep(playerChoice?: string, difficulty: Difficulty = 'medium'): Promise<GameStep> {
  const systemInstruction = `You are a creative and fun game master designing a text-based adventure game for students in 5th and 6th grade (ages 10-13). The game's theme is a magical fantasy world called 'Aethelgard'. Your primary goal is to help them practice multiplication in an exciting way.

RULES:
1.  Each turn, you will generate a short story segment (max 100 words), a multiplication problem, the correct answer, and 2-3 choices for the player.
2.  The story must be engaging, age-appropriate, and lead into the math problem naturally. The problem should feel like a puzzle to solve to progress.
3.  The multiplication problems must be ${difficultyDescriptions[difficulty]}.
4.  The player's choices should directly influence the next part of the story.
5.  If a player's choice leads to a natural conclusion (e.g., they find the treasure, defeat the dragon), make the story a concluding paragraph and provide an empty array for the choices.
6.  You must always respond in the specified JSON format.`;
  
  const prompt = playerChoice
    ? `The player chose to: "${playerChoice}". Continue the story from there.`
    : `Start the game with an exciting opening scene in the Whispering Woods of Aethelgard. The difficulty is set to ${difficulty}.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.9,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);

    // Basic validation to ensure the response matches the GameStep interface
    if (
      typeof parsedResponse.story !== 'string' ||
      typeof parsedResponse.problem !== 'string' ||
      typeof parsedResponse.correctAnswer !== 'number' ||
      !Array.isArray(parsedResponse.choices)
    ) {
      throw new Error("Invalid response structure from API");
    }

    return parsedResponse as GameStep;
  } catch (error) {
    console.error("Error fetching next game step from Gemini:", error);
    // Re-throw the error so it can be caught by the UI component and displayed to the user.
    throw new Error("Failed to generate the next step of the adventure. The magic may be unstable.");
  }
}