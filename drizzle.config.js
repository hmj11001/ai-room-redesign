import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './config/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_6Ns5kLjXIiFn@ep-delicate-moon-a4lpxcok-pooler.us-east-1.aws.neon.tech/ai-room-redesign?sslmode=require',
  },
});
