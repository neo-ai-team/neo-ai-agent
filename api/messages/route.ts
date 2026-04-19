// app/api/messages/route.ts
import { BotFrameworkAdapter } from 'botbuilder';
import { NeoBot } from '../../bots/neo-bot';
import dotenv from 'dotenv';

dotenv.config();

const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID!,
    appPassword: process.env.MICROSOFT_APP_PASSWORD!,
});

const bot = new NeoBot();

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const authHeader = request.headers.get('Authorization') || '';

        // We use 'as any' to bypass the Node-style Request/Response type requirement
        // because processActivity internally handles the logic we need.
        await (adapter as any).processActivity(
            authHeader,
            body,
            async (context: any) => {
                await bot.run(context);
            }
        );

        return new Response(null, { status: 200 });
    } catch (error) {
        console.error('[Neo] Error processing message:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}