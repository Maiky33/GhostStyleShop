"use client";

import { cn } from "@/lib/utils";

type AuthInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: React.ReactNode;
  endAction?: React.ReactNode;
  containerClassName?: string;
};

export function AuthInput({
  label,
  icon,
  endAction,
  className,
  containerClassName,
  id,
  ...props
}: AuthInputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={cn("space-y-2", containerClassName)}>
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-black"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          className={cn(
            "h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-black placeholder:text-neutral-400 outline-none transition-colors focus:border-black",
            (icon || endAction) && "pr-11",
            className,
          )}
          {...props}
        />
        {endAction ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {endAction}
          </div>
        ) : icon ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-black">
            {icon}
          </div>
        ) : null}
      </div>
    </div>
  );
}
