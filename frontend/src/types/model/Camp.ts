export type Camp = {
  id: number;
  name: string;
  location: string;
  start_date: string;
  end_date: string;
};

export const initCamp = () => {
  return {
    id: 0,
    name: "",
    location: "",
    start_date: "",
    end_date: "",
  };
};
