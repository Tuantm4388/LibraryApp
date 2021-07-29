import { Photo } from "./photo";

export interface LibUser {
    //token: string;
    id: number;
    username: string;
    created: Date;

    emailuser: string;
    idcard: string;
    phone: string;
    address: string;
    chargefile: number;
    roles: string[];
}