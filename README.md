# Melody

Melody is a social music platform designed to help music listeners track the music they love.

## Setup

1. Clone the repository into your code editor
2. From the root of the project, run the commend `npm install` to install all project dependencies
3. Create a new .env file in the root of your project
4. Insert `NEXTAUTH_URL = "http://localhost:3000/"` into your .env (default NextJS port)
5. [Generate a secret token](https://generate-secret.vercel.app/32) and insert `NEXTAUTH_SECRET = "your token"` into your .env
3. Create a developer project on the [Spotify Developer Website](https://developer.spotify.com/)
4. In your developer project settings, find your client ID and client secret and put them in your .env file:
```
SPOTIFY_CLIENT_ID = "your ID"
SPOTIFY_CLIENT_SECRET = "your secret"
```
5. [Create a Vercel account](https://vercel.com). In storage, create a PostgreSQL database.
6. In the database settings, copy and paste the given environment variables and post them into your .env
7. Run `npm run dev` in your project root
8. You should be able to access the project locally by opening [http://localhost:3000/](http://localhost:3000/) in your browser

> [!NOTE]
> This project is untested when the user has a free Spotify account.