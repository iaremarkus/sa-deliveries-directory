import type { BoozeObject, CoffeeObject } from "types";

import classNames from "classnames";

import { LabelValue } from "atoms";

interface DataRowProps extends Partial<CoffeeObject>, Partial<BoozeObject> {
  type: "coffee" | "alcohol";
  key: string | number;
  className?: string;
}

export const DataRow = ({
  type,
  title,
  url,
  email,
  phone,
  city,
  province,
  coords,
  createdBy,
  pricing,
  hasSundries,
  hasWine,
  hasBeer,
  hasSpirits,
  className = "",
  ...props
}: DataRowProps) => {
  return (
    <div
      className={classNames(
        "shadow-md grid grid-cols-2 lg:grid-cols-9 gap-4",
        type === "coffee" ? "lg:grid-cols-9" : "lg:grid-cols-10",
        "p-4 sm:p-4 md:p-6 bg-white overflow-hidden rounded-md",
        "transition-all hover:shadow-lg",
        className
      )}
      {...props}
    >
      <LabelValue type="title" className="col-span-2 md:col-span-1" label="Title" value={title} />
      <LabelValue type="website" className="col-span-1" label="Website" value={url} />
      <LabelValue type="email" className="col-span-1" label="Email" value={email} />
      <LabelValue type="phone" className="col-span-1" label="Phone" value={phone} />
      <LabelValue className="col-span-1" label="City" value={city} />
      <LabelValue className="col-span-1" label="Province" value={province} />
      <LabelValue type="location" className="col-span-1" label="Coords" value={coords || ""} />

      {type === "coffee" && (
        <LabelValue type="price" className="col-span-1" label="Avg Pricing (per 250g)" value={pricing} />
      )}
      {type === "coffee" && (
        <LabelValue type="boolean" className="col-span-1" label="Sundries?" value={hasSundries?.toString()} />
      )}

      {type === "alcohol" && (
        <LabelValue type="boolean" className="col-span-1" label="Wine" value={hasWine?.toString()} />
      )}
      {type === "alcohol" && (
        <LabelValue type="boolean" className="col-span-1" label="Spirits" value={hasSpirits?.toString()} />
      )}
      {type === "alcohol" && (
        <LabelValue type="boolean" className="col-span-1" label="Beer" value={hasBeer?.toString()} />
      )}
    </div>
  );
};
