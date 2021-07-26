export interface LibBorrow {
    id: number;
    idbook: number;
    iduser: number;
    borrowtime: string;
    returntime: string;
    states: string;
    isbnid: number;
    actborrowtime: string;
    actreturntime: string;
    username: string;
    titlebook: string;
    isbnname: string;
    chargefine: number;
    isdeleted: boolean;
}
