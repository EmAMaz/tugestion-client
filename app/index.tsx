import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ReservaResponseAPI, TurnoValues } from "@/constants/AllTypes";
import { useDeleteReserva } from "@/hooks/useDeleteReserva";
import { useGetReservas } from "@/hooks/useGetReservas";
import { Image } from "expo-image";
import { router } from "expo-router";
import moment from "moment";
import "moment/locale/es";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import twrnc from "twrnc";

const currentDate = moment().format();

export default function Index() {
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fechaActual, setFechaActual] = useState(currentDate.split("T")[0]);
  const [fechaManana, setFechaManana] = useState(
    moment().add(1, "days").format().split("T")[0]
  );
  const [turnoVigente, setReservas] = useState<ReservaResponseAPI>();
  const { dataReservas, isLoadingReservas, refetchReservas } = useGetReservas(2);
  const { cancelarReserva, isLoadingCancelarReserva } = useDeleteReserva(() => {
    "Reserva cancelada";
  });

  const handlerEliminarReserva = () => {
    cancelarReserva(dataReservas[0].id_reserva);
    setShowModal(false);
  };

  useEffect(() => {
    refetchReservas();
  }, [showModal]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hola!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {!isLoadingReservas && dataReservas !== undefined ? (
          dataReservas.map((e: any) => (
            <TouchableOpacity
              key={e.id_reserva}
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => setShowDeleteOption(!showDeleteOption)}
            >
              <View style={styles.cardMain}>
                <View>
                  <View style={styles.cardContent}>
                    <Text style={styles.textCard}>Turno vigente </Text>
                    <Text style={twrnc`uppercase`}>
                      {e.turno.fecha === fechaActual
                        ? "Hoy"
                        : e.turno.fecha === fechaManana
                        ? moment().add(1, "days").format("LLLL").split(",")[0]
                        : ""}
                    </Text>
                  </View>
                  <Text>
                    {e.turno.hora_inicio} - {e.turno.hora_fin}
                  </Text>
                  <View style={twrnc`flex flex-row gap-2 pt-2 items-center`}>
                    <Text>Atendido por:</Text>
                    <Text style={twrnc`uppercase text-lg`}>
                      {e.turno.profesional.nombre}
                    </Text>
                  </View>
                </View>
                {showDeleteOption && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setShowModal(true)}
                  >
                    <Image
                      style={styles.image}
                      source="https://i.postimg.cc/Vv1s1HWH/delete-Icon.png"
                      contentFit="cover"
                    />
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Cargando...</Text>
        )}
        {dataReservas && dataReservas.length === 0 && (
          <>
            <Text style={twrnc`text-lg pb-4`}>
              No tienes ningún turno, ¡reservá uno ahora! 📅
            </Text>
            <TouchableOpacity
              style={styles.btnCard}
              activeOpacity={0.7}
              onPress={() => {
                router.push("/reservarTurno");
              }}
            >
              <Text style={styles.textBtnCard}>Reservar turno</Text>
            </TouchableOpacity>
          </>
        )}
        <Modal
          visible={showModal}
          style={styles.modal}
          animationType="slide"
          transparent
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Estás por eliminar este turno.
              </Text>
              <Text style={styles.modalSubText}>¿Deseas continuar?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handlerEliminarReserva}
                >
                  <Text style={styles.modalButtonText}>Si</Text>
                  {isLoadingCancelarReserva && (
                    <ActivityIndicator
                      color={"#000"}
                      size={"small"}
                      style={twrnc`ml-2`}
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ThemedView>
    </ParallaxScrollView>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  btnCard: {
    borderWidth: 2,
    borderColor: "#000",
    padding: 8,
    borderRadius: 4,
    width: "50%",
  },
  textBtnCard: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  card: {
    borderWidth: 1.3,
    padding: 14,
    borderRadius: 4,
  },
  cardMain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  textCard: {
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    width: 35,
    height: 35,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    opacity: 0.5,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 8,
  },
  modalSubText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButtonText: {
    color: "#000",
    fontSize: 16,
  },
});
