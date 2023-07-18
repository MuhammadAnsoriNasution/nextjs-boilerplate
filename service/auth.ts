import { axiosProtect } from "@/utils/axiosInstance";

export async function loginService(data: { email: string, password: string }) {
    return await axiosProtect.post("/login", data)
}

export async function refreshTokenService({ refresh_token }: { refresh_token: string }) {
    return await axiosProtect.post("/refresh-token", { refresh_token })
}