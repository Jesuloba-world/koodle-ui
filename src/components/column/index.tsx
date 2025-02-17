import { Column as ColumnType } from "@/client";
import { Task } from "./task";

export const Column = ({ column }: { column: ColumnType }) => {
	return (
		<div className="w-[280px] flex flex-col gap-6">
			<div className="flex gap-6 items-center">
				<div
					className="h-4 w-4 rounded-full"
					style={{ backgroundColor: column.color }}
				/>
				<h5 className="heading-s">
					{column.name} ({column.tasks?.length ?? 0})
				</h5>
			</div>
			<div className="flex flex-col gap-5">
				{column.tasks?.map((task) => (
					<Task key={task.id} task={task} />
				))}
			</div>
		</div>
	);
};
