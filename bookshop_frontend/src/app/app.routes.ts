import { Routes } from '@angular/router';
import { BooksDisplayedComponent } from './moduls/books-displayed/books-displayed.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/authentication/login/login.component';
import { SignUpComponent } from './core/authentication/sign-up/sign-up.component';
import { StockDisplayedComponent } from './moduls/stock-displayed/stock-displayed.component';
import { BasketDisplayedComponent } from './moduls/basket-displayed/basket-displayed.component';
import { AccountComponent } from './moduls/account/account.component';
import { UpdateStockFormComponent } from './moduls/forms/update-stock-form/update-stock-form.component';
import { AddingBookToStockFormComponent } from './moduls/forms/adding-book-to-stock-form/adding-book-to-stock-form.component';
import { ModificationFormComponent } from './moduls/forms/modification-form/modification-form.component';
import { UserNotLoggedInComponent } from './moduls/errors/user-not-logged-in/user-not-logged-in.component';

export const routes: Routes = [
    { path: '', component : BooksDisplayedComponent},
    { path: 'authentified', component: BooksDisplayedComponent },
    { path : 'login', component : LoginComponent},
    { path : 'register', component : SignUpComponent},
    { path : 'books', component : BooksDisplayedComponent},
    { path : 'stocks/book/:bookId', component : StockDisplayedComponent},
    { path : 'myBasket', component : BasketDisplayedComponent},
    { path : 'Account', component : AccountComponent},
    { path : 'myStock', component : StockDisplayedComponent},
    { path : 'stocks/ofUser/:userId/ofBook/:bookId', component : UpdateStockFormComponent},
    { path : 'addToMyStock', component : BooksDisplayedComponent},
    { path : 'addingBookToMyStock', component : AddingBookToStockFormComponent},
    { path : 'modify_informations', component: ModificationFormComponent},
    { path : 'modify_password', component: ModificationFormComponent},
    { path : 'top_rated_books', component : BooksDisplayedComponent},
    { path : 'unauthentified', component : UserNotLoggedInComponent},
];