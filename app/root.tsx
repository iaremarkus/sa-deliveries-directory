import type { MetaFunction } from "@remix-run/node";
import { Form, useFetchers, useTransition } from "@remix-run/react";
import { Link, Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "@remix-run/react";
import NProgress from "nprogress";
import nProgressStyles from "nprogress/nprogress.css";
import { useEffect, useMemo, useRef } from "react";

import styles from "./styles/app.css";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Shops that deliver products to South Africa | South African Deliveries Directory",
  viewport: "width=device-width,initial-scale=1"
});

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "stylesheet", href: nProgressStyles }
  ];
}

export default function App() {
  let { pathname } = useLocation();
  let transition = useTransition();
  let fetchers = useFetchers();
  const pageOutlet = useRef<HTMLDivElement>(null!);

  /**
   * This gets the state of every fetcher active on the app and combine it with
   * the state of the global transition (Link and Form), then use them to
   * determine if the app is idle or if it's loading.
   * Here we consider both loading and submitting as loading.
   */
  let state = useMemo<"idle" | "loading">(
    function getGlobalState() {
      let states = [transition.state, ...fetchers.map(fetcher => fetcher.state)];
      if (states.every(state => state === "idle")) return "idle";
      return "loading";
    },
    [transition.state, fetchers]
  );

  useEffect(() => {
    // and when it's something else it means it's either submitting a form or
    // waiting for the loaders of the next location so we start it
    if (state === "loading") {
      pageOutlet.current.classList.add("loading");
      NProgress.start();
    }
    // when the state is idle then we can to complete the progress bar
    if (state === "idle") {
      pageOutlet.current.classList.remove("loading");
      NProgress.done();
    }
  }, [state]);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="flex item-center justify-between">
          <div className="flex gap-4 p-10">
            <Link to="/">
              <button className="bg-slate-600 p-3 px-4 rounded-md text-white">Home</button>
            </Link>
            <Link to="/coffees">
              <button className="bg-indigo-900 p-3 px-4 rounded-md text-white">View Coffees</button>
            </Link>
            <Link to="/alcohol">
              <button className="bg-purple-600 p-3 px-4 rounded-md text-white">View Alcohol</button>
            </Link>
          </div>

          <div className="flex gap-4 p-10">
            {pathname.includes("coffees") && (
              <Link to="/coffees/add">
                <button className="bg-purple-500 p-3 rounded-md text-white">Add a new coffee retailer</button>
              </Link>
            )}

            {pathname.includes("alcohol") && (
              <Link to="/alcohol/add">
                <button className="bg-purple-500 p-3 rounded-md text-white">Add a new bottle store</button>
              </Link>
            )}
          </div>
        </div>

        <div ref={pageOutlet} className="page-outlet">
          <Outlet />

          <Form action="/auth/google" method="post">
            <button className="absolute bottom-0 right-0 p-2">...</button>
          </Form>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
