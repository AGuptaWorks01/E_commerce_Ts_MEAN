export interface Product {
    id?: number;
    sku: string;
    price: number;
    name: string;
    images: {image_url: string}[];
}
