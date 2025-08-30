import { NextRequest, NextResponse } from "next/server";

let services = [
    { id: 1, name: "Haircut", price: 20 },
    { id: 2, name: "Shampoo", price: 10 },
];

// Get a single service by id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    const service = services.find(s => s.id === id);
    if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(service);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    const body = await req.json();
    const idx = services.findIndex(s => s.id === id);
    if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    services[idx] = { ...services[idx], ...body };
    return NextResponse.json(services[idx]);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const id = Number(params.id);
    services = services.filter(s => s.id !== id);
    return NextResponse.json({ success: true });
}
