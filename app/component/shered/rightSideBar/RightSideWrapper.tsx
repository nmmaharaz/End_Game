"use client"

import { usePathname } from "next/navigation"
import RightSideBar from "./component/RightSideBar"

function RightSideWrapper() {
    const pathname = usePathname()
    const hiddenPaths = ["/dashboard", "/login", "/signup", "/community"]
    const hide = hiddenPaths.some(path=>pathname === path || pathname.startsWith("/community"))
    if (!hide) {
        return <RightSideBar />
    }

}

export default RightSideWrapper