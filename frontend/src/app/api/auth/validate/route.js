import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request) {
    if (!cookies().has("ZscalerAccessToken"))
        return NextResponse.json({ message: "Access Token Expired Or Missing" }, { status: 401 })

    return NextResponse.json({ message: "access token validated" }, { status: 200 })
}