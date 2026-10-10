/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/blog/companies/anonymous-workforce-management-saas',
        destination: '/blog/companies/b2b-workforce-management-saas',
        permanent: true,
      },
    ]
  },
}
