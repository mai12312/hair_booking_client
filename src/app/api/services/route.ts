import { NextRequest, NextResponse } from "next/server";

let services = [
    { id: 1, name: "Haircut", price: 20 },
    { id: 2, name: "Shampoo", price: 10 },
];

export async function GET() {
    return NextResponse.json(services);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const newService = {
        id: Date.now(),
        name: body.name,
        price: body.price,
    };
    services.push(newService);
    return NextResponse.json(newService, { status: 201 });
}
