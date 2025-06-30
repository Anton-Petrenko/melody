Melody is an active open-source music project.

Currently, Melody is only available to be locally run, with plans to host an official Melody for the public in the future. It is also entirely dependent on the Spotify API, for now.

## Project

### Spotify

> [!NOTE]
> You must have a paid Spotify subscription in order to access the Spotify API.

1. Go to the [Spotify for Developers](https://developer.spotify.com/) page and log into your account.
2. Navigate to your dashboard and [create an app](https://developer.spotify.com/dashboard/create) with the following scopes:
```
user-read-playback-state streaming playlist-read-private user-follow-read user-top-read user-read-recently-played user-library-read user-read-email
```
3. Copy the .env.template file and copy the client secret and client id of your new spotify app into the corresponding "AUTH_" .env variables.

### Backend

**Database**

1. Spin up a PostgreSQL database instance. (I use [Railway](https://railway.com/) for my local development)
2. Obtain the public connection string to the database.
3. In the .env file, set DATABASE_URL to the connection string.

**Server**

1. Navigate to the /backend directory of the project and create a virtual environment. (optional)
```
py -m venv venv
```
2. Install the backend dependencies.
```
pip install -r requirements.txt
```
3. In the .env file in the main project folder, set the BACKEND_URL to 'localhost' and BACKEND_PORT to '5001'.
4. Run the backend.
```
py app.py
```

### Frontend

1. In the main project directory, run the following command or run the equivalent command if you have a separate package manager.
```
npm i
```
2. In the .env file, set AUTH_SECRET to a random 32 character base64 number - you can [generate one here](https://auth-secret-gen.vercel.app/).
3. In the .env file, set FRONTEND_URL to 'localhost' and FRONTEND_PORT to '3000'.
3. Now, run the following command to start the frontend locally:
```
npm run dev
```

