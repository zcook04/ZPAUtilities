import { NextResponse } from "next/server"

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
    const accessToken = authresponse.access_token
    console.log(accessToken)

    if (!accessToken) {
        return NextResponse.json({ "status": 401, "msg": "login failed" })
    }

    return NextResponse.json({ "status": 200, "accessToken": accessToken, "expiresIn": authresponse.expires_in, "tokenType": authresponse.token_type, "scope": authresponse.scope, "refreshToken": authresponse.refresh_token, "msg": "login success" })
}