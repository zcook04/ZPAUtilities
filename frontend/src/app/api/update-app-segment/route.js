import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function PUT(req) {
    const customerId = cookies().get("ZscalerCustomerId").value
    const accessToken = cookies().get("ZscalerAccessToken").value

    console.log(req.json())


    return NextResponse.json({ "status": 200, "message": "Application Segment Updated" })
}