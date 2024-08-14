/** @type {import('next').NextConfig} */
const webpack = require('webpack');

module.exports = {
  serverRuntimeConfig: {
    HELIUS_RPC_URL: process.env.HELIUS_RPC_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    EMPTY_NODE_WALLET: process.env.NEXT_PUBLIC_NODE?.split(',').map(Number),
    MONGO_URI: process.env.MONGO_URI
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'shdw-drive.genesysgo.net',
        port: '',
        pathname: '**'
      }
    ]
  },
  webpack: (config) => {
    config.resolve.fallback = {
      crypto: require.resolve('crypto-browserify'),
      vm: require.resolve('vm-browserify'),
      stream: require.resolve('stream-browserify'),
    };

    // config.plugins.push(
    //     new webpack.ProvidePlugin({
    //       process: 'process/browser',
    //       Buffer: ['buffer', 'Buffer']
    //     })
    // );

    return config;
  }
};
