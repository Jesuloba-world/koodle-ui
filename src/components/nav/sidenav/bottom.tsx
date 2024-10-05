"use client";

import { ThemeSwitch } from "@/components/themeSwitch";
import { Button } from "@/components/ui/button";
import { IconHideSidebar } from "@/assets/icon-hide-sidebar";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useNav } from "../navProvider";

export const Bottom = () => {
	const { closeNav } = useNav();

	return (
		<div className="flex flex-col gap-2">
			<div className="ml-6">
				<ThemeSwitch />
			</div>
			<div className="flex flex-col">
				<Button variant={"sidebar"} size={"sidebar"} onClick={closeNav}>
					<IconHideSidebar />
					Hide Sidebar
				</Button>
				<Button
					variant={"sidebar"}
					size={"sidebar"}
					className="hover:text-destructive"
					onClick={() => signOut()}
				>
					<LogOut />
					Logout
				</Button>
			</div>
		</div>
	);
};
