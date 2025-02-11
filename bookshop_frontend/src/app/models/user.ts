import { Role } from "./role";

export interface User {
    id : number | null,
    email : string | null,
    password : string | null,
    firstName : string | null,
    lastName : string | null,
    roles : Role[] | null,
    mainRole : string | null
}

