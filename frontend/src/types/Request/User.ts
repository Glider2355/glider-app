import { User } from "../model";

export type userParams = {
    first_name?: User["first_name"];
    last_name?: User["last_name"];
    grade?: User["grade"];
    license_deadline?: User["license_deadline"];
    birthday?: User["birthday"];
};
