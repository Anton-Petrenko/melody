'use client'

import { Spinner } from "@heroui/react";

export default function SpinnerWrapper() {
    return (
        <div className="w-full h-20 flex justify-center">
            <Spinner variant="dots"/>
        </div>
    )
}