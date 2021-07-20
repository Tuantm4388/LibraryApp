export interface LibBook {
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