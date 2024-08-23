/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'via.placeholder.com'
			},
			{
				protocol: 'https',
				hostname: 'loremflickr.com'
			},
			{
				protocol: "https",
				hostname: "gujhjoklpwgyemsvomlj.supabase.co"
			}
		]
	}
};

export default nextConfig;
