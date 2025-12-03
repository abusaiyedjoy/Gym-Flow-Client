import { getNewAccessToken } from "@/services/auth/auth.service";
import { getCookie } from "@/services/auth/tokenHandaler";



const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

// /auth/login
const serverFetchHelper = async (endpoint: string, options: RequestInit): Promise<Response> => {
    const { headers, ...restOptions } = options;
    const accessToken = await getCookie("accessToken");

    //to stop recursion loop
    if (endpoint !== "/auth/refresh-token") {
        await getNewAccessToken();
    }

    const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
        headers: {
            // Send token both in Cookie and Authorization to satisfy backends that read either
            Cookie: accessToken ? `accessToken=${accessToken}` : "",
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
            ...headers,
        },
        ...restOptions,
    })

    return response;
}

export const serverFetch = {
    get: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "GET" }),

    post: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "POST" }),

    put: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PUT" }),

    patch: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

    delete: async (endpoint: string, options: RequestInit = {}): Promise<Response> => serverFetchHelper(endpoint, { ...options, method: "DELETE" }),

}
