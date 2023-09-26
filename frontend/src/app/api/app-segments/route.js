import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(res) {
    const customerId = cookies().get("ZscalerCustomerId").value
    const accessToken = cookies().get("ZscalerAccessToken").value

    const response = await fetch(`https://config.private.zscaler.com/mgmtconfig/v1/admin/customers/${customerId}/application`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    })

    const data = await response.json()

    return NextResponse.json({ "status": 200, "message": "Application Segments Retrieved", "appSegments": data })
}