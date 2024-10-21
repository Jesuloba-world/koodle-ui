"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { IconCross } from "@/assets/icon-cross";

const newBoardSchema = z.object({
	boardName: z.string().min(1, { message: "Can't be empty" }),
	columns: z.array(
		z.object({
			name: z.string().min(1, { message: "Can't be empty" }),
		})
	),
});

export const CreateBoardForm = () => {
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

	function onSubmit(values: z.infer<typeof newBoardSchema>) {
		console.log(values);
	}

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
						<FormLabel className="body-m">Board Columns</FormLabel>
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

					<Button type="submit" fullWidth>
						Create New Board
					</Button>
				</form>
			</Form>
		</div>
	);
};
