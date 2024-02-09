// file: next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

// we only need to use the utility during development so we can check NODE_ENV
// (note: this check is recommended but completely optional)
if (process.env.NODE_ENV === 'development') {
	// we import the utility from the next-dev submodule
	const { setupDevBindings } = require('@cloudflare/next-on-pages/next-dev');

	// we call the utility with the bindings we want to have access to
	setupDevBindings({
		bindings: {
			CAT_R2_BUCKET: {
				type: 'r2',
				bucketName: 'cat-media',
			},
		},
	});
}

