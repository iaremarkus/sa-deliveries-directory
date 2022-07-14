import type { Coords } from "types";

import classNames from "classnames";

export type LabelValueType = "title" | "text" | "email" | "website" | "price" | "location" | "phone" | "boolean";

export interface LabelValueProps {
  className?: string;
  type?: LabelValueType;
  label: string;
  value?: string | number | Coords;
}

export const LabelValue = ({ type = "text", label, value = "", className = "", ...props }: LabelValueProps) => {
  let theValue: any = value;

  if (type === "boolean") {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
    ${
      value === "true" &&
      `<path fill="green" d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.959 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591z"/>`
    }
    ${
      value === "false" &&
      `<path fill="lightgrey" d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z"/>`
    }
    </svg>`;
    theValue = <span dangerouslySetInnerHTML={{ __html: svg }}></span>;
  }

  if (type === "price") theValue = `R${value}`;

  if (type === "website") {
    theValue = value.toString().endsWith("/") ? value.toString().slice(0, -1) : value;
    theValue = (
      <span
        dangerouslySetInnerHTML={{
          __html: `<a target="_blank" rel="noopener noreferrer" href="${theValue}" class='text-indigo-400 underline'>${theValue
            .toString()
            .replace("http://", "")
            .replace("https://", "")
            .replace("www.", "")}</a>`
        }}
      ></span>
    );
  }

  if (type === "email") {
    theValue = value.toString().endsWith("/") ? value.toString().slice(0, -1) : value;
    theValue = (
      <span
        dangerouslySetInnerHTML={{
          __html: `<a target="_blank" rel="noopener noreferrer" href="mailto:${theValue}" class='text-indigo-400 underline'>${theValue.toString()}</a>`
        }}
      ></span>
    );
  }

  if (type === "phone") {
    theValue = (
      <span
        dangerouslySetInnerHTML={{
          __html: `<a href="tel:${theValue}" class='text-indigo-400 underline'>${value
            .toString()
            .replaceAll("+27", "0")
            .split("")
            .map((i, c) => (c === 3 ? " " + i : c === 6 ? " " + i : i))
            .join("")}</a>`
        }}
      ></span>
    );
  }

  if (type === "location") {
    const Coord = value as Coords;

    const longCoord = Coord ? `${Coord._latitude},${Coord._longitude}` : null;
    const shortCoord = Coord
      ? `${Coord._latitude.toString().slice(0, 6)},${Coord._longitude.toString().slice(0, 6)}`
      : null;

    theValue = (
      <span
        dangerouslySetInnerHTML={{
          __html: `<a target="_blank" rel="noopener noreferrer" class="flex gap-2 items-center" href="http://maps.google.com/maps?q=${longCoord}" class='text-indigo-400 underline'>${shortCoord} <svg class="opacity-40" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"/></svg></a>`
        }}
      ></span>
    );
  }

  return (
    <div className={classNames("labelvalue", className)} {...props}>
      {label && <span className="text-sm font-bold text-slate-400">{label}</span>}

      {value && (
        <span
          className={classNames(
            "text-ellipsis w-full overflow-hidden font-medium text-slate-700",
            type === "title" ? "text-xl" : "text-lg"
          )}
        >
          {theValue}
        </span>
      )}
    </div>
  );
};
