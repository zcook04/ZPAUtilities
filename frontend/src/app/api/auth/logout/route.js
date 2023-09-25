import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
    const accessToken = cookies().get("ZscalerAccessToken")
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
        return NextResponse.json({ "status": 401, "msg": "signout failed", response })
    }

    cookies().delete("ZscalerAccessToken")

    return NextResponse.json({ "status": 200, "msg": "signout success" })
}