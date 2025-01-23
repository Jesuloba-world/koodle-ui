import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	CreateBoardReqBody,
	client,
	createBoard,
	getAllMyBoards,
} from "@/client";
import { getSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

client.setConfig({
	baseURL: process.env.NEXT_PUBLIC_API_URL!,
});

client.instance.interceptors.request.use(async (config) => {
	const session = await getSession();

	if (session?.error === "RefreshTokenError") {
		// logout
		signOut();
		redirect("/auth/login");
	}

	if (session?.token) {
		config.headers.Authorization = `Bearer ${session.token}`;
	}
	return config;
});

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

export const useGetMyBoards = () => {
	return useQuery({
		queryKey: ["my boards"],
		queryFn: getAllMyBoards,
	});
};
