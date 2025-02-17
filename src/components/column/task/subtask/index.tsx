"use client";

import { Subtask } from "@/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";

export const SubTask = ({ subtask }: { subtask: Subtask }) => {
	const [checked, setChecked] = useState<boolean | "indeterminate">(false);

	return (
		<Label className="bg-background flex items-center gap-4 p-3 pr-4 rounded-sm cursor-pointer hover:bg-primary/25">
			<Checkbox checked={checked} onCheckedChange={setChecked} />
			<p
				className={cn("body-m", {
					"line-through text-foreground": checked,
				})}
			>
				{subtask.name}
			</p>
		</Label>
	);
};
