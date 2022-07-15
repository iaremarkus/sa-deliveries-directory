import { GoogleStrategy } from "remix-auth-google";

import { authenticator } from "./auth.server";

let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.CLIENT_ID || "",
    clientSecret: process.env.PRIVATE_KEY_ID || "",
    callbackURL: process.env.AUTH_URI || ""
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    // return User.findOrCreate({ email: profile.emails[0].value });
    console.log("yay", accessToken, refreshToken, extraParams, profile);
  }
);

authenticator.use(googleStrategy);
