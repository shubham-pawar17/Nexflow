import { PrismaClient, Prisma } from "@/generated/prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// Force TypeScript to accept empty options as a valid subset
const prisma = global.prisma ?? new PrismaClient({} as Prisma.Subset<Prisma.PrismaClientOptions, Prisma.PrismaClientOptions>);

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;