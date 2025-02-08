import { useControllableState } from "@/hooks/use-controllable-state";
import { ReactNode } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "../ui/dialog";
import { useDeleteBoard, useGetBoard } from "@/hooks/board";
import { Button } from "../ui/button";

export const DeleteBoard = ({
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

	const { mutate, isPending } = useDeleteBoard();

	const deleteBoard = () => {
		if (!boardId) return;
		mutate(boardId, {
			onSuccess: () => {
				setIsOpen(false);
			},
		});
	};

	const { data } = useGetBoard({ id: boardId });

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogTitle className="text-destructive heading-l">
					Delete this board?
				</DialogTitle>

				<DialogDescription className="body-l text-foreground">
					Are you sure you want to delete the &apos;
					{data?.board.name}&apos; board? This action will remove all
					columns and tasks and cannot be reversed.
				</DialogDescription>

				<DialogFooter className="gap-4">
					<Button
						variant={"destructive"}
						className="flex-1"
						onClick={deleteBoard}
						isProcessing={isPending}
					>
						Delete
					</Button>
					<Button
						variant={"secondary"}
						className="flex-1"
						onClick={closedialog}
					>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
