import { NextResponse } from "next/server"

export async function POST(request) {
    const data = await request.json()
    const accessToken = data.accessToken

    if (!accessToken)
        return NextResponse.json({ "status": 401, "msg": "access token required for logout" })


    const response = await fetch("https://config.private.zscaler.com/signout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        },
        body: {}
    })

    if (response.status != 200) {
        return NextResponse.json({ "status": 401, "msg": "signout failed" })
    }

    return NextResponse.json({ "status": 200, "msg": "signout success" })
}