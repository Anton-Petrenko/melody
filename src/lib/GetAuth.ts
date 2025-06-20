'use server'

import { auth } from "@/auth";

export default async function GetAuth() {
    return await auth()
}