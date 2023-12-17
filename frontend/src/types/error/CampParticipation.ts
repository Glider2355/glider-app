export type CampParticipationError = {
  errors?: {
    start_time_slot?: string[];
    start_date?: string[];
    end_time_slot?: string[];
    end_date?: string[];
  };
};
