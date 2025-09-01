import { getApiBackend } from "@/utils/env.util";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const backendUrl = getApiBackend() || "";
    const token = cookies().get('token');
    const res = await fetch(`${backendUrl}/api/auth/logout`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token?.value}`
        },
    })
    const data = await res.json();
    // Extract token after "Bearer "
    if(data.status == 204) {
        cookies().delete('token');
    }
    return Response.json(data)
}