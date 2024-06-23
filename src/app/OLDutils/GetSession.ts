import { authOptions } from "./AuthOptions";
import { Session, getServerSession } from "next-auth";

export const getAuthSession = async (): Promise<Session | null> => {
    const session = (await getServerSession(authOptions));
    if (!session) {
        return null;
    }
    else {
        return session;
    }
}