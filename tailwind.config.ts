import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				"primary": "var(--primary-color)",
				"secondary": "var(--secondary-color)",
				"tertiary": "var(--tertiary-color)",
				"bgColor": "var(--bg-color)",
				"fgColor": "var(--fg-color)",
				"textColor": "var(--text-color)",
				"accent": "var(--accent-color)",
			},
			fontFamily: {
				"primary": '"Arial Narrow", sans-serif',
				"secondary": '"Arial", sans-serif',
				"content": '"Times New Roman", serif',
			},

		}
	},
	plugins: [
		require("@designbycode/tailwindcss-text-stroke"),
		require('tailwind-scrollbar'),

	],
};
export default config;
