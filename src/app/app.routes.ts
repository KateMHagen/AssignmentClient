import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PublishersComponent } from './publishers/publishers.component';
import { BooksComponent } from './books/books.component';
import { PublisherDetailsComponent } from './publisher-details/publisher-details.component';

export const routes: Routes = [
    {path:"weather", component: WeatherComponent},
    {path:"navbar", component: NavBarComponent},
    {path:"publishers", component: PublishersComponent},
    {path:"books", component: BooksComponent},
    {path:"publishers/:id", component: PublisherDetailsComponent},
    {path:"", component: WeatherComponent, pathMatch:"full"}
];