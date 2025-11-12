import { RegisterDTO } from "../interfaces/register"
import { apiFetch } from "./singletonFetch"

import { LoginDTO } from "../interfaces/login"

export const loginService = (body: LoginDTO) => {
  return apiFetch('/auth/login', 'POST', body)
}

export const registerService = (body: RegisterDTO) => {
    return apiFetch('/users/register', 'POST', body)
}