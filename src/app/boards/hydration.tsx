import {
	dehydrate,
	HydrationBoundary,
	queryOptions,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import { getQueryClient } from "../get-query-client";
import { getAllMyBoards } from "@/client";
import { auth } from "@/auth";
import { GetMyBoardOptions } from "@/hooks/board";

export const Hydrator = async ({ children }: { children: ReactNode }) => {
	const queryClient = getQueryClient();

	try {
		await queryClient.prefetchQuery(GetMyBoardOptions);
	} catch (err) {
		console.error("Prefetch error:", err);
	}

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			{children}
		</HydrationBoundary>
	);
};
