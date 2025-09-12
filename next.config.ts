/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["fonts.gstatic.com","myypelzqjunsrpytkiee.supabase.co",],
    unoptimized:true,
  },
  async headers() {
  return [
    {
      source: "/fonts/(.*)", //  正しいワイルドカード表記
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
      ],
    },
    
  ];
},


};

export default nextConfig;