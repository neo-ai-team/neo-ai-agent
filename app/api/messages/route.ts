// app/api/messages/route.ts
import {
    CloudAdapter,
    ConfigurationServiceClientCredentialFactory,
    createBotFrameworkAuthenticationFromConfiguration
} from 'botbuilder';
import { NeoBot } from '../../../bots/neo-bot';

// 1. Setup Credentials Factory using your Vercel Environment Variables
const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
    MicrosoftAppId: process.env.MICROSOFT_APP_ID,
    MicrosoftAppPassword: process.env.MICROSOFT_APP_PASSWORD,
    MicrosoftAppType: 'MultiTenant', // This is critical for Teams/Emulator
});

// 2. Create the Authentication and Adapter
const botFrameworkAuthentication = createBotFrameworkAuthenticationFromConfiguration(null, credentialsFactory);
const adapter = new CloudAdapter(botFrameworkAuthentication);

// 3. Define the Global Error Handler (This will help logs show up in Vercel)
adapter.onTurnError = async (context, error) => {
    console.error(`[Neo Bot Error]: ${error.message}`);
    console.error(error); // This prints the full stack trace in Vercel logs
    await context.sendActivity('The bot encountered an error or invalid credentials.');
};

const bot = new NeoBot();

export async function POST(request: Request) {
    try {
        // Parse the body as JSON
        const body = await request.json();

        // Next.js Request object needs to be converted slightly for the adapter
        // We use a Response object to capture the result
        const res = new Response();

        // Process the activity
        // Note: adapter.process expects a Node-like request/response, 
        // but this modern syntax works best for Next.js 16
        await adapter.process(request as any, res as any, async (context) => {
            await bot.run(context);
        });

        return new Response(null, { status: 200 });
    } catch (error) {
        console.error('[Neo API] Crash:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}