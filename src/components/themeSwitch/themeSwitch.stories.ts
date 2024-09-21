import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSwitch } from "./index";

const meta = {
	title: "Component/ThemeSwitch",
	component: ThemeSwitch,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
} satisfies Meta<typeof ThemeSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variant2: Story = {
	args: {
		variant: "2",
	},
};
