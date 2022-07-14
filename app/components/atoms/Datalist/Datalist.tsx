import classNames from "classnames";

type Option = {
  label: string;
  value: string;
};

export interface DatalistProps {
  options: Option[];
  label: string;
  placeholder?: string;
  name: string;
  initialValue?: string;

  className?: string;
}

export const Datalist = ({
  options,
  label,
  placeholder = "",
  name,
  initialValue,
  className = "",
  ...props
}: DatalistProps) => {
  return (
    <div className={classNames("flex flex-col gap-1 normal-field", className)} {...props}>
      <input
        type="text"
        id={name}
        name={name}
        className="border border-slate-500 p-3 rounded-md text-lg text-slate-800"
        required
        placeholder={placeholder || label}
        list={`${name}_list`}
      />

      <datalist id={`${name}_list`}>
        {options.length &&
          options.map(({ label, value }, idx) => (
            <option key={`option-${idx}`} value={value}>
              {label}
            </option>
          ))}
      </datalist>

      <label htmlFor={name} className="text-sm font-medium text-slate-400">
        {label}
      </label>
    </div>
  );
};
