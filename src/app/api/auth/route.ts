
export async function POST() {
    const backendUrl = process.env.NEXT_PUBLIC_HAIR_BOOKING_API || "";
    const res = await fetch(`${backendUrl}/api/auth/signin`, {
        headers: {
        'Content-Type': 'application/json',
        },
    })
 
    return Response.json(res)
}