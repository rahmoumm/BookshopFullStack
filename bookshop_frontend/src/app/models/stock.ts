import { Book } from "./books";
import { User } from "./user";

export interface Stock {
    book : Book,
    user : User,
    availableQuantity : number,
    price : number,
}
