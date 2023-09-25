import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request) {
    if (!cookies().has("ZscalerAccessToken"))
        return NextResponse.json({ "status": 401, "msg": "Access Token Expired Or Missing" })

    return NextResponse.json({ "status": 200, "msg": "access token validated" })
}