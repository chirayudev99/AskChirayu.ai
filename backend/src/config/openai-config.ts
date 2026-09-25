import { Configuration } from "openai";
import { GoogleGenAI } from "@google/genai";

// export function configureOpenAI() {
//     const config = new Configuration({
//         apiKey:process.env.OPEN_AI_SECRET,
//         organization:process.env.OPEN_AI_ORG_ID
//     })
//     return config
// }

export function configureGemini() {
    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    return ai;
}