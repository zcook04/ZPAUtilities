import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function PUT(req) {
    const customerId = cookies().get("ZscalerCustomerId").value
    const accessToken = cookies().get("ZscalerAccessToken").value
    const { applications, applicationId } = await req.json()

    if (!applications) {
        return NextResponse.json({ message: "No applications provided" }, { status: 400 })
    }

    if (!applicationId) {
        return NextResponse.json({ message: "Application ID Required" }, { status: 400 })
    }

    if (!customerId || !accessToken) {
        return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 })
    }
    const url = `https://config.private.zscaler.com/mgmtconfig/v1/admin/customers/${customerId}/application/${applicationId}`

    // Get the current application configuration
    try {
        const currentAppSemgentConfig = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (!currentAppSemgentConfig.ok) {
            return NextResponse.json({ message: "Unable to get current application configuration" }, { status: 500 })
        }

        const data = await currentAppSemgentConfig.json()
        const updatedData = { ...data, domainNames: [...data.domainNames, ...applications] }

        //update the application configuration
        const updatedAppSegmentConfig = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        })

        if (!updatedAppSegmentConfig.ok) {
            return NextResponse.json({ message: "Unable to update the application configuration" }, { status: 500 })
        }

        return NextResponse.json({ message: "Application Segment Updated" }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Unable to get/update current application configuration" }, { status: 500 })
    }
}

export async function DELETE(req) {
    const customerId = cookies().get("ZscalerCustomerId").value
    const accessToken = cookies().get("ZscalerAccessToken").value
    const { applications, applicationId } = await req.json()

    if (!applications) {
        return NextResponse.json({ message: "No applications provided" }, { status: 400 })
    }

    if (!applicationId) {
        return NextResponse.json({ message: "Application ID Required" }, { status: 400 })
    }

    if (!customerId || !accessToken) {
        return NextResponse.json({ message: "Invalid Credentials" }, { status: 401 })
    }
    const url = `https://config.private.zscaler.com/mgmtconfig/v1/admin/customers/${customerId}/application/${applicationId}`

    // Get the current application configuration
    try {
        const currentAppSemgentConfig = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        if (!currentAppSemgentConfig.ok) {
            return NextResponse.json({ message: "Unable to get current application configuration" }, { status: 500 })
        }

        const data = await currentAppSemgentConfig.json()
        const newDomainNames = data.domainNames.filter(domainName => !applications.includes(domainName))

        const updatedData = { ...data, domainNames: newDomainNames }

        //update the application configuration
        const updatedAppSegmentConfig = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        })

        if (!updatedAppSegmentConfig.ok) {
            return NextResponse.json({ message: "Unable to update the application configuration" }, { status: 500 })
        }

        return NextResponse.json({ message: "Application Segment Updated" }, { status: 200 })

    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "Unable to get/update current application configuration" }, { status: 500 })
    }
}