/* tslint:disable */
/* eslint-disable */
/**
 * Koodle API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError, operationServerMap } from './base';

/**
 * 
 * @export
 * @interface ErrorDetail
 */
export interface ErrorDetail {
    /**
     * Where the error occurred, e.g. \'body.items[3].tags\' or \'path.thing-id\'
     * @type {string}
     * @memberof ErrorDetail
     */
    'location'?: string;
    /**
     * Error message text
     * @type {string}
     * @memberof ErrorDetail
     */
    'message'?: string;
    /**
     * 
     * @type {any}
     * @memberof ErrorDetail
     */
    'value'?: any;
}
/**
 * 
 * @export
 * @interface ErrorModel
 */
export interface ErrorModel {
    /**
     * A URL to the JSON Schema for this object.
     * @type {string}
     * @memberof ErrorModel
     */
    '$schema'?: string;
    /**
     * A human-readable explanation specific to this occurrence of the problem.
     * @type {string}
     * @memberof ErrorModel
     */
    'detail'?: string;
    /**
     * Optional list of individual error details
     * @type {Array<ErrorDetail>}
     * @memberof ErrorModel
     */
    'errors'?: Array<ErrorDetail>;
    /**
     * A URI reference that identifies the specific occurrence of the problem.
     * @type {string}
     * @memberof ErrorModel
     */
    'instance'?: string;
    /**
     * HTTP status code
     * @type {number}
     * @memberof ErrorModel
     */
    'status'?: number;
    /**
     * A short, human-readable summary of the problem type. This value should not change between occurrences of the error.
     * @type {string}
     * @memberof ErrorModel
     */
    'title'?: string;
    /**
     * A URI reference to human-readable documentation for the error.
     * @type {string}
     * @memberof ErrorModel
     */
    'type'?: string;
}
/**
 * 
 * @export
 * @interface ResendEmailVerificationOTPReqBody
 */
export interface ResendEmailVerificationOTPReqBody {
    /**
     * A URL to the JSON Schema for this object.
     * @type {string}
     * @memberof ResendEmailVerificationOTPReqBody
     */
    '$schema'?: string;
    /**
     * resend otp to email
     * @type {string}
     * @memberof ResendEmailVerificationOTPReqBody
     */
    'email': string;
}
/**
 * 
 * @export
 * @interface ResendEmailVerificationOTPRespBody
 */
export interface ResendEmailVerificationOTPRespBody {
    /**
     * A URL to the JSON Schema for this object.
     * @type {string}
     * @memberof ResendEmailVerificationOTPRespBody
     */
    '$schema'?: string;
    /**
     * 
     * @type {string}
     * @memberof ResendEmailVerificationOTPRespBody
     */
    'message': string;
}
/**
 * 
 * @export
 * @interface SetPasswordReqBody
 */
export interface SetPasswordReqBody {
    /**
     * A URL to the JSON Schema for this object.
     * @type {string}
     * @memberof SetPasswordReqBody
     */
    '$schema'?: string;
    /**
     * email of user
     * @type {string}
     * @memberof SetPasswordReqBody
     */
    'email': string;
    /**
     * otp sent to email
     * @type {string}
     * @memberof SetPasswordReqBody
     */
    'otp': string;
    /**
     * new password of user
     * @type {string}
     * @memberof SetPasswordReqBody
     */
    'password': string;
}
/**
 * 
 * @export
 * @interface SetPasswordRespBody
 */
export interface SetPasswordRespBody {
    /**
     * A URL to the JSON Schema for this object.
     * @type {string}
     * @memberof SetPasswordRespBody
     */
    '$schema'?: string;
    /**
     * 
     * @type {string}
     * @memberof SetPasswordRespBody
     */
    'message': string;
}
/**
 * 
 * @export
 * @interface StartSignUpReqBody
 */
