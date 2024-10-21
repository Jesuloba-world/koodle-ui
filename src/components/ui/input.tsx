import * as React from "react";

import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string | FieldError;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, error, ...props }, ref) => {
		return (
			<div className="relative flex-grow">
				<input
					type={type}
					className={cn(
						"flex h-10 w-full rounded-md border border-input bg-background-2 px-4 py-2 text-bsm font-medium text-foreground-2 ring-offset-background-2 file:border-0 file:bg-transparent file:text-bsm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						{ "border-destructive": error },
						className
					)}
					ref={ref}
					{...props}
				/>
				{error && (
					<span className="absolute right-3 top-1/2 font-medium -translate-y-1/2 text-bsm text-destructive">
						{typeof error === "string" ? error : error.message}
					</span>
				)}
			</div>
		);
	}
);
Input.displayName = "Input";

export { Input };
