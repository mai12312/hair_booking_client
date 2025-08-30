import { getApiBackend } from "@/utils/env.util";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const backendUrl = getApiBackend();
    const { 
       email,
       password
    } = await request.json();
    const res = await fetch(`${backendUrl}/api/auth/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    const data = await res.json();
    const authHeader = res?.headers?.get('Authorization') || "";
    // Extract token after "Bearer "
    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : "";
    if(token && token.length > 0) {
        cookies().set('token', token, { httpOnly: true, path: '/' });
    }
    return Response.json(data)
}