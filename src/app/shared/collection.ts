export interface BasicItem {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface UserData extends BasicItem {
    title: string;
    designation_id: number;
    department_id: number;
    is_admin: boolean;
    mobile: string;
    token: string;
}

export interface Department extends BasicItem {
    title: string;
}

export interface Designation extends BasicItem {
    title: string;
    department_id: number;
}
