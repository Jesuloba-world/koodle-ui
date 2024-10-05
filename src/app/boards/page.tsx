import { Button } from "@/components/ui/button";

export default function EmptyBoardPage() {
	return (
		<div className="flex items-center justify-center w-full flex-col gap-y-8">
			<p className="heading-l">
				No board selected, create a new board or select an existing one.
			</p>
			<Button>+ Create New Board</Button>
		</div>
	);
}
