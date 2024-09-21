"use client";

import DarkTheme from "@/assets/icon-dark-theme.svg";
import LightTheme from "@/assets/icon-light-theme.svg";
import Image from "next/image";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitch = ({ variant = "1" }: { variant?: "1" | "2" }) => {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div
			className={cn(
				"w-[250px] h-12 bg-background rounded-md flex items-center justify-center gap-6",
				{ "bg-background-2": variant === "2" }
			)}
		>
			<Image src={LightTheme} alt="light theme" />
			<Switch
				className="h-5 w-10 data-[state=unchecked]:bg-primary"
				thumbClassName="h-[14px] w-[14px] bg-white"
				checked={theme === "dark"}
				onCheckedChange={(checked) =>
					setTheme(checked ? "dark" : "light")
				}
			/>
			<Image src={DarkTheme} alt="dark theme" />
		</div>
	);
};
