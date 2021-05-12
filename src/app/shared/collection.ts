export interface BasicItem {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface UserData extends BasicItem {
    title: string;
    is_admin: boolean;
    mobile: string;
    token: string;
    designation: string;
}

export interface Ward extends BasicItem {
    title: string;
    capacity: number;
}
