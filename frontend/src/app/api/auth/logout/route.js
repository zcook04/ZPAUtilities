import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST(request) {
    const accessToken = cookies().get("ZscalerAccessToken")
    console.log(accessToken)

    if (!accessToken)
        return NextResponse.json({ "status": 401, "msg": "access token required for logout" })

    const response = await fetch("https://config.private.zscaler.com/signout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken.value
        },
        body: {}
    })

    if (response.status != 200) {
        return NextResponse.json({ "status": 401, "msg": "signout failed" })
    }

    cookies().delete("ZscalerAccessToken")

    return NextResponse.json({ "status": 200, "msg": "signout success" })
}