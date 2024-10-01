import type { User } from "next-auth";

declare module "next-auth" {
	interface User {
		token?: string;
		refresh?: string;
	}
}
