"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { CreateBoardForm } from "@/components/forms/createBoard";
import VisuallyHidden from "@/components/ui/visuallyHidden";

export const CreateBoardDialog = ({
	isEdit,
	children,
}: {
	isEdit?: boolean;
	children?: ReactNode;
}) => {
	const [open, setOpen] = useState(false);

	const closedialog = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isEdit ? "Edit Board" : "Add New Board"}
					</DialogTitle>
					<VisuallyHidden>
						<DialogDescription>
							{isEdit
								? "Edit existing board"
								: "This modal is for creating new board"}
						</DialogDescription>
					</VisuallyHidden>
				</DialogHeader>
				<CreateBoardForm close={closedialog} />
			</DialogContent>
		</Dialog>
	);
};
