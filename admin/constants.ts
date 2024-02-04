export const MODE: "demo" | "prod" = "prod"

export const LOGO = "Fixtures_ecom"
export const HOST = MODE === 'demo' ? "http://localhost:8080/" : "http://195.35.6.155:8400/"
export const BASE_API = HOST + "api/v1"
export const USER_ROUTE = BASE_API + "/users"
export const LOGIN_URL = BASE_API + "/users/login"