import { Book } from "./books";
import { User } from "./user";

export interface Basket {
    id : number,
    totalAmount : number,
    purchaser : User,
    wantedBooks : Book[]
}
