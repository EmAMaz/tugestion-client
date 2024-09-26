import ApiServices from "@/services/ApiServices";
import { useMutation } from "@tanstack/react-query";

export function useDeleteReserva(cb: () => void) {
  const { mutate, isPending, isError } = useMutation({
    onSuccess: () => {
        cb();
    },
    mutationFn: async (reservaId: number) => {
      const api = new ApiServices();
      return api.deleteReserva({ id: reservaId });
    },
  });

  return { cancelarReserva: mutate, isLoadingCancelarReserva: isPending, isErrorTurno: isError};
}
