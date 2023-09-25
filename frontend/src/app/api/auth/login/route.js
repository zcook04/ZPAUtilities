import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req) {
    const data = await req.json()
    const { clientId, clientSecret } = data

    const encodedClientId = encodeURIComponent(clientId)
    const encodedClientSecret = encodeURIComponent(clientSecret)

    const payload = `client_id=${encodedClientId}&client_secret=${encodedClientSecret}`

    const response = await fetch("https://config.private.zscaler.com/signin", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload
    })

    const authresponse = await response.json()

    cookies().set({
        name: 'ZscalerAccessToken',
        value: authresponse.access_token,
        httpOnly: true,
        maxAge: authresponse.expires_in,
        refreshToken: authresponse.refresh_token,
        tokenType: authresponse.token_type
    })

    if (!authresponse.access_token) {
        return NextResponse.json({ "status": 401, "message": "Authentication Failed" })
    }

    return NextResponse.json({ "status": 200, "message": "Authentication Successful" })
}