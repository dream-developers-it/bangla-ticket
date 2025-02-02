/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL,
  },
}

module.exports = nextConfig 