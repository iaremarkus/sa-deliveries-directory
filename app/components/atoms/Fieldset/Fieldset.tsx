import classNames from "classnames";

export interface FieldsetProps {
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const Fieldset = ({ children, className = "", ...props }: FieldsetProps) => {
  return (
    <fieldset className={classNames("flex flex-col gap-6", className)} {...props}>
      {children}
    </fieldset>
  );
};
