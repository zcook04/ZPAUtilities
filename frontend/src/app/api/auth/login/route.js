import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(req) {
    const data = await req.json()
    // const { clientId, clientSecret, customerId } = data
    const clientId = process.env.CLIENT_ID
    const clientSecret = process.env.CLIENT_SECRET
    const customerId = process.env.CUSTOMER_ID

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

    if (!authresponse.access_token) {
        return NextResponse.json({ message: "Authentication Failed" }, { status: 401 })
    }

    cookies().set({
        name: 'ZscalerAccessToken',
        value: authresponse.access_token,
        httpOnly: true,
        maxAge: authresponse.expires_in,
        refreshToken: authresponse.refresh_token,
        tokenType: authresponse.token_type
    })

    cookies().set({
        name: 'ZscalerCustomerId',
        value: customerId,
        httpOnly: true,
        maxAge: authresponse.expires_in,
    })

    return NextResponse.json({ message: "Authentication Successful" }, { status: 200 })
}