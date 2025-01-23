import { handlers } from "@/auth";

import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { decode, encode } from "next-auth/jwt";
import { client, refreshToken } from "@/client";
import { formatDistanceToNowStrict, parseISO } from "date-fns";

client.setConfig({
	baseURL: process.env.NEXT_PUBLIC_API_URL!,
});

const SESSION_SECURE = process.env.AUTH_URL?.startsWith("https://");
const SESSION_SALT = SESSION_SECURE
	? "__Secure-authjs.session-token"
	: "authjs.session-token";

async function wrappedAuthHandler(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.AUTH_SECRET });
	const response =
		req.method === "GET"
			? await handlers.GET(req)
			: await handlers.POST(req);
	return maybePerformTokenRefresh(token, response);
}

export { wrappedAuthHandler as GET, wrappedAuthHandler as POST };

async function maybePerformTokenRefresh(token: any, response: Response) {
	const setCookieHeaders = response.headers.getSetCookie();
	const nextAuthSessionTokenCookie = setCookieHeaders?.find((cookie) =>
		cookie.includes(SESSION_SALT)
	);

	if (!nextAuthSessionTokenCookie) {
		return response;
	}

	const cookieValue = nextAuthSessionTokenCookie.split(";")[0].split("=")[1];

	const decodedCookieAsToken = await decode({
		secret: process.env.AUTH_SECRET!,
		token: cookieValue,
		salt: SESSION_SALT,
	});

	if (
		!decodedCookieAsToken ||
		!shouldUpdateToken(decodedCookieAsToken.tokenExpires as string)
	) {
		console.log(
			"no need to refresh token",
			formatDistanceToNowStrict(
				parseISO(decodedCookieAsToken?.tokenExpires!)
			),
			"more"
		);
		return response;
	}

	const updatedSessionToken = { ...decodedCookieAsToken };

	try {
		console.log("refreshing token");

		const refreshedTokens = await refreshTokens(
			decodedCookieAsToken.refresh as string
		);

		updatedSessionToken.token = refreshedTokens.authToken;
		updatedSessionToken.refresh = refreshedTokens.refreshToken;
		updatedSessionToken.tokenExpires = refreshedTokens.authTokenExpires;
	} catch (e) {
		console.error(`Error refreshing tokens: ${e}`);
	}

	console.log("token refreshed");

	const newSessionToken = await encode({
		secret: process.env.AUTH_SECRET!,
		token: updatedSessionToken,
		maxAge: 7 * 24 * 60 * 60, // 1 week
		salt: SESSION_SALT,
	});

	const clonedResponse = new Response(response.body, response);
	clonedResponse.headers.delete("Set-Cookie");
	clonedResponse.headers.append(
		"Set-Cookie",
		createAuthCookieString(newSessionToken)
	);

	return clonedResponse;
}

function shouldUpdateToken(expiresAt: string) {
	const expiresAtDate = parseISO(expiresAt);
	const now = Date.now();
	const buffer = 5 * 60 * 1000; // 5 minutes
	// const buffer = 1 * 60 * 1000; // 1 minutes
	return expiresAtDate.getTime() - now < buffer;
}

function createAuthCookieString(token: string) {
	return `${SESSION_SALT}=${token}; Path=/; HttpOnly; SameSite=Lax${
		SESSION_SECURE ? "; Secure" : ""
	}`;
}

async function refreshTokens(refreshtoken: string) {
	const response = await refreshToken({
		body: { refreshtoken },
	});

	return {
		authToken: response.data?.accesstoken,
		refreshToken: response.data?.refreshtoken,
		authTokenExpires: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour from now
		// authTokenExpires: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes from now
	};
}
