import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./button";

const meta = {
	title: "Component/Button",
	component: Button,
	tags: ["autodocs"],
	parameters: {
		layout: "centered",
	},
	argTypes: {
		variant: {
			control: "select",
			options: [
				"default",
				"secondary",
				"destructive",
				"outline",
				"ghost",
				"link",
			],
		},
		asChild: {
			control: false,
			table: {
				disable: true,
			},
		},
	},
	// args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		variant: "default",
		children: "Button",
	},
};

export const Small: Story = {
	args: {
		...Primary.args,
		size: "sm",
	},
};

export const Secondary: Story = {
	args: {
		...Primary.args,
		variant: "secondary",
	},
};

export const Destructive: Story = {
	args: {
		...Primary.args,
		variant: "destructive",
	},
};
