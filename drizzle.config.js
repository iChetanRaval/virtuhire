/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://AI-VirtuHire_owner:8NivVMXI7jBG@ep-ancient-dew-a59dg2xw.us-east-2.aws.neon.tech/AI-VirtuHire?sslmode=require',
  }
};