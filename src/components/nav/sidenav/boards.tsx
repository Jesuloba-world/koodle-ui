import { BoardIcon } from "@/assets/icon-board";
import { Button } from "@/components/ui/button";
import { CreateBoardDialog } from "@/components/dialog/createBoard";
import { useGetMyBoards } from "@/hooks/board";

export const Boards = () => {
	const { data, error } = useGetMyBoards();

	console.log(data);

	console.log(error);

	return (
		<div className="space-y-4">
			<h5 className="heading-s ml-8">
				ALL BOARDS ({(data?.data?.boards ?? []).length})
			</h5>
			<div className="flex flex-col">
				{/* Links to boards */}
				{(data?.data?.boards ?? []).map((board) => (
					<Button key={board.id} variant={"sidebar"} size={"sidebar"}>
						<BoardIcon />
						{board.name}
					</Button>
				))}
				{/* Create button */}
				<CreateBoardDialog>
					<Button
						variant={"sidebar"}
						size={"sidebar"}
						className="text-primary"
					>
						<BoardIcon /> + Create New Board
					</Button>
				</CreateBoardDialog>
			</div>
		</div>
	);
};
