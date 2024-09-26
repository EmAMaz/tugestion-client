import ApiServices from "@/services/ApiServices";
import { useQuery } from "@tanstack/react-query";

export function useGetReservas(idCliente: number) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["ReservaCliente" + idCliente],
    queryFn: async () => {
      const api = new ApiServices();
      return api.getReservasCliente({ id: idCliente });
    },
    enabled: idCliente !== 0,
  });
  const refetchReservas = () => {
    refetch();
  }

  return { dataReservas: data, isLoadingReservas: isLoading, isErrorReservas: isError, refetchReservas};
}
