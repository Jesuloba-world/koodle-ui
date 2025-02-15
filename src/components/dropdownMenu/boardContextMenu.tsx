import { ReactNode } from "react";
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { CreateBoardDialog } from "../dialog/createBoard";
import { useState } from "react";
import { useParams } from "next/navigation";
import { DeleteBoard } from "../dialog/deleteBoard";

export const BoardContextMenu = ({ children }: { children: ReactNode }) => {
	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);
	const [openDropDown, setOpenDropdown] = useState(false);

	const { boardID } = useParams<{ boardID: string }>();

	const handleEditClick = () => {
		setOpenEdit(true);
	};

	const handleDeleteClick = () => {
		setOpenDelete(true);
	};

	return (
		<>
			<CreateBoardDialog
				boardId={boardID}
				open={openEdit}
				onOpenChange={setOpenEdit}
			/>
			<DeleteBoard
				boardId={boardID}
				open={openDelete}
				onOpenChange={setOpenDelete}
			/>
			<DropdownMenu
				open={openDropDown}
				onOpenChange={setOpenDropdown}
				modal={false}
			>
				<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
				<DropdownMenuContent
					className="w-[192px] rounded-lg shadow-[0px_10px_20px_0px_rgba(54,78,126,0.25)] py-2"
					side="bottom"
					align="end"
					sideOffset={22}
				>
					<DropdownMenuItem
						className="py-2 px-4 cursor-pointer"
						onClick={handleEditClick}
					>
						<p className="body-l">Edit Board</p>
					</DropdownMenuItem>
					<DropdownMenuItem
						className="py-2 px-4 cursor-pointer"
						onClick={handleDeleteClick}
					>
						<p className="body-l text-destructive">Delete Board</p>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	);
};
