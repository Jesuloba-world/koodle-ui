import { useMutation, useQueryClient } from "@tanstack/react-query";
import { initClient } from "../initClient";
import { AddTaskReqBody, addTask } from "@/client";

initClient();

export const useAddTask = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["Add task"],
		mutationFn: (body: AddTaskReqBody) => addTask({ body }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["board content"] });
		},
	});
};
