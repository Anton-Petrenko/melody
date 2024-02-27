import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const getAuthSession = async () => {
    const session = (await getServerSession(authOptions));
    if (!session) {
      return null;
    }
    return session
}