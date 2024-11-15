USE MedAgendaDB;


CREATE TABLE historial_medico(
  id_historial INT AUTO_INCREMENT,
  id_paciente INT,
  diagnostico TEXT,
  tratamiento TEXT,
  PRIMARY KEY(id_historial)
);

CREATE TABLE disponibilidad(
  id_disponibilidad INT AUTO_INCREMENT,
  id_doctor INT,
  dia_semana VARCHAR(20),
  PRIMARY KEY (id_disponibilidad, id_doctor)
);

CREATE TABLE facturacion(
  id_factura INT AUTO_INCREMENT,
  id_cita INT,
  fecha_factura TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  monto DOUBLE UNSIGNED,
  estado_factura ENUM('Pagada', 'Pendiente', 'En Mora'),
  PRIMARY KEY (id_factura)
);

CREATE TABLE pacientes(
  id_paciente INT AUTO_INCREMENT,
  nombre1_paciente VARCHAR(10) NOT NULL,
  nombre2_paciente VARCHAR(10),
  apellido1_paciente VARCHAR(10) NOT NULL,
  apellido2_paciente VARCHAR(10),
  cedula_paciente VARCHAR(10) NOT NULL,
  telefono_paciente VARCHAR(15) NOT NULL,
  correo_paciente VARCHAR(255) NOT NULL,
  direccion_paciente VARCHAR(50) NOT NULL,
  no_historial_medico INT,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (id_paciente),
  FOREIGN KEY (no_historial_medico) REFERENCES historial_medico(id_historial)
);

CREATE TABLE doctores(
  dr_id INT AUTO_INCREMENT,
  dr_nombre1 VARCHAR(15) NOT NULL,
  dr_nombre2 VARCHAR(15),
  dr_apellido1 VARCHAR(15) NOT NULL,
  dr_apellido2 VARCHAR(15),
  dr_especialidad VARCHAR(25) NOT NULL,
  dr_telefono VARCHAR(15) NOT NULL,
  dr_correo VARCHAR(255),
  dr_id_disponibilidad INT,
  dr_consultorio VARCHAR(15),
  dr_id_facturacion INT,
  PRIMARY KEY (dr_id),
  FOREIGN KEY (dr_id_disponibilidad) REFERENCES disponibilidad(id_disponibilidad),
  FOREIGN KEY (dr_id_facturacion) REFERENCES facturacion(id_factura)
);

CREATE TABLE citas(
  id_cita INT AUTO_INCREMENT,
  fecha_hora_cita TIMESTAMP NOT NULL,
  id_paciente_invol INT,
  id_dr_encar INT,
  motivo TEXT,
  estado_cita ENUM('Activa', 'Inactiva'),
  PRIMARY KEY (id_cita),
  FOREIGN KEY (id_paciente_invol) REFERENCES pacientes(id_paciente),
  FOREIGN KEY (id_dr_encar) REFERENCES doctores(dr_id)
);

CREATE TABLE recetas(
  id_receta INT AUTO_INCREMENT,
  id_paciente INT,
  id_doctor INT,
  fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  detalles_receta TEXT,
  PRIMARY KEY(id_receta),
  FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente),
  FOREIGN KEY (id_doctor) REFERENCES doctores(dr_id)
);

CREATE TABLE visita_medica(
  id_historial INT,
  id_cita INT,
  fecha_visita_medica DATE NOT NULL,
  PRIMARY KEY(id_historial, id_cita),
  FOREIGN KEY (id_historial) REFERENCES historial_medico(id_historial),
  FOREIGN KEY (id_cita) REFERENCES citas(id_cita)
);

CREATE TABLE notificaciones(
  notif_id INT AUTO_INCREMENT,
  id_paciente INT,
  id_cita INT,
  fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  tipo_notif ENUM('Recordatorio', 'Envio Receta', 'Cancelacion', 'Cambio'),
  PRIMARY KEY(notif_id),
  FOREIGN KEY (id_paciente) REFERENCES pacientes(id_paciente),
  FOREIGN KEY (id_cita) REFERENCES citas(id_cita)
);
