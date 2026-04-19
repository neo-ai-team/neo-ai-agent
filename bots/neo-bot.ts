// bots/neo-bot.ts
import { ActivityHandler, TurnContext } from 'botbuilder';
import { callLLM } from '../lib/llm.js';     // Keep .js here - Next.js expects this

export class NeoBot extends ActivityHandler {
    constructor() {
        super();

        this.onMessage(async (context: TurnContext, next) => {
            const userText = context.activity.text?.toLowerCase().trim() || '';

            await context.sendActivity("Neo is checking your urgent actions across SNOW, Splunk, Outlook & Git...");

            try {
                const prompt = `User asked: "${userText}". Summarize what urgent items the user should look into today.`;

                const llmResponse = await callLLM(prompt);

                await context.sendActivity(llmResponse.content || "No urgent items found at this moment.");
            } catch (error) {
                console.error("Error in NeoBot:", error);
                await context.sendActivity("Sorry, I encountered an error while processing your request.");
            }

            await next();
        });
    }
}