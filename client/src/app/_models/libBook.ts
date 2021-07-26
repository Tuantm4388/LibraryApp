export interface LibBook {
    id: number;
    idISNB: number;
    isbn: string;
    title: string;
    condition: string;
    addtime: Date;
    isborrowed: boolean;
    isreserved: boolean;

    author: string;
    origin: string;
    language: string;
    catalogue: string;
    summary: string;
    publishtime: Date;
    photourl: string;
}

export interface LibBookInfo {
    id: number;
    isbn: string;
    title: string;
    author: string;
    origin: string;
    language: string;
    catalogue: string;
    summary: string;
    addtime: Date;
    publishtime: Date;
    condition: string;
    photourl: string;
}