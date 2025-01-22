import {
	startSignupProcess,
	StartSignUpReqBody,
	verifyEmailAddressWithOtp,
	resendEmailVerificationOtp,
	setPasswordForUser,
	startResetPassword,
	resendResetPasswordOtp,
	verifyResetPasswordOtp,
	resetPassword,
	ResendEmailVerificationOtpReqBody,
	VerifyEmailReqBody,
	SetPasswordReqBody,
	StartResetPasswordReqBody,
	ResetPasswordReqBody,
	VerifyResetPasswordOtpReqBody,
	ResendResetPasswordOtpReqBody,
	client,
} from "@/client";
import { useMutation } from "@tanstack/react-query";

client.setConfig({
	baseURL: process.env.NEXT_PUBLIC_API_URL!,
});

export const useStartSignup = () =>
	useMutation({
		mutationKey: ["start signup"],
		mutationFn: (data: StartSignUpReqBody) =>
			startSignupProcess({ body: data }),
	});

export const useResendEmailVerificationOtp = () =>
	useMutation({
		mutationKey: ["resend email verification otp"],
		mutationFn: (data: ResendEmailVerificationOtpReqBody) =>
			resendEmailVerificationOtp({ body: data }),
	});

export const useVerifyEmailWithOtp = () =>
	useMutation({
		mutationKey: ["verify email with otp"],
		mutationFn: (data: VerifyEmailReqBody) =>
			verifyEmailAddressWithOtp({ body: data }),
	});

export const useSetPassword = () =>
	useMutation({
		mutationKey: ["set password"],
		mutationFn: (data: SetPasswordReqBody) =>
			setPasswordForUser({ body: data }),
	});

export const useStartResetPassword = () =>
	useMutation({
		mutationKey: ["start reset password"],
		mutationFn: (data: StartResetPasswordReqBody) =>
			startResetPassword({ body: data }),
	});

export const useResendResetPasswordOTP = () =>
	useMutation({
		mutationKey: ["resend reset password otp"],
		mutationFn: (data: ResendResetPasswordOtpReqBody) =>
			resendResetPasswordOtp({ body: data }),
	});

export const useVerifyResetPasswordOTP = () =>
	useMutation({
		mutationKey: ["verify reset password otp"],
		mutationFn: (data: VerifyResetPasswordOtpReqBody) =>
			verifyResetPasswordOtp({ body: data }),
	});

export const useResetPassword = () =>
	useMutation({
		mutationKey: ["reset password"],
		mutationFn: (data: ResetPasswordReqBody) =>
			resetPassword({ body: data }),
	});
