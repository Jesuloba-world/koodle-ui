import { useGetBoard } from "@/hooks/board";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { IconCross } from "@/assets/icon-cross";
import { Button } from "../ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

const taskSchema = z.object({
	title: z.string().min(1, { message: "Can't be empty" }),
	description: z.string().min(1, { message: "Can't be empty" }),
	subTasks: z.array(
		z.object({
			st_id: z.string().optional(),
			name: z.string().min(1, { message: "Can't be empty" }),
		})
	),
	status: z.string().min(1, { message: "Can't be empty" }),
});

export const EditTaskForm = ({
	close,
	taskID,
	boardID,
}: {
	close: () => void;
	taskID?: string;
	boardID: string;
}) => {
	const { data } = useGetBoard({ id: boardID });
	const columns =
		data?.board?.columns?.map((col) => ({
			id: col.id,
			name: col.name,
		})) ?? [];

	const form = useForm<z.infer<typeof taskSchema>>({
		resolver: zodResolver(taskSchema),
		defaultValues: {
			title: "",
			description: "",
			subTasks: [{ name: "" }, { name: "" }],
			status: columns[0].id,
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "subTasks",
	});

	function onSubmit(values: z.infer<typeof taskSchema>) {
		console.log(values);
	}

	const handleSuccess = () => {
		close();
		form.reset();
	};

	const isPending = false;

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="title"
					render={({ field, fieldState }) => (
						<FormItem className="space-y-2">
							<FormLabel className="body-m">Title</FormLabel>
							<FormControl>
								<Input
									placeholder="e.g. Take coffee break"
									error={fieldState.error}
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field, fieldState }) => (
						<FormItem className="space-y-2">
							<FormLabel className="body-m">
								Description
							</FormLabel>
							<FormControl>
								<Textarea
									placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
									error={fieldState.error}
									className="h-[112px] resize-none"
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<div className="space-y-2">
					{fields.length > 0 && (
						<FormLabel className="body-m">Subtasks</FormLabel>
					)}
					<div className="space-y-3">
						{fields.map((field, index) => (
							<FormField
								key={field.id}
								control={form.control}
								name={`subTasks.${index}.name`}
								render={({ field, fieldState }) => (
									<FormItem>
										<FormControl>
											<div className="flex items-center space-x-2">
												<Input
													error={fieldState.error}
													placeholder="e.g. Make coffee"
													{...field}
												/>
												<Button
													type="button"
													variant={"ghost"}
													size={"icon"}
													onClick={() =>
														remove(index)
													}
													className="text-foreground hover:text-destructive hover:bg-transparent"
												>
													<IconCross />
												</Button>
											</div>
										</FormControl>
									</FormItem>
								)}
							/>
						))}
						<Button
							type="button"
							variant={"secondary"}
							onClick={() => append({ name: "" })}
							fullWidth
						>
							+ Add New Subtask
						</Button>
					</div>
				</div>

				<FormField
					control={form.control}
					name="status"
					render={({ field, fieldState }) => (
						<FormItem className="space-y-2">
							<FormLabel className="body-m">Status</FormLabel>
							<FormControl>
								<Select
									onValueChange={field.onChange}
									{...field}
								>
									<SelectTrigger className="bg-background-2">
										<SelectValue placeholder="Status" />
									</SelectTrigger>
									<SelectContent className="z-[60]">
										{columns.map((col) => (
											<SelectItem
												key={col.id}
												value={col.id}
											>
												{col.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button type="submit" isProcessing={isPending} fullWidth>
					{taskID ? "Save Changes" : "Create Task"}
				</Button>
			</form>
		</Form>
	);
};
