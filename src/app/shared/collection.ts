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

export interface Patient extends BasicItem {
    title: string;
    father: string;
    age: number;
    mobile: string;
    date_of_discharge: string;
    narration: string;
    bed_number: number;
    has_oxygen_line: boolean;
    ward_id: number;
    ward: Ward;
    spo2_level: number;
}

export interface OxygenRequest extends BasicItem {
    patient_id: number;
    ward_id: number;
    bed_number: number;
    spo2_level: number;
    state: string;
    comment: string;
    patient: Patient;
    ward: Ward;
}
