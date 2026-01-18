"use client"

import { useEffect } from "react"
import { cleanupExpiredViews } from "@/services/sessionService"

export default function SessionInitializer() {
    useEffect(() => {
        cleanupExpiredViews()
    }, [])
    return null
}