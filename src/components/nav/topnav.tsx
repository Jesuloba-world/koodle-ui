"use client";

import { DynamicLogo } from "../dynamicLogo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNav } from "./navProvider";
import { cn } from "@/lib/utils";
import { useGetBoard } from "@/hooks/board";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { EllipsisVertical } from "lucide-react";
import { BoardContextMenu } from "../dropdownMenu/boardContextMenu";

export const TopNav = ({ userEmail }: { userEmail: string }) => {
	const initials = userEmail
		.split("@")[0]
		.match(/\b(\w)/g)
		?.join("")
		.toUpperCase()
		.slice(0, 2);

	const { isOpen } = useNav();

	const params = useParams<{ boardID: string }>();

	const { data } = useGetBoard(params.boardID);

	const board = data?.board;

	return (
		<div className="bg-background-2 h-24 flex">
			<div
				className={cn(
					"w-[210px] h-full flex shrink-0 items-center pl-6 border-r border-b transition-all duration-300 ease-in-out",
					{ "w-[300px] border-b-0 pl-[34px]": isOpen }
				)}
			>
				<DynamicLogo />
			</div>
			<div className="border-b w-full flex items-center justify-between pl-6 pr-8">
				<div>
					<h1 className="heading-xl text-foreground-2">
						{board?.name}
					</h1>
				</div>

				<div className="flex gap-3 items-center">
					{params.boardID && (
						<div className="flex items-center gap-4">
							<Button
								className="px-6"
								disabled={(board?.columns?.length ?? 0) < 1}
							>
								+ Add New Task
							</Button>
							<BoardContextMenu>
								<Button variant={"ghost"} size="icon">
									<EllipsisVertical />
								</Button>
							</BoardContextMenu>
						</div>
					)}
					<AvatarComponent initials={initials || "NA"} />
				</div>
			</div>
		</div>
	);
};

const AvatarComponent = ({ initials }: { initials: string }) => {
	return (
		<Avatar>
			{/* <AvatarImage src="https://github.com/shadcn.png" /> */}
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
	);
};
