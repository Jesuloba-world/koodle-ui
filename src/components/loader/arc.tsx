import { cn } from "@/lib/utils";

export const Arc = ({
	className,
	color,
}: {
	className?: string;
	color?: string;
}) => {
	return (
		<div
			style={{ borderColor: color ?? "" }}
			className={cn(
				"w-8 h-8 border-b-2 rounded-full animate-spin border-primary",
				className
			)}
		/>
	);
};
