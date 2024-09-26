import ApiServices from "@/services/ApiServices";
import { useQuery } from "@tanstack/react-query";

export function useGetProfesionales() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["Profesionales"],
    queryFn: async () => {
      const api = new ApiServices();
      return api.getProfesionales();
    },
  });

  return { dataProfesionales: data, isLoadingProfesionales: isLoading, isError };
}
export function useGetOneProfesional({ idSearch }: { idSearch: number }) {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["Profesional", idSearch],
    queryFn: async () => {
      const api = new ApiServices();
      return api.getProfesionales({ idSearch: idSearch });
    },
    enabled: idSearch !== 0,
  });
  return { dataProfesional: data, isLoadingProfesional: isLoading, isError, refetchProfesional:refetch };
}
