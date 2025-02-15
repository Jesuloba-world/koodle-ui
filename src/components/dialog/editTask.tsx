import { useControllableState } from "@/hooks/use-controllable-state";
import { ReactNode } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { EditTaskForm } from "../forms/editTaskForm";

export const EditTask = ({
	children,
	onOpenChange,
	open: openProp,
	taskId,
	boardId,
}: {
	taskId?: string;
	boardId: string;
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
						{taskId ? "Edit Task" : "Add New Task"}
					</DialogTitle>
					<VisuallyHidden>
						<DialogDescription>
							{taskId
								? "Edit existing task"
								: "This modal is for creating new task"}
						</DialogDescription>
					</VisuallyHidden>
				</DialogHeader>
				<EditTaskForm boardID={boardId} close={closedialog} />
			</DialogContent>
		</Dialog>
	);
};
