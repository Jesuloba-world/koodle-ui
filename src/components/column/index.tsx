import { Column as ColumnType } from "@/client";

export const Column = ({ column }: { column: ColumnType }) => {
	return (
		<div className="w-[280px] flex flex-col gap-6">
			<div className="flex gap-6 items-center">
				<div
					className="h-4 w-4 rounded-full"
					style={{ backgroundColor: column.color }}
				/>
				<h5 className="heading-s">{column.name}</h5>
			</div>
			<div></div>
		</div>
	);
};
