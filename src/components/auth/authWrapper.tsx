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
		<Card className="sm:w-[480px] w-full">
			<CardHeader
				className={cn("flex flex-col items-center", {
					"items-start": back,
				})}
			>
				{back ? <Back /> : <DynamicLogo />}
			</CardHeader>
			<CardContent className="pt-10 pb-24">{children}</CardContent>
		</Card>
	);
};
