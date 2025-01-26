import { getQueryClient } from "@/app/get-query-client";
import { GetBoardContentOptions } from "@/hooks/board";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ReactNode } from "react";

export const BoardContentHydrator = async ({
	children,
	boardId,
}: {
	children: ReactNode;
	boardId: string;
}) => {
	const queryClient = getQueryClient();

	try {
		if (boardId) {
			await queryClient.prefetchQuery(GetBoardContentOptions(boardId));
		}
	} catch (err) {
		console.error("Prefetch error:", err);
	}

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			{children}
		</HydrationBoundary>
	);
};
