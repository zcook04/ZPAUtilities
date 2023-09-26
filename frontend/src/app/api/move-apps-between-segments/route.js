import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function PUT(req) {
    const customerId = cookies().get("ZscalerCustomerId").value
    const accessToken = cookies().get("ZscalerAccessToken").value
    const { applications, applicationIdA, applicationIdB } = await req.json()

    if (!applications) {
        return NextResponse.json({ message: "No applications provided" }, { status: 400 })
    }

    if (!applicationIdA || applicationIdB) {
        return NextResponse.json({ message: "Application IDs Required" }, { status: 400 })
    }

    if (!customerId || !accessToken) {
        return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 })
    }
    const urla = `https://config.private.zscaler.com/mgmtconfig/v1/admin/customers/${customerId}/application/${applicationIdA}`

    const urlb = `https://config.private.zscaler.com/mgmtconfig/v1/admin/customers/${customerId}/application/${applicationIdB}`

    // Get the current application configuration
    try {
        const currentAppSemgentConfigA = await fetch(urla, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        const currentAppSemgentConfigB = await fetch(urlb, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        // Validate requests to both application segements came back ok.
        if (!currentAppSemgentConfigA.ok || !currentAppSemgentConfigB.ok) {
            return NextResponse.json({ message: "Unable to get current application configuration" }, { status: 500 })
        }

        // Pull out the current configurationd data from each application segment
        const dataA = await currentAppSemgentConfigA.json()
        const dataB = await currentAppSemgentConfigB.json()

        // Check to make sure there is valid current data for both application segments
        if (!dataA || !dataB) {
            return NextResponse.json({ message: "Unable to get current application configuration data" }, { status: 500 })
        }

        // Update the Data
        const updatedDataA = { ...dataA, domainNames: [...dataA.domainNames.filter(domain => !dataA.domainNames.includes(domain))] }
        const updatedDataB = { ...dataB, domainNames: [...dataB.domainNames, ...applications] }

        // Remove Applications From Application Segment A
        const updatedAppSegmentConfigA = await fetch(urla, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedDataA)
        })

        if (!updatedAppSegmentConfigA.ok) {
            return NextResponse.json({ message: "Unable to update the application configuration.  Error removing applications from application A" }, { status: 500 })
        }

        // Add Applications To Application Segment B 
        const updatedAppSegmentConfigB = await fetch(urlb, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedDataB)
        })

        if (!updatedAppSegmentConfigB.ok) {
            return NextResponse.json({ message: "Unable to update the application configuration.  Error adding applications to application B" }, { status: 500 })
        }

        return NextResponse.json({ message: "Application Segments Updated and Applications Moved" }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Unable to get/update current application configuration" }, { status: 500 })
    }
}