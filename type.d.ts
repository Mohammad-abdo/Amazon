export interface productProps{
    brand:string;
    category:string;
    description:string;
    image:string;
    isNew:boolean;
    oldPrice:number;
    price:number;
    title:string;
    _id:number
}
export interface storeProduct{
    brand:string;
    category:string;
    description:string;
    image:string;
    isNew:boolean;
    oldPrice:number;
    price:number;
    title:string;
    _id:number;
    quantaty:number;
}
export interface StateProps{
    productData: storeProduct[];
    favoriteData: storeProduct[];
    next:any;
    userInfo: null | {name:string; email:string; image:string};
}


