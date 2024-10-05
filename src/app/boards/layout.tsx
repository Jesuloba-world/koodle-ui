import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { TopNav } from "@/components/nav/topnav";
import { SideBar } from "@/components/nav/sidenav";
import { NavProvider } from "@/components/nav/navProvider";

export default async function BoardsLayout({
	children,
}: {
	children: ReactNode;
}) {
	const session = await auth();
	if (!session?.token) {
		redirect("/auth/login");
	}

	return (
		<div className="min-h-screen flex flex-col">
			<NavProvider>
				<TopNav userEmail={session.user?.email || "-"} />
				<div className="flex flex-1">
					<SideBar />
					{children}
				</div>
			</NavProvider>
		</div>
	);
}
