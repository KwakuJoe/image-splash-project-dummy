export interface CreateUser {
    username: string | "";
    name: string | "";
    email:  string | "";
    password: string | "";
}


export interface Login{
    email:  string | "";
    password: string | "";
}

// authentication user
export interface AuthenticatedUser {
    user:    User | null;
    token:   Token | null;
}

export interface Token {
    type:  string;
    token: string;
}

export interface User {
    name:       string;
    email:      string;
    username:   string;
    role_id:    number;
    uuid:       string;
    created_at: Date;
    updated_at: Date;
    id:         number;
}

//posts
export interface Posts {
    message: string | null | undefined;
    posts:   Post[] | null |undefined
}



export interface UploadPost{
    title: string | null | undefined;
    body:  string | null | undefined;
    categoryId: number | null;
    image: string | null | Object| undefined;
}


export interface Post {
    id:                number 
    uuid:              string | null | undefined;
    category_id:       number | null | undefined;
    collection_id:     null | null | undefined;
    title:             string | null | undefined;
    slug:              string | null | undefined;
    user_id:           number | null | undefined;
    body:              string | null | undefined;
    image:             string | null | undefined;
    view_count?:        number | null | undefined;
    view_count_unique?: number | null | undefined;
    posted_at?:         null | null | undefined;
    created_at?:        Date | null | undefined;
    updated_at?:        Date | null | undefined;
}


export interface CategoryList{
    message:    string;
    categories: Category[];
}

export interface Category {
    id:          number;
    uuid:        string;
    name:        string;
    description: string;
    created_at:  Date;
    updated_at:  Date;
}


export interface Comment{
    postId:number | null;
    content:string | null;
}


