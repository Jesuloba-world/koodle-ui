import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ReactNode } from "react";
import { getQueryClient } from "../get-query-client";
import { GetMyBoardsOptions } from "@/hooks/board";

export const Hydrator = async ({ children }: { children: ReactNode }) => {
	const queryClient = getQueryClient();

	try {
		await queryClient.prefetchQuery(GetMyBoardsOptions);
	} catch (err) {
		console.error("Prefetch error:", err);
	}

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			{children}
		</HydrationBoundary>
	);
};
