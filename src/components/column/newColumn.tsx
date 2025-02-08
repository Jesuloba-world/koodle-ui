"use client";

import { useParams } from "next/navigation";
import { Button } from "../ui/button";
import { CreateBoardDialog } from "../dialog/createBoard";

export const NewColumn = () => {
	const params = useParams<{ boardID: string }>();

	return (
		<div className="flex flex-col pt-10">
			<div className="flex-1 w-[280px] rounded-[6px] bg-gradient-to-b from-background-2/25 to-background-2/[0.13] flex items-center justify-center">
				<CreateBoardDialog boardId={params.boardID}>
					<Button variant={"ghost2"} className="heading-xl">
						+ New Column
					</Button>
				</CreateBoardDialog>
			</div>
		</div>
	);
};
