import type { Meta, StoryObj } from "@storybook/react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./select";
import { useState } from "react";

const SelectDemo = () => {
	const [value, setValue] = useState<string>();

	return (
		<Select value={value} onValueChange={setValue}>
			<SelectTrigger className="w-[350px]">
				<SelectValue placeholder="Theme" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value="todo">Todo</SelectItem>
				<SelectItem value="doing">Doing</SelectItem>
				<SelectItem value="done">Done</SelectItem>
			</SelectContent>
		</Select>
	);
};

const meta = {
	title: "Component/Select",
	component: SelectDemo,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof SelectDemo>;

export default meta;
type Story = StoryObj<typeof SelectDemo>;

export const Idle: Story = {
	render: () => <SelectDemo />,
};

export const WithPreselectedValue: Story = {
	render: () => {
		const [value, setValue] = useState("doing");

		return (
			<Select value={value} onValueChange={setValue}>
				<SelectTrigger className="w-[350px]">
					<SelectValue placeholder="Theme" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="todo">Todo</SelectItem>
					<SelectItem value="doing">Doing</SelectItem>
					<SelectItem value="done">Done</SelectItem>
				</SelectContent>
			</Select>
		);
	},
};
