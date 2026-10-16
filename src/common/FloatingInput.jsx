import { useState } from "react";
import { Input } from "antd";
import { cn } from "@/lib/utils";

export default function FloatingInput({
  id,
  name,
  label,
  type = "text",
  value = "",
  onChange,
  onBlur,
  autoComplete,
  error,
}) {
  const [focused, setFocused] = useState(false);

  const isPassword = type === "password";
  const labelRaised = focused || String(value).length > 0;
  const InputComponent = isPassword ? Input.Password : Input;

  return (
    <div>
      <div className="relative">
        <InputComponent
          id={id}
          name={name}
          {...(!isPassword && { type })}
          autoComplete={autoComplete}
          placeholder=" "
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          status={error ? "error" : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={cn(
            "h-16! rounded-xl!",
            isPassword ? "[&_input]:pb-2! [&_input]:pt-7!" : "pb-2! pt-7!",
          )}
          style={{ paddingInline: 16 }}
        />

        <label
          htmlFor={id}
          className={cn(
            "absolute left-4 z-10 cursor-text transition-all duration-200",
            labelRaised
              ? "top-2 translate-y-0 text-xs"
              : "top-1/2 -translate-y-1/2 text-sm",
            error
              ? "text-destructive"
              : focused
                ? "text-primary"
                : "text-muted-foreground",
          )}
        >
          {label}
        </label>
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-2 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
