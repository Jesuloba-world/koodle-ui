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
	client,
	createBoard,
	getAllMyBoards,
	getBoard,
	updateBoard,
} from "@/client";
import { getSession, signOut } from "next-auth/react";
import { auth } from "@/auth";

client.setConfig({
	baseURL: process.env.NEXT_PUBLIC_API_URL!,
});

if (typeof window !== "undefined") {
	// Client-side interceptor
	client.instance.interceptors.request.use(async (config) => {
		const session = await getSession();

		if (!session?.token) {
			await signOut({
				redirect: true,
				redirectTo: "/auth/login",
			});
		}

		config.headers.Authorization = `Bearer ${session?.token}`;
		return config;
	});
} else {
	// Server-side interceptor
	client.instance.interceptors.request.use(async (config) => {
		const session = await auth();

		if (!session?.token) {
			await signOut({
				redirect: true,
				redirectTo: "/auth/login",
			});
		}

		config.headers.Authorization = `Bearer ${session?.token}`;
		return config;
	});
}

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

export const GetBoardContentOptions = (id?: string) =>
	queryOptions({
		queryKey: ["board content", id],
		queryFn: async () => {
			if (!id) {
				return null;
			}
			const response = await getBoard({ path: { boardId: id } });
			if (!response || !response.data) {
				throw new Error(
					`Failed to fetch board content: ${response.error.detail}`
				);
			}
			return response.data;
		},
		enabled: !!id,
	});

export const useGetBoard = (id?: string) => {
	return useSuspenseQuery(GetBoardContentOptions(id));
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
		},
	});
};
