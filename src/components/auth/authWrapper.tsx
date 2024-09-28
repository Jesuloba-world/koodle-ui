import { useTheme } from "next-themes";
import Logo from "@/assets/logo-mobile.svg";
import Image from "next/image";
import { DynamicLogo } from "../dynamicLogo";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";
import { ThemeSwitch } from "../themeSwitch";
import { cn } from "@/lib/utils";
import { Back } from "./back";

export const AuthWrapper = ({
	children,
	back,
}: {
	children: ReactNode;
	back?: boolean;
}) => {
	return (
		<div className="relative grid place-items-center min-h-screen">
			<div className="absolute top-0 right-0 p-8">
				<ThemeSwitch variant="2" />
			</div>
			<Card className="w-[480px]">
				<CardHeader
					className={cn("flex flex-col items-center", {
						"items-start": back,
					})}
				>
					{back ? <Back /> : <DynamicLogo />}
				</CardHeader>
				<CardContent className="pt-10 pb-24">{children}</CardContent>
			</Card>
			{/* // <div className="bg-background-2 flex flex-col gap-4"> */}
		</div>
	);
};
