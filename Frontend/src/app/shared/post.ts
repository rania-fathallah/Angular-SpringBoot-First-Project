import { Contact } from "./contact";

export class Post{
    id: number;
    title:string;
    superficie: number;
    numberRooms: number;
    city: string;
    location: string;
    offer : "Sale" | "Rent";
    price: number;
    photos: string[]; 
    description: string;
    contact: Contact;
    type: "House" | "Land" ;


    constructor() {
        this.contact = new Contact();
    }
}