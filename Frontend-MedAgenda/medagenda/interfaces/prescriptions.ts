export interface PrescriptionsDoctorView {
    patient_id: number,
    clinic_id: number,
    date_emitted: string,
    prescription_description: string,
}

export interface PrescriptionsPatientView {
    date_emitted: string,
    doctor_first_name: string,
    doctor_second_name?: string,
    doctor_last_name: string,
    prescription_description: string,
}

export interface Prescription {
    patient_id: number,
    clinic_id: number,
    prescription_description: string,
}