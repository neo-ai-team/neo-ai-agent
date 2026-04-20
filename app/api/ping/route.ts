// app/api/ping/route.ts — Health check endpoint for connectivity testing
export async function GET() {
    const ts = new Date().toISOString();
    console.log(`[neo-ai-agent] GET /api/ping — ${ts}`);
    return Response.json({
        status: 'ok',
        service: 'neo-ai-agent',
        timestamp: ts,
    });
}
