import type { User } from "next-auth";

declare module "next-auth" {
	interface User {
		token?: string;
		refresh?: string;
		tokenExpires?: string;
	}

	interface Session {
		token?: string;
		tokenExpires?: string;
	}
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
	interface JWT {
		token?: string;
		refresh?: string;
		id?: string;
		tokenExpires?: string;
	}
}
