// lib/llm.ts

export async function callLLM(prompt: string) {
    const provider = process.env.LLM_PROVIDER || 'Not Set';
    const model = process.env.LLM_MODEL || 'Not Set';

    // This log will appear in your Vercel Dashboard > Logs
    console.log(`[Neo LLM] Request received. Provider: ${provider}, Model: ${model}`);
    console.log(`[Neo LLM] User Prompt: ${prompt}`);

    // Simulate a slight delay to mimic AI thinking
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        content: `**Neo Status: Online**\n\nThis is a placeholder response from Neo.\n\nI am currently running as a production-ready backend on Vercel.\n\n**Next Steps:** Integration with SNOW, Splunk, Outlook, and Git.`,
        model: model
    };
}