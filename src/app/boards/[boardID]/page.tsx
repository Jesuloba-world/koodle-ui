"use client";

import { Column } from "@/components/column";
import { NewColumn } from "@/components/column/newColumn";
import { CreateBoardDialog } from "@/components/dialog/createBoard";
import { Arc } from "@/components/loader/arc";
import { Button } from "@/components/ui/button";
import { useGetBoard } from "@/hooks/board";

export default function BoardContent({
	params: { boardID },
}: {
	params: { boardID: string };
}) {
	const { data, isLoading } = useGetBoard({
		id: boardID,
		include_task: true,
	});

	if (isLoading) {
		return (
			<div className="flex items-center justify-center w-full flex-col">
				<Arc />
			</div>
		);
	}

	if (!data?.board?.columns || data.board.columns.length < 1) {
		return (
			<div className="flex items-center justify-center w-full flex-col gap-y-8">
				<p className="heading-l">
					This board is empty. Create a new column to get started.
				</p>
				<CreateBoardDialog boardId={boardID}>
					<Button>+ Add New Column</Button>
				</CreateBoardDialog>
			</div>
		);
	}

	return (
		<div className="pt-6 pl-6 pb-12 flex gap-6">
			{data.board.columns.map((col) => (
				<Column key={col.id} column={col} />
			))}
			<NewColumn />
		</div>
	);
}
