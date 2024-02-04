export const MODE: "demo" | "prod" = "demo"

function getHost() {
    if(MODE=='prod') return "http://195.35.6.155:8400/" 
    else return "http://localhost:8080/"
}

export const LOGO = "Fixtures_ecom"
export const HOST =  getHost()
export const BASE_API = HOST + "api/v1"
export const USER_ROUTE = BASE_API + "/users"
export const LOGIN_URL = BASE_API + "/users/login"