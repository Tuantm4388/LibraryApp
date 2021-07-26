export interface LibBorrow {
    id: number;
    idbook: number;
    iduser: number;
    borrowtime: Date;
    returntime: Date;
    states: string;
    isbnid: number;
    actborrowtime: Date;
    actreturntime: Date;
    username: string;
    titlebook: string;
    isbnname: string;
    chargefine: number;
    isdeleted: boolean;
}
