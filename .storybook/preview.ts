import type { Preview } from "@storybook/react";
import "../src/app/globals.css";

import { withThemeByClassName } from "@storybook/addon-themes";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		backgrounds: {
			values: [
				{ name: "light", value: "hsla(220,69%,97%,1)" },
				{ name: "dark", value: "hsla(235,16%,15%,1)" },
			],
		},
	},

	decorators: [
		withThemeByClassName({
			themes: {
				light: "",
				dark: "dark",
			},
			defaultTheme: "light",
		}),
	],
};

export default preview;
