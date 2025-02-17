import {
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import {
	CreateBoardReqBody,
	UpdateBoardReqBody,
	createBoard,
	deleteBoard,
	getAllMyBoards,
	getBoard,
	updateBoard,
} from "@/client";
import { initClient } from "../initClient";

initClient();

export const useCreateBoard = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreateBoardReqBody) => createBoard({ body: data }),
		mutationKey: ["create board"],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["my boards"] });
		},
	});
};

export const GetMyBoardsOptions = queryOptions({
	queryKey: ["my boards"],
	queryFn: async () => {
		const response = await getAllMyBoards();
		if (!response || !response.data) {
			throw new Error(
				`Failed to fetch boards data: ${response.error.detail}`
			);
		}
		return response.data;
	},
});

export const useGetMyBoards = () => {
	return useSuspenseQuery(GetMyBoardsOptions);
};

export const GetBoardContentOptions = ({
	id,
	include_task,
}: {
	id?: string;
	include_task?: boolean;
}) =>
	queryOptions({
		queryKey: ["board content", { id, include_task: !!include_task }],
		queryFn: async () => {
			if (!id) {
				return null;
			}
			const response = await getBoard({
				path: { boardId: id },
				query: { include_task: !!include_task },
			});
			if (!response || !response.data) {
				throw new Error(
					`Failed to fetch board content: ${response.error.detail}`
				);
			}
			return response.data;
		},
		enabled: !!id,
	});

export const useGetBoard = ({
	id,
	include_task,
}: {
	id?: string;
	include_task?: boolean;
}) => {
	return useQuery(GetBoardContentOptions({ id, include_task }));
};

export const useUpdateBoard = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({
			boardId,
			data,
		}: {
			boardId: string;
			data: UpdateBoardReqBody;
		}) => updateBoard({ body: data, path: { boardId } }),
		mutationKey: ["update board"],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["my boards"] });
			queryClient.invalidateQueries({ queryKey: ["board content"] });
		},
	});
};

export const useDeleteBoard = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => deleteBoard({ path: { boardId: id } }),
		mutationKey: ["delete board"],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["my boards"] });
		},
	});
};
