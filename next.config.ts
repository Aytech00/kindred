/** @format */

// next.config.js
/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV !== "production";

const NUFIS = [
  "https://wallet.nu.fi",
  "https://wallet-preprod.nu.fi",
  "https://wallet-testnet-staging.nu.fi",
  "https://wallet-preview-staging.nu.fi",
];

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "img-src 'self' data: https:",
  "style-src 'self' 'unsafe-inline' https:",
  `script-src 'self' ${
    isDev ? "'unsafe-eval' 'unsafe-inline'" : "'unsafe-inline'"
  } https:`,
  // ✅ allow NuFi iframes
  `frame-src 'self' ${NUFIS.join(" ")}`,
  // ✅ legacy fallback for some engines
  `child-src 'self' ${NUFIS.join(" ")}`,
  // outbound fetch / websockets (add Blockfrost etc. if you use them)
  `connect-src 'self' ${NUFIS.join(" ")} ${isDev ? "ws: wss:" : ""}`,
  "frame-ancestors 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Content-Security-Policy", value: csp }],
      },
    ];
  },
};

module.exports = nextConfig;
