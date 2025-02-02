/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MYSQL_HOST: 'localhost',
    MYSQL_USER: 'lottery_user',
    MYSQL_PASSWORD: 'limon@123',
    MYSQL_DATABASE: 'lottery_db',
  },
}

module.exports = nextConfig 