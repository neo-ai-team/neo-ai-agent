// bots/neo-bot.ts
import { ActivityHandler, TurnContext, ActivityTypes } from 'botbuilder';
import { callLLM } from '../lib/llm';

export class NeoBot extends ActivityHandler {
    constructor() {
        super();

        this.onMessage(async (context: TurnContext, next) => {
            const userText = context.activity.text?.trim() || '';

            if (userText) {
                // 1. Send an initial acknowledgment
                await context.sendActivity("Neo is checking your urgent actions across SNOW, Splunk, Outlook & Git...");

                // 2. Send a 'typing' indicator to prevent timeout and show progress
                await context.sendActivity({ type: ActivityTypes.Typing });

                try {
                    const prompt = `User asked: "${userText}". Summarize what urgent items the user should look into today.`;

                    // 3. Call your LLM logic
                    const llmResponse = await callLLM(prompt);

                    // 4. Send the final response
                    await context.sendActivity(llmResponse.content || "No urgent items found at this moment.");
                } catch (error) {
                    console.error("Error in NeoBot:", error);
                    await context.sendActivity("Sorry, I encountered an error while retrieving your urgent actions.");
                }
            }

            await next();
        });

        // Optional: Add a greeting when the user joins
        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            for (const member of membersAdded!) {
                if (member.id !== context.activity.recipient.id) {
                    await context.sendActivity("Welcome! I am Neo, your AI agent. How can I help you manage your tasks today?");
                }
            }
            await next();
        });
    }
}