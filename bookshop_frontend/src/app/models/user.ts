import { Role } from "./role";

export interface User {
    id : number | null,
    email : string | null,
    password : string | null,
    firstName : string | null,
    lastName : string | null,
    roles : string[] | null,
    mainRole : string | null
}

