import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(req) {
    const customerId = cookies().get("ZscalerCustomerId").value
    const accessToken = cookies().get("ZscalerAccessToken").value

    const url = `https://config.private.zscaler.com/mgmtconfig/v1/admin/customers/${customerId}/policySet/rules/policyType/ACCESS_POLICY`

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            }
        })
        const accessPolicy = await response.json()

        if (response.ok) {
            return NextResponse.json({ message: "access policy retrieved successfully", accessPolicy }, { status: 200 })
        } else {
            console.error(response.status)
            console.error(`Error fetching access policy: ${accessPolicy}`)
            return NextResponse.json({ message: "Reponse not ok" }, { status: 400 })
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "error", error }, { status: 400 })
    }
}
