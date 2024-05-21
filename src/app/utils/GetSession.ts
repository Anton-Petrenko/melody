import { authOptions } from "./AuthOptions";
import { getServerSession } from "next-auth";

export const getAuthSession = async () => {
    const session = (await getServerSession(authOptions));
    if (!session) {
        return null;
    }
    else {
        return session;
    }
}