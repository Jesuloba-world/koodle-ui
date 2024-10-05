import { BoardIcon } from "@/assets/icon-board";
import { Button } from "@/components/ui/button";

export const Boards = () => {
	return (
		<div className="space-y-4">
			<h5 className="heading-s ml-8">ALL BOARDS (0)</h5>
			<div className="flex flex-col">
				{/* Links to boards */}
				<Button variant={"sidebar"} size={"sidebar"}>
					<BoardIcon />
					Platform Launch
				</Button>
				{/* Create button */}
				<Button
					variant={"sidebar"}
					size={"sidebar"}
					className="text-primary"
				>
					<BoardIcon /> + Create New Board
				</Button>
			</div>
		</div>
	);
};
