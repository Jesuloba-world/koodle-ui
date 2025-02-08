"use client";

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
import { useControllableState } from "@/hooks/use-controllable-state";

export const CreateBoardDialog = ({
	boardId,
	children,
	onOpenChange,
	open: openProp,
}: {
	boardId?: string;
	children?: ReactNode;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}) => {
	const [isOpen, setIsOpen] = useControllableState({
		prop: openProp,
		onChange: (newValue) => {
			requestAnimationFrame(() => {
				onOpenChange?.(newValue);
			});
		},
		initialValue: false,
	});

	const closedialog = () => {
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="heading-l">
						{boardId ? "Edit Board" : "Add New Board"}
					</DialogTitle>
					<VisuallyHidden>
						<DialogDescription>
							{boardId
								? "Edit existing board"
								: "This modal is for creating new board"}
						</DialogDescription>
					</VisuallyHidden>
				</DialogHeader>
				<CreateBoardForm boardID={boardId} close={closedialog} />
			</DialogContent>
		</Dialog>
	);
};
