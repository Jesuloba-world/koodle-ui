"use client";

import { cn } from "@/lib/utils";
import { Boards } from "./boards";
import { Bottom } from "./bottom";
import { useNav } from "../navProvider";
import { Button } from "@/components/ui/button";
import { IconShowSidebar } from "@/assets/icon-show-sidebar";

export const SideBar = () => {
	const { isOpen, openNav } = useNav();
	return (
		<>
			<div
				className={cn(
					"w-[300px] bg-background-2 h-auto pt-4 pb-8 pr-6 flex flex-col justify-between transition-all duration-300 ease-in-out translate-x-0",
					{ "-translate-x-full -mr-[300px]": !isOpen }
				)}
			>
				<Boards />
				<Bottom />
			</div>
			<Button
				onClick={openNav}
				variant={"sidebar"}
				className={cn(
					"fixed bottom-20 left-0 bg-primary text-primary-foreground hover:bg-primary-hover hover:text-primary-foreground",
					{ hidden: isOpen }
				)}
			>
				<IconShowSidebar />
			</Button>
		</>
	);
};
