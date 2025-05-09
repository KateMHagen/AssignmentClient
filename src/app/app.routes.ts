import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PublishersComponent } from './publishers/publishers.component';
import { BooksComponent } from './books/books.component';
import { PublisherDetailsComponent } from './publisher-details/publisher-details.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { LoginComponent } from './auth/login.component';
import { PublisherEditComponent } from './publisher-edit/publisher-edit.component';

export const routes: Routes = [
    {path:"weather", component: WeatherComponent},
    {path:"navbar", component: NavBarComponent},
    {path:"publishers", component: PublishersComponent},
    {path:"books", component: BooksComponent},
    {path:"bookEdit/:id", component: BookEditComponent},
    {path:"publishers/:id", component: PublisherDetailsComponent},
    {path:"publisherEdit/:id", component: PublisherEditComponent},
    {path:"login",component:LoginComponent},
    {path:"", component: WeatherComponent, pathMatch:"full"}
];