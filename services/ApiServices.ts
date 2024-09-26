import { ProfesionalResponseAPI, ReservaResponseAPI } from "@/constants/AllTypes";
import { BASE_URL } from "@/constants/ApiUrl";

export default class ApiServices {
    constructor(){}

    private async request<T>(path: string, method: string, body?: RequestInit) {
		const response = await fetch(`${BASE_URL}${path}`, {
            method,
            headers: {
              "Content-Type": "application/json",
            },
            ...body,
        });
		if (!response.ok) {
            throw new Error("Error fetching data");
          }
          const json = await response.json();
      
          return json;
	}

    async getProfesionales({idSearch}: { idSearch: any } = {idSearch: ""}) {
        try {

            const response = await this.request<ProfesionalResponseAPI>(`/profesionales/${idSearch}`, "GET");
            return response;
        } catch (error) {
          console.log("Error al obtener los profesionales:", error);   
        }
    }
    async getReservasCliente({id}: { id: any } = {id: ""}) {
        try {
            const response = await this.request<ReservaResponseAPI>(`/reservas/cliente/${id}`, "GET");
            return response ;
        } catch (error) {
            console.log("Error al obtener las reservas:", error);   
        }
    }
    async reservationTime(reservationBody: {
        turno: number,
        cliente: number
    }) {
        try {
            const response = await this.request<ReservaResponseAPI>(`/reservas`, "POST", {
                body: JSON.stringify(reservationBody),
            });
            return response;
        } catch (error) {
            console.log("Error al realizar la reserva:", error);
        }
    }
    
    async deleteReserva({id} : { id: number }) {
        try {
            const response = await this.request(`/reservas/${id}`, "DELETE");
            return response;
        } catch (error) {
            console.log("Error al eliminar la reserva:", error);
        }
    }
}
