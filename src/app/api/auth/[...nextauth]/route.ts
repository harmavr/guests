import { authOptions } from "@/src/app/[locale]/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
