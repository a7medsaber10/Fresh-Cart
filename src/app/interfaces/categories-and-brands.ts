export interface CategoriesAndBrands {
    results: number;
    metadata: Metadata;
    data: itemData[];
}

export interface itemData {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Metadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
}