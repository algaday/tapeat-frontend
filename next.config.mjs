/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		suggestApiKey: "f90ce829-0752-47f7-8948-c733ba8a0689",
		geoApiKey: "d419fb5f-e802-442b-b6fb-050bd0b4a604",
	},
	async rewrites() {
		return [
			{
				source: "/api/:path*",
				destination: `http://localhost:3333/:path*`,
			},
		]
	},
	compiler: {
		styledComponents: true,
	},

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "tapeat-dev-bucket.object.pscloud.io",
				port: "",
				pathname: "/tapeat-dev-bucket/**",
			},
		],
	},
}
// next.config.js

export default nextConfig
