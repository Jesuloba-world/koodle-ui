import { BoardIcon } from "@/assets/icon-board";
import { Button } from "@/components/ui/button";
import { CreateBoardDialog } from "@/components/dialog/createBoard";
import { useGetMyBoards } from "@/hooks/board";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export const Boards = () => {
	const { data } = useGetMyBoards();
	const params = useParams<{ boardID: string }>();

	const boardCount = data?.boards?.length ?? 0;

	return (
		<div className="space-y-4">
			<h5 className="heading-s ml-8">ALL BOARDS ({boardCount})</h5>
			<div className="flex flex-col">
				{/* Links to boards */}
				{(data?.boards ?? []).map((board) => (
					<Link key={board.id} href={`/boards/${board.id}`} passHref>
						<Button
							variant={"sidebar"}
							size={"sidebar"}
							fullWidth
							active={board.id === params.boardID}
						>
							<BoardIcon />
							{board.name}
						</Button>
					</Link>
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
