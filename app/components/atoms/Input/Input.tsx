import classNames from "classnames";

export interface InputProps {
  type: "text" | "email" | "telephone" | "number" | "checkbox" | "list";
  label: string;
  placeholder?: string;
  name: string;
  initialValue?: string;
  className?: string;
}

export const Input = ({ type, label, placeholder = "", name, initialValue, className = "", ...props }: InputProps) => {
  return (
    <div
      className={classNames(
        "flex flex-col gap-1",
        ["checkbox"].includes(type) ? "checkbox" : "normal-field",
        className
      )}
      {...props}
    >
      <input
        type={type}
        id={name}
        name={name}
        className="border border-slate-500 p-3 rounded-md text-lg text-slate-800"
        placeholder={placeholder || label}
      />
      <label htmlFor={name} className="text-sm font-medium text-slate-400">
        {label}
      </label>
    </div>
  );
};
