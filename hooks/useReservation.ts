import { ReservationValues } from "@/constants/AllTypes";
import ApiServices from "@/services/ApiServices";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useReservation(cb: () => void) {
    const { mutate, isPending, isError } = useMutation({
      onSuccess: () => {
        cb();
      },
      mutationFn: async (reservationValues: ReservationValues) => {
        const api = new ApiServices();
        return api.reservationTime(reservationValues);
      },
    });
  
    return { reservation: mutate, isLoadingReservation: isPending, isError };
  }