export interface StartSignUpReqBody {
    /**
     * A URL to the JSON Schema for this object.
     * @type {string}
     * @memberof StartSignUpReqBody
     */
    '$schema'?: string;
    /**
     * email of new user, otp will be sent to this email for verification
     * @type {string}
     * @memberof StartSignUpReqBody
     */
    'email': string;
}
/**
 * 
 * @export
 * @interface StartSignUpRespBody
 */
export interface StartSignUpRespBody {
    /**
     * A URL to the JSON Schema for this object.
     * @type {string}
     * @memberof StartSignUpRespBody
     */
    '$schema'?: string;
    /**
     * 
     * @type {string}
     * @memberof StartSignUpRespBody
     */
    'message': string;
}
/**
 * 
 * @export
 * @interface VerifyEmailReqBody
 */
export interface VerifyEmailReqBody {
    /**
     * A URL to the JSON Schema for this object.
     * @type {string}
     * @memberof VerifyEmailReqBody
     */
    '$schema'?: string;
    /**
     * email of user
     * @type {string}
     * @memberof VerifyEmailReqBody
     */
    'email': string;
    /**
     * otp sent to email
     * @type {string}
     * @memberof VerifyEmailReqBody
     */
    'otp': string;
}
/**
 * 
 * @export
 * @interface VerifyEmailRespBody
 */
export interface VerifyEmailRespBody {
    /**
     * A URL to the JSON Schema for this object.
     * @type {string}
     * @memberof VerifyEmailRespBody
     */
    '$schema'?: string;
    /**
     * 
     * @type {string}
     * @memberof VerifyEmailRespBody
     */
    'message': string;
}

/**
 * AuthenticationApi - axios parameter creator
 * @export
 */
