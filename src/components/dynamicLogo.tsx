"use client";

import Image from "next/image";
import Logo from "@/assets/logo-mobile.svg";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export const DynamicLogo = () => {
	const { theme } = useTheme();
	return (
		<div className="flex gap-4 items-center">
			<Image src={Logo} alt="logo" />
			<p className={cn("text-foreground-2 font-extrabold text-3xl")}>
				Koodle
			</p>
		</div>
	);
};
