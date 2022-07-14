import type { MetaFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { AnimatePresence } from "framer-motion";

import { DataRow } from "molecules";

import { getData } from "models";

export let loader = () => {
  return getData("alcohol");
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Shops that deliver alcohol to South Africa | South African Deliveries Directory",
  viewport: "width=device-width,initial-scale=1"
});

export default function AlcoholRoute() {
  const posts = useLoaderData();

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Outlet />
      </AnimatePresence>

      <div className="p-4 md:p-10 flex flex-col gap-10">
        <h2 className="text-lg md:text-2xl lg:text-4xl m-0 p-0">
          Showing <span className="text-indigo-600 font-bold">{posts?.length}</span> websites to{" "}
          <strong>order alcohol</strong> in South Africa
        </h2>

        <div className="flex flex-col gap-4">
          {posts.map((post: {}, idx: number) => (
            <DataRow type="alcohol" key={`dr-${idx}`} {...post} />
          ))}
        </div>
      </div>
    </>
  );
}
