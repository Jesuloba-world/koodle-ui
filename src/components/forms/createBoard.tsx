"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { IconCross } from "@/assets/icon-cross";
import { useCreateBoard, useGetBoard, useUpdateBoard } from "@/hooks/board";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const newBoardSchema = z.object({
	boardName: z.string().min(1, { message: "Can't be empty" }),
	columns: z.array(
		z.object({
			c_id: z.string().optional(),
			name: z.string().min(1, { message: "Can't be empty" }),
		})
	),
});

export const CreateBoardForm = ({
	close,
	boardID,
}: {
	close: () => void;
	boardID?: string;
}) => {
	const {} = useParams<{ boardID: string }>();
	const { mutate: createBoard, isPending: isCreating } = useCreateBoard();
	const { mutate: updateBoard, isPending: isUpdating } = useUpdateBoard();

	const { data, refetch } = useGetBoard(boardID);

	const form = useForm<z.infer<typeof newBoardSchema>>({
		resolver: zodResolver(newBoardSchema),
		defaultValues: {
			boardName: "",
			columns: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "columns",
	});

	useEffect(() => {
		if (boardID && data) {
			form.setValue("boardName", data.board.name);
			form.setValue(
				"columns",
				(data.board.columns || [])?.map((col) => ({
					c_id: col.id,
					name: col.name,
				}))
			);
		}
	}, [boardID, form, data]);

	function onSubmit(values: z.infer<typeof newBoardSchema>) {
		console.log(values);
		if (!boardID) {
			// create board
			createBoard(
				{
					board: {
						name: values.boardName,
						columns: values.columns.map((el) => ({
							name: el.name,
							id: el.c_id,
						})),
					},
				},
				{
					onSuccess(data) {
						console.log(data);
						handleSuccess();
					},
				}
			);
		} else {
			// update board
			updateBoard(
				{
					boardId: boardID,
					data: {
						board: {
							name: values.boardName,
							columns: values.columns.map((el) => ({
								name: el.name,
								id: el.c_id,
							})),
						},
					},
				},
				{
					onSuccess: () => {
						handleSuccess();
						refetch();
					},
				}
			);
		}
	}

	const handleSuccess = () => {
		close();
		form.reset();
	};

	const isPending = isCreating || isUpdating;

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<FormField
						control={form.control}
						name="boardName"
						render={({ field, fieldState }) => (
							<FormItem className="space-y-2">
								<FormLabel className="body-m">
									Board Name
								</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g. Web Design"
										error={fieldState.error}
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<div className="space-y-2">
						{fields.length > 0 && (
							<FormLabel className="body-m">
								Board Columns
							</FormLabel>
						)}
						<div className="space-y-3">
							{fields.map((field, index) => (
								<FormField
									key={field.id}
									control={form.control}
									name={`columns.${index}.name`}
									render={({ field, fieldState }) => (
										<FormItem>
											<FormControl>
												<div className="flex items-center space-x-2">
													<Input
														error={fieldState.error}
														placeholder="e.g. Todo"
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
								+ Add New Column
							</Button>
						</div>
					</div>

					<Button type="submit" isProcessing={isPending} fullWidth>
						{boardID ? "Save Changes" : "Create New Board"}
					</Button>
				</form>
			</Form>
		</div>
	);
};
