CREATE DATABASE MedAgenda;
USE MedAgenda;

CREATE TABLE users(
	user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    second_name VARCHAR(50),
    first_last_name VARCHAR(50) NOT NULL,
    second_last_name VARCHAR(50) NOT NULL,
    legal_id VARCHAR(15) NOT NULL UNIQUE, -- Cedula
    password_hash VARCHAR(255) NOT NULL,
    user_phone_number VARCHAR(20) NOT NULL,
    user_email_address VARCHAR(255) NOT NULL UNIQUE,
    birth_date DATE,
    gender ENUM('M', 'F', 'O'),
    address VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    emergency_contact_name VARCHAR(100),
    emergency_contact_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE clinics(
	clinic_id INT AUTO_INCREMENT PRIMARY KEY,
    clinic_name VARCHAR(25) NOT NULL,
    is_open BOOLEAN DEFAULT TRUE,
    clinic_phone_number VARCHAR(13) NOT NULL,
    clinic_opening_time VARCHAR(5), -- { En formato 24 horas
    clinic_break_time VARCHAR(5),
    clinic_close_time VARCHAR(5), -- }
    clinic_break_duration VARCHAR(3), -- { Duración en minutos
    clinic_average_appointment_time VARCHAR(3), -- }

    clinic_city_id INT NOT NULL,
    clinic_address VARCHAR(30) NOT NULL,
    clinic_description TEXT,
    clinic_owner INT NOT NULL,
    FOREIGN KEY (clinic_owner) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE clinic_members(
	clinic_id INT NOT NULL,
    user_id INT NOT NULL,
    role_within_clinic ENUM('Admin','Doctor','Employee') NOT NULL,
    role_description TEXT,
    member_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(clinic_id, user_id)
);

CREATE TABLE appointments(
	appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    clinic_id INT NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    scheduled_time_date TIMESTAMP NOT NULL,
    appointment_description TEXT
);

CREATE TABLE specialties(
	specialty_id INT AUTO_INCREMENT PRIMARY KEY,
    specialty_name VARCHAR(50) NOT NULL,
    specialty_description TEXT
);

CREATE TABLE doctor_specialties(
	doctor_id INT NOT NULL,
    specialty_id INT NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (specialty_id) REFERENCES specialties(specialty_id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY(doctor_id, specialty_id)
);

CREATE TABLE clinic_specialties(
	clinic_id INT NOT NULL,
    specialty_id INT NOT NULL,
    FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (specialty_id) REFERENCES specialties(specialty_id) ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (clinic_id, specialty_id)
);

CREATE TABLE prescriptions (
	prescription_id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT NOT NULL,
    clinic_id INT NOT NULL,
    patient_id INT NOT NULL,
    prescription_description TEXT NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (patient_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (clinic_id) REFERENCES clinics(clinic_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE countries(
    country_id INT AUTO_INCREMENT PRIMARY KEY,
    country_name VARCHAR(20) NOT NULL
);

CREATE TABLE states(
    state_id INT AUTO_INCREMENT PRIMARY KEY,
    state_name VARCHAR(20) NOT NULL,
    country_id INT NOT NULL,
    FOREIGN KEY (country_id) REFERENCES countries(country_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE cities(
    city_id INT AUTO_INCREMENT PRIMARY KEY,
    state_id INT NOT NULL,
    city_name VARCHAR(20),
    FOREIGN KEY (state_id) REFERENCES states(state_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE absences(
	doctor_id INT PRIMARY KEY,
    clinic_id INT NOT NULL,
    start_date_time DATETIME NOT NULL,
    end_date_time DATETIME NOT NULL,
    FOREIGN KEY (doctor_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
);



