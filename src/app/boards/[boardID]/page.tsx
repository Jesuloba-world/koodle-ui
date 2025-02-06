import { CreateBoardDialog } from "@/components/dialog/createBoard";
import { Button } from "@/components/ui/button";

export default function BoardContent({
	params: { boardID },
}: {
	params: { boardID: string };
}) {
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