export const AuthenticationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {ResendEmailVerificationOTPReqBody} resendEmailVerificationOTPReqBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        resendEmailVerificationOTP: async (resendEmailVerificationOTPReqBody: ResendEmailVerificationOTPReqBody, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'resendEmailVerificationOTPReqBody' is not null or undefined
            assertParamExists('resendEmailVerificationOTP', 'resendEmailVerificationOTPReqBody', resendEmailVerificationOTPReqBody)
            const localVarPath = `/auth/resendemailverificationotp`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(resendEmailVerificationOTPReqBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {SetPasswordReqBody} setPasswordReqBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        setPasswordForUser: async (setPasswordReqBody: SetPasswordReqBody, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'setPasswordReqBody' is not null or undefined
            assertParamExists('setPasswordForUser', 'setPasswordReqBody', setPasswordReqBody)
            const localVarPath = `/auth/setPassword`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(setPasswordReqBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {StartSignUpReqBody} startSignUpReqBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        startSignupProcess: async (startSignUpReqBody: StartSignUpReqBody, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'startSignUpReqBody' is not null or undefined
            assertParamExists('startSignupProcess', 'startSignUpReqBody', startSignUpReqBody)
            const localVarPath = `/auth/startsignup`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(startSignUpReqBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {VerifyEmailReqBody} verifyEmailReqBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        verifyEmailAddressWithOTP: async (verifyEmailReqBody: VerifyEmailReqBody, options: RawAxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'verifyEmailReqBody' is not null or undefined
            assertParamExists('verifyEmailAddressWithOTP', 'verifyEmailReqBody', verifyEmailReqBody)
            const localVarPath = `/auth/verifyemail`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(verifyEmailReqBody, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * AuthenticationApi - functional programming interface
 * @export
 */
export const AuthenticationApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = AuthenticationApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {ResendEmailVerificationOTPReqBody} resendEmailVerificationOTPReqBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async resendEmailVerificationOTP(resendEmailVerificationOTPReqBody: ResendEmailVerificationOTPReqBody, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<ResendEmailVerificationOTPRespBody>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.resendEmailVerificationOTP(resendEmailVerificationOTPReqBody, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AuthenticationApi.resendEmailVerificationOTP']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {SetPasswordReqBody} setPasswordReqBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async setPasswordForUser(setPasswordReqBody: SetPasswordReqBody, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<SetPasswordRespBody>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.setPasswordForUser(setPasswordReqBody, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AuthenticationApi.setPasswordForUser']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {StartSignUpReqBody} startSignUpReqBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async startSignupProcess(startSignUpReqBody: StartSignUpReqBody, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<StartSignUpRespBody>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.startSignupProcess(startSignUpReqBody, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AuthenticationApi.startSignupProcess']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
        /**
         * 
         * @param {VerifyEmailReqBody} verifyEmailReqBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async verifyEmailAddressWithOTP(verifyEmailReqBody: VerifyEmailReqBody, options?: RawAxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<VerifyEmailRespBody>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.verifyEmailAddressWithOTP(verifyEmailReqBody, options);
            const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
            const localVarOperationServerBasePath = operationServerMap['AuthenticationApi.verifyEmailAddressWithOTP']?.[localVarOperationServerIndex]?.url;
            return (axios, basePath) => createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration)(axios, localVarOperationServerBasePath || basePath);
        },
    }
};

/**
 * AuthenticationApi - factory interface
 * @export
 */
export const AuthenticationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = AuthenticationApiFp(configuration)
    return {
        /**
         * 
         * @param {ResendEmailVerificationOTPReqBody} resendEmailVerificationOTPReqBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        resendEmailVerificationOTP(resendEmailVerificationOTPReqBody: ResendEmailVerificationOTPReqBody, options?: RawAxiosRequestConfig): AxiosPromise<ResendEmailVerificationOTPRespBody> {
            return localVarFp.resendEmailVerificationOTP(resendEmailVerificationOTPReqBody, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {SetPasswordReqBody} setPasswordReqBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        setPasswordForUser(setPasswordReqBody: SetPasswordReqBody, options?: RawAxiosRequestConfig): AxiosPromise<SetPasswordRespBody> {
            return localVarFp.setPasswordForUser(setPasswordReqBody, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {StartSignUpReqBody} startSignUpReqBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        startSignupProcess(startSignUpReqBody: StartSignUpReqBody, options?: RawAxiosRequestConfig): AxiosPromise<StartSignUpRespBody> {
            return localVarFp.startSignupProcess(startSignUpReqBody, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {VerifyEmailReqBody} verifyEmailReqBody 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        verifyEmailAddressWithOTP(verifyEmailReqBody: VerifyEmailReqBody, options?: RawAxiosRequestConfig): AxiosPromise<VerifyEmailRespBody> {
            return localVarFp.verifyEmailAddressWithOTP(verifyEmailReqBody, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * AuthenticationApi - object-oriented interface
 * @export
 * @class AuthenticationApi
 * @extends {BaseAPI}
 */
export class AuthenticationApi extends BaseAPI {
    /**
     * 
     * @param {ResendEmailVerificationOTPReqBody} resendEmailVerificationOTPReqBody 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApi
     */
    public resendEmailVerificationOTP(resendEmailVerificationOTPReqBody: ResendEmailVerificationOTPReqBody, options?: RawAxiosRequestConfig) {
        return AuthenticationApiFp(this.configuration).resendEmailVerificationOTP(resendEmailVerificationOTPReqBody, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {SetPasswordReqBody} setPasswordReqBody 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApi
     */
    public setPasswordForUser(setPasswordReqBody: SetPasswordReqBody, options?: RawAxiosRequestConfig) {
        return AuthenticationApiFp(this.configuration).setPasswordForUser(setPasswordReqBody, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {StartSignUpReqBody} startSignUpReqBody 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApi
     */
    public startSignupProcess(startSignUpReqBody: StartSignUpReqBody, options?: RawAxiosRequestConfig) {
        return AuthenticationApiFp(this.configuration).startSignupProcess(startSignUpReqBody, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {VerifyEmailReqBody} verifyEmailReqBody 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof AuthenticationApi
     */
    public verifyEmailAddressWithOTP(verifyEmailReqBody: VerifyEmailReqBody, options?: RawAxiosRequestConfig) {
        return AuthenticationApiFp(this.configuration).verifyEmailAddressWithOTP(verifyEmailReqBody, options).then((request) => request(this.axios, this.basePath));
    }
}


