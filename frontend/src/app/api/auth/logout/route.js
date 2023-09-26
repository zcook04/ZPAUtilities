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
        return NextResponse.json({ message: "signout failed", response }, { status: 401 })
    }

    cookies().delete("ZscalerAccessToken")

    return NextResponse.json({ message: "signout success" }, { status: 200 })
}