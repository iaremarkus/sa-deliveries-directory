import { redirect } from "@remix-run/node";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";

import { authenticator } from "../../services/auth.server";

export let loader: LoaderFunction = () => redirect("/");

export let action: ActionFunction = ({ request }: any) => {
  return authenticator.authenticate("google", request);
};
