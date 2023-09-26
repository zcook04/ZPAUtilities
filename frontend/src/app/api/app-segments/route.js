import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET(res) {
    const customerId = cookies().get("ZscalerCustomerId").value
    const accessToken = cookies().get("ZscalerAccessToken").value

    const applicationSegments = []
    let currentPage = 1
    let totalPages = 1
    const pageSize = 500

    while (currentPage <= totalPages) {
        try {
            const response = await fetch(`https://config.private.zscaler.com/mgmtconfig/v1/admin/customers/${customerId}/application?page=1&pagesize=${pageSize}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            })
            const data = await response.json()

            if (response.ok) {
                applicationSegments.push(...data.list)
                currentPage++
                totalPages = parseInt(data.totalPages);
            } else {
                console.error(`Error fetching data from page ${currentPage}`);
                break;
            }

        } catch (error) {
            console.error(`Error fetching data from page ${currentPage}: ${error}`);
            break;
        }
    }

    console.log(applicationSegments)

    return NextResponse.json({ "status": 200, "message": "Application Segments Retrieved", "appSegments": applicationSegments })
}