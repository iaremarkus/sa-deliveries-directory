// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";

import { sessionStorage } from "./session.server";

let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.AUTH_ID as string,
    clientSecret: process.env.AUTH_SECRET as string,
    callbackURL: "http://localhost:8080"
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    // Get the user data from your DB or API using the tokens and profile
    console.log("yay", accessToken, refreshToken, extraParams, profile);
  }
);

export let authenticator = new Authenticator(sessionStorage);

authenticator.use(googleStrategy);
