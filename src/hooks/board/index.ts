import {
	queryOptions,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import {
	CreateBoardReqBody,
	client,
	createBoard,
	getAllMyBoards,
} from "@/client";
import { getSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
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

export const GetMyBoardOptions = queryOptions({
	queryKey: ["my boards"],
	queryFn: async () => {
		const response = await getAllMyBoards();
		if (!response || !response.data) {
			throw new Error("Failed to fetch boards data");
		}
		return response.data;
	},
});

export const useGetMyBoards = () => {
	return useQuery(GetMyBoardOptions);
};
