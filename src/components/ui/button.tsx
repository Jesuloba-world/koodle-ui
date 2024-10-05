import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-3xl ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 heading-l",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-primary-hover",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-destructive-hover",
				outline:
					"border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary-hover",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
				ghost2: "",
				sidebar:
					"rounded-l-none hover:bg-secondary hover:text-primary justify-start gap-4",
			},
			size: {
				default: "h-12 px-4 py-2",
				sm: "h-10 rounded-[20px] px-3",
				lg: "h-11 rounded-md px-8",
				icon: "h-10 w-10",
				link: "h-fit w-fit p-0",
				sidebar: "h-12 pl-8",
			},
			fullWidth: {
				true: "w-full",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			fullWidth: false,
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	isProcessing?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			fullWidth,
			isProcessing,
			disabled,
			children,
			asChild = false,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : "button";
		return (
			<Comp
				className={cn(
					buttonVariants({ variant, size, fullWidth, className })
				)}
				disabled={isProcessing || disabled}
				ref={ref}
				{...props}
			>
				<>
					{isProcessing && (
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					)}
					{children}
				</>
			</Comp>
		);
	}
);
Button.displayName = "Button";

export { Button, buttonVariants };
