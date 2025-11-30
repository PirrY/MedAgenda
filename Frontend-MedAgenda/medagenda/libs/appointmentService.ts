import { CreateAppointment } from "../interfaces/appointment";
import { apiFetch } from "./singletonFetch";

export const scheduleAppointment = (obj: CreateAppointment): Promise<void> => {
    return apiFetch(`/appointments/scheduleAppointment`,'POST', obj);
};
