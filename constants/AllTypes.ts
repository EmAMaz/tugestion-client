export type ProfesionalResponseAPI = {
  id_profesional: number;
  nombre: string;
  especialidad: string;
  email: string;
  telefono: string;
  turnos: [TurnoValues];
};
export type ReservaResponseAPI = {
  id_reserva: number;
  fecha_reserva: string;
  cliente: {
    id_cliente: number;
    nombre: string;
    email: string;
    telefono: string;
  };
  turno: {
    id_turno: number;
    fecha: string;
    hora_inicio: string;
    hora_fin: string;
    estado: string;
    profesional: {
      id_profesional: number;
      nombre: string;
      especialidad: string;
      email: string;
      telefono: string;
    };
  };
};
export type TurnoValues = {
  id_turno: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado: string;
  profesional: {
    id_profesional: number;
    nombre: string;
    especialidad: string;
    email: string;
    telefono: string;
  };
};
export type ClienteValues = {
  id_cliente: number;
  nombre: string;
  email: string;
  telefono: string;
};
export type ReservationValues = {
  turno: number;
  cliente: number;
};
export type ReservationTurnoValues = {
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado: string;
};
export type ReservationTurnoValuesUpdate = {
  idTurno: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado: string;
};
