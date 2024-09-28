import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_URL!;

const customAxiosInstance = axios.create({
	baseURL: baseURL,
});

customAxiosInstance.interceptors.request.use(
	async (config) => {
		// get accesstoken
		return config;
	},
	(error) => Promise.reject(error)
);

export default customAxiosInstance;
