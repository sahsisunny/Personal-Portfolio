/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
    env: {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
    },
};


module.exports = nextConfig
