// lib/llm.ts
import dotenv from 'dotenv';
dotenv.config();

export async function callLLM(prompt: string) {
    console.log(`[Neo LLM] Using provider: ${process.env.LLM_PROVIDER || 'placeholder'}`);

    return {
        content: "This is a placeholder response from Neo.\n\nI am currently running as a pure backend service for Microsoft Teams.\n\nReal integration with SNOW, Splunk, Outlook, and Git will be added in the next steps.",
        model: process.env.LLM_MODEL || 'placeholder'
    };
}