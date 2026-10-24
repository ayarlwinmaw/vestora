-- Rename table (keeps existing data)
ALTER TABLE "Product" RENAME TO "products";

-- Rename primary key to match Prisma's naming for the new table
ALTER TABLE "products" RENAME CONSTRAINT "Product_pkey" TO "products_pkey";
