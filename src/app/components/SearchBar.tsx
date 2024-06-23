"use client"

import { Input } from "@nextui-org/react"
import { FaSearch } from "react-icons/fa"

export default function SearchBar() {
    return (
        <Input
            placeholder="Search..."
            startContent={<FaSearch/>}
            isDisabled
        >
        </Input>
    )
}