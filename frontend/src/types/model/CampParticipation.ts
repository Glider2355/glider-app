export type CampParticipation = {
    user_id: number;
    user_first_name: string;
    user_last_name: string;
    user_university: string;
    grade: string,
    licence_deadline: string;
    age: string;
    user_role: string[];
    attendances: { [key: string]: string };
};
