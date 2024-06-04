# Jamming (Spotify Playlist Builder)

Completed this React project while completing online course on [Codecademy](https://www.codecademy.com/). It allows you to query the Spotify API to build a playlist, give it a name, and import it to your account.

## Using your own Credentials

You will need to register your app and get your own credentials from the [Spotify for Developers Dashboard](https://developer.spotify.com/dashboard).

- Create a new app in the dashboard and add http://localhost:3000 to the app's redirect URL list.
- Create a new `.env` file in the main project folder and add the following:
  - `REACT_APP_SPOTIFY_API_KEY=` + the Client ID string shown within [your project](https://developer.spotify.com/dashboard)
  - `REACT_APP_REDIRECT_URI=` + the Redirect URI included within [your project](https://developer.spotify.com/dashboard)
## Running the Project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
