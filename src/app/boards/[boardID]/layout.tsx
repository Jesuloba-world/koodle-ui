import { ReactNode } from "react";
import { BoardContentHydrator } from "./hydration";

export default function BoardContentLayout({
	children,
	params,
}: {
	children: ReactNode;
	params: { boardID: string };
}) {
	console.log(params);

	return (
		<BoardContentHydrator boardId={params.boardID}>
			{children}
		</BoardContentHydrator>
	);
}
