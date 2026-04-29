export interface Category {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    displayOrder: number;
    isActive: boolean;
}

export interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    category: Category | string;
    shop: string;
    displayOrder: number;
    isActive: boolean;
}

export interface CategoryState {
    categories: Category[];
    subCategories: SubCategory[];
    status: "idle" | "loading" | "success" | "failed";
    error: string | null;
}