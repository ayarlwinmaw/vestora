import { neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@/lib/generated/prisma/client';
import ws from 'ws';

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

// Instantiates the Prisma adapter; it creates and manages the Neon connection pool from the connection string.
const adapter = new PrismaNeon({ connectionString });

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        needs: { price: true },
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        needs: { rating: true },
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});
