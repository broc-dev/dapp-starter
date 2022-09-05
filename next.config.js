/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack: (
		config,
		{ buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
	  ) => {
		config.module.rules.push({
			test: /\.apng$/,
			type: 'asset/resource',
		});
		config.module.rules.push({
			test: /\.(wav|mp3)$/,
			type: 'asset/resource',
		})
		// Important: return the modified config
		return config
	  },
}

module.exports = nextConfig
