import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { CreateBoardForm } from "@/components/forms/createBoard";
import VisuallyHidden from "@/components/ui/visuallyHidden";

export const CreateBoardDialog = ({ children }: { children?: ReactNode }) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Board</DialogTitle>
					<VisuallyHidden>
						<DialogDescription>
							This board is for creating new board
						</DialogDescription>
					</VisuallyHidden>
				</DialogHeader>
				<CreateBoardForm />
			</DialogContent>
		</Dialog>
	);
};
