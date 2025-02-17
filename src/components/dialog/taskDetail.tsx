"use client";

import {
	Dialog,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { DialogContent } from "../ui/dialog";
import { Task } from "@/client";
import { Button } from "../ui/button";
import { EllipsisVertical } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { useGetBoard } from "@/hooks/board";
import { useParams } from "next/navigation";
import { SubTask } from "../column/task/subtask";

export const TaskDetail = ({
	children,
	task,
}: {
	children: ReactNode;
	task: Task;
}) => {
	const { boardID } = useParams<{ boardID: string }>();

	const { data } = useGetBoard({ id: boardID });
	const columns =
		data?.board?.columns?.map((col) => ({
			id: col.id,
			name: col.name,
		})) ?? [];

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<div className="flex items-center gap-3 justify-between">
					<DialogTitle className="heading-l">
						{task.title}
					</DialogTitle>
					<Button variant={"ghost"} size="icon">
						<EllipsisVertical />
					</Button>
				</div>
				<DialogDescription className="body-l text-foreground">
					{task.description}
				</DialogDescription>
				<div className="space-y-4">
					<p className="body-m">
						Subtasks (
						{task.subtasks?.filter((st) => st.is_completed)
							.length ?? 0}{" "}
						of {task.subtasks?.length ?? 0})
					</p>
					<div>
						{task.subtasks?.map((st) => (
							<SubTask key={st.id} subtask={st} />
						))}
					</div>
				</div>
				<div className="space-y-2">
					<p className="body-m">Current Status</p>
					<Select value={task.column_id}>
						<SelectTrigger className="bg-background-2">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent className="z-[60]">
							{columns.map((col) => (
								<SelectItem key={col.id} value={col.id}>
									{col.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</DialogContent>
		</Dialog>
	);
};
