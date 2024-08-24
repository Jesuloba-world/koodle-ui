import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Input } from "./input";

const meta = {
	title: "Component/Input",
	component: Input,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	// args: { onClick: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Idle: Story = {
	args: {
		placeholder: "Enter task name",
	},
};

export const Active: Story = {
	args: {
		...Idle.args,
		value: "Building something",
	},
};

export const Error: Story = {
	args: {
		...Idle.args,
		error: "Can't be empty",
	},
};
