import { NextResponse } from "next/server"

export async function POST(req) {
    const data = await req.json()
    const { customerId, clientId, clientSecret } = data

    return NextResponse.json({ "msg": "login success" })
}