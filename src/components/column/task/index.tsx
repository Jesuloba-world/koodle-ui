import { Task as TaskType } from "@/client";
import { TaskDetail } from "@/components/dialog/taskDetail";

export const Task = ({ task }: { task: TaskType }) => {
	return (
		<TaskDetail task={task}>
			<div className="w-full space-y-2 bg-background-2 py-6 px-4 rounded-lg shadow-[0px_4px_6px_0px_rgba(54,78,126,0.1)]">
				<p className="text-foreground-2 heading-m">{task.title}</p>
				<p className="text-foreground body-m">
					{task.subtasks?.filter((st) => st.is_completed).length ?? 0}{" "}
					of {task.subtasks?.length ?? 0} subtasks
				</p>
			</div>
		</TaskDetail>
	);
};
