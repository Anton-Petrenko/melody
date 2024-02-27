import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function getProfile(req: NextApiRequest, res: NextApiResponse) {
  
    const accessToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    
    console.log(accessToken)

    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  
    const data = await response.json();
    console.log(data)
  }
