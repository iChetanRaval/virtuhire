/** @type {import('next').NextConfig} */
const nextConfig = {

  webpack: (config) => {
    config.externals.push({
      '@tensorflow/tfjs': 'tf',
      '@tensorflow-models/face-landmarks-detection': 'faceLandmarksDetection'
    });
    experimental: {
      optimizePackageImports: ['@tensorflow/tfjs', '@tensorflow-models/face-landmarks-detection']
    }
    return config;
  }


};

export default nextConfig;
