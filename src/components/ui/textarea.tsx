import * as React from "react";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: string | FieldError;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, error, ...props }, ref) => {
		return (
			<div className="relative flex-grow">
				<textarea
					className={cn(
						"flex min-h-[80px] w-full rounded-md border border-input bg-background-2 px-4 py-2 text-bsm font-medium text-foreground-2 ring-offset-background-2 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
						{ "border-destructive": error },
						className
					)}
					ref={ref}
					{...props}
				/>
				{error && (
					<span className="absolute right-3 top-4 font-medium text-bsm text-destructive">
						{typeof error === "string" ? error : error.message}
					</span>
				)}
			</div>
		);
	}
);
Textarea.displayName = "Textarea";

export { Textarea };
