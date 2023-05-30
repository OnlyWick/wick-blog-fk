console.log(`${process.env.SERVER_BASEURL}/${process.env.SERVER_GITHUB_LOGIN}`);
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
    removeConsole: false,
  },
  async rewrites() {
    return {
      fallback: [
        {
          // 选择 oauth 平台
          source: "/oauth:path*",
          destination: `${process.env.SERVER_BASEURL}/${process.env.SERVER_OAUTH}:path*`,
        },
        {
          // oauth 重定向后验证的地址
          source: "/auth/:path",
          destination: `${process.env.SERVER_BASEURL}/${process.env.SERVER_GITHUB_LOGIN}/:path`,
        },
      ],
    };
  },
};

module.exports = nextConfig;

// sid_guard sid_tt sessionid_id session_ss
