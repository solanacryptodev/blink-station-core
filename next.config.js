/** @type {import('next').NextConfig} */
const webpack = require('webpack');

module.exports = {
  serverRuntimeConfig: {
    HELIUS_RPC_URL: process.env.HELIUS_RPC_URL,
    CLIENT_HELIUS_RPC_URL: process.env.NEXT_PUBLIC_HELIUS_RPC_URL,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    SHDW_STORAGE_ACCT: process.env.SHDW_STORAGE_ACCT
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
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
