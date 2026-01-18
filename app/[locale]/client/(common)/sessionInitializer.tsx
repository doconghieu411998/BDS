"use client"

import { useEffect } from "react"
import { cleanupExpiredViews } from "@/services/session-service"

export default function SessionInitializer() {
    useEffect(() => {
        cleanupExpiredViews()
    }, [])
    return null
}