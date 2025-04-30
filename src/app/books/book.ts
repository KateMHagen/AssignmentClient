import { Publisher } from "../publishers/publisher";

export interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
    pages: number;
    rating: number;
    publisherId: number;
    publisher: Publisher;
}