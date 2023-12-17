export type CampParticipationPrams = {
    camp_id: number;
    attendances: Attendance[];
};

type Attendance = {
    start_time_slot: string;
    start_date: string;
    end_time_slot: string;
    end_date: string;
}
