'use client'

import { Tabs, Tab } from "@nextui-org/react"
export default function TabsHome() {
    return (
        <div>
            <Tabs variant="light" size="lg">
                <Tab key="Songs" title="Songs"/>
                <Tab key="Albums" title="Albums"/>
                <Tab key="Artists" title="Artists"/>
            </Tabs>
        </div>
    )
}