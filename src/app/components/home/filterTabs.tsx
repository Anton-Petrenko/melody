'use client'

import { Tabs, Tab } from "@nextui-org/react"
import { usePathname } from "next/navigation"

export default function TabsHome() {
    return (
        <div>
            <Tabs variant="light" size="lg">
                <Tab key="Home" title="Songs"/>
                <Tab key="Albums" title="Albums"/>
                <Tab key="Artists" title="Artists"/>
            </Tabs>
        </div>
    )
}