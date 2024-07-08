import { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

// Input med forwardRef men utan compound component. Blir kladdig ju större koden blir.

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
  labelPlacement?: "top" | "bottom";
  error?: FieldError;
}

export default forwardRef<HTMLInputElement, Props>(function _Input(
  { label, icon, labelPlacement = "top", error, ...rest },
  ref
) {
  return (
    <div className="mb-3 w-50">
      {labelPlacement === "top" && (
        <label className="form-label">
          {icon && <i className={icon} />}
          {label}
        </label>
      )}
      <input ref={ref} className="form-control" {...rest} />
      {labelPlacement === "bottom" && (
        <label className="form-label">
          {icon && <i className={icon} />}
          {label}
        </label>
      )}

      {error && <p className="text-danger">{error.message}</p>}
    </div>
  );
});
