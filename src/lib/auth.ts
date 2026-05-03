import { checkout, portal, polar } from "@polar-sh/better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import prisma from "@/lib/db";
import { polarClient } from "./polar";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "8023a6d7-3308-4c3c-894e-9dcb26f364aa",
                            slug: "pro",
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true,
                }),
                portal()
            ]

        })]
});