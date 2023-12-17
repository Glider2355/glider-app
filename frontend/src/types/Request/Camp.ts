import { Camp } from "@/types";

export type campParams = {
    id?: Camp["id"];
    name: Camp["name"];
    location: Camp["location"];
    start_date: Camp["start_date"];
    end_date: Camp["end_date"];
  };
