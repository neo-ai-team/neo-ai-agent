// app/api/ping/route.ts — Health check endpoint for connectivity testing
export async function GET() {
    return Response.json({
        status: 'ok',
        service: 'neo-ai-agent',
        timestamp: new Date().toISOString(),
    });
}
