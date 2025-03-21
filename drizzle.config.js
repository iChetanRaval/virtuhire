/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://AI-VirtuHire_owner:8NivVMXI7jBG@ep-ancient-dew-a59dg2xw.us-east-2.aws.neon.tech/AI-VirtuHire?sslmode=require',
    // url: 'postgresql://neondb_owner:npg_mY4OJPg0kDbT@ep-late-truth-a5tq12d0-pooler.us-east-2.aws.neon.tech/AI-VirtuHire?sslmode=require',
  }
};