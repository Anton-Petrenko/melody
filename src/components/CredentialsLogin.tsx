"use client"

import { useState } from "react";
import { Input } from "@heroui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function CredentialsLogin() {

    const [visible, setVisible] = useState<boolean>(false)
    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)

    const isPasswordInvalid = () => {
        if (!password) {
            return false
        }
        return password.length < 8
    }

    return (
        <div className="flex flex-col gap-1">
            <Input
                isClearable
                size="sm"
                label="Email"
                placeholder=" "
                labelPlacement="outside"
                onValueChange={setEmail}
            />
            <Input
                size="sm"
                label="Password"
                labelPlacement="outside"
                placeholder=" "
                onValueChange={setPassword}
                type={visible ? "text" : "password"}
                endContent={
                    <button
                        onClick={() => setVisible(!visible)}
                    >
                        {
                            visible ? <FaRegEyeSlash/> : <FaRegEye/>
                        }
                    </button>
                }
                isInvalid={isPasswordInvalid()}
                description={"Must be at least 8 characters long."}
            />
        </div>
    )
}