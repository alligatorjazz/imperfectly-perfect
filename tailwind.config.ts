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
				"primary": "rgb(0, 4, 255)",
				"secondary": "rgb(255, 187, 0)",
				"tertiary": "rgb(222, 0, 0)",
				"bgColor": "white",
				"fgColor": "rgb(226, 232, 240)"
			},
			fontFamily: {
				"default": '"Arial Narrow", sans-serif'
			}
		}
	},
	plugins: [],
};
export default config;
