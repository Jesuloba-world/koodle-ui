import axios, { baseURL } from "../axios";
import { AuthenticationApi, Configuration } from "@/api-sdk";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

const config = new Configuration({
	basePath: "https://www.google.com",
});

const api = new AuthenticationApi(config, undefined, axios);

export const useStartSignup = () =>
	useMutation({
		mutationKey: ["start signup"],
		mutationFn: api.startSignupProcess,
	});

export const useResendEmailVerificationOtp = () =>
	useMutation({
		mutationKey: ["resend email verification otp"],
		mutationFn: api.resendEmailVerificationOTP,
	});

export const useVerifyEmailWithOtp = () =>
	useMutation({
		mutationKey: ["verify email with otp"],
		mutationFn: api.verifyEmailAddressWithOTP,
	});

export const useSetPassword = () =>
	useMutation({
		mutationKey: ["set password"],
		mutationFn: api.setPasswordForUser,
	});
