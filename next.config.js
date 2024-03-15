/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@douyinfe/semi-ui', '@douyinfe/semi-icons', '@douyinfe/semi-illustrations'],
  compiler: {
    styledComponents: true,
    removeConsole: false,
  },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true }
    return config
  },
  // async rewrites() {
  //   return {
  //     fallback: [
  //       {
  //         // 选择 oauth 平台
  //         source: "/oauth:path*",
  //         destination: `${process.env.SERVER_BASEURL}/${process.env.SERVER_OAUTH}:path*`,
  //       },
  //       {
  //         // oauth 重定向后验证的地址
  //         source: "/auth/:path",
  //         destination: `${process.env.SERVER_BASEURL}/${process.env.SERVER_GITHUB_LOGIN}/:path`,
  //       },
  //     ],
  //   };
  // },
};

module.exports = nextConfig;

// sid_guard sid_tt sessionid_id session_ss
