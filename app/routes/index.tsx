import { Outlet } from "@remix-run/react";

export default function IndexRoute() {
  return (
    <div className="px-10 flex flex-col gap-5">
      <p
        className="text-lg md:text-2l lg:text-4xl text-center flex flex-col items-center justify-center"
        style={{ height: "calc(100vh - 400px)" }}
      >
        A directory of ecommerce websites that <strong>deliver products around South Africa</strong> - specifically
        coffee & booze.
      </p>
      <Outlet />
    </div>
  );
}
