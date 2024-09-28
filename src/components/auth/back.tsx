"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const Back = () => {
	const router = useRouter();
	return (
		<Button
			variant={"ghost2"}
			size={"link"}
			className="flex items-center"
			onClick={router.back}
		>
			<ChevronLeft /> Back
		</Button>
	);
};
