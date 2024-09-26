import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  useGetOneProfesional,
  useGetProfesionales,
} from "@/hooks/useGetProfesionales";
import { ButtonSubmit } from "@/components/ButtonSubmit";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useReservation } from "@/hooks/useReservation";
import { router } from "expo-router";
import moment from "moment";
import 'moment/locale/es';

interface Turno {
  id_turno: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado: string;
}

const currentDate = moment().format();

export default function ReservaScreen() {
  const [valueSelected, setValueSelected] = useState<number>(0);
  const [dataTurnos, setDataTurnos] = useState<Turno[]>([]);
  const [fechaActual, setFechaActual] = useState(
    currentDate.split("T")[0]
  );
  const [fechaManana, setFechaManana] = useState(
    moment().add(1, "days").format().split("T")[0]
  );
  const { dataProfesionales, isLoadingProfesionales } = useGetProfesionales();
  const [profesionalSelected, setProfesionalSelected] = useState<number>(0);
  const { dataProfesional, isLoadingProfesional, refetchProfesional } =
    useGetOneProfesional({ idSearch: profesionalSelected });
  const { reservation, isLoadingReservation } = useReservation(() => {});

  const handlerSelectProfesional = (id: number) => {
    setProfesionalSelected(id);
    console.log("seleccionado " + id);
  };
  const handlerSubmit = () => {
    if(valueSelected === 0) return;
    reservation({ turno: valueSelected, cliente: 2 });
    !isLoadingReservation && router.push("/");
  };
  useEffect(() => {
    if (!isLoadingProfesionales) {
      setProfesionalSelected(dataProfesionales.slice(0, 1)[0].id_profesional);
    }
  }, [isLoadingProfesionales]);

  useEffect(() => {
    if (profesionalSelected) {
      setValueSelected(0)
      refetchProfesional();
    }
  }, [profesionalSelected, refetchProfesional]);

  useEffect(() => {
    if (dataProfesional) {
      const dataTurnos = dataProfesional.turnos.filter(
        (turno: Turno) => turno.estado === "disponible"
      );
      console.log(moment().format("LLLL").split(",")[0]);
      setDataTurnos(dataTurnos);
    }
  }, [dataProfesional]);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
    >
      {!isLoadingProfesionales ? (
        <>
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Tu turno con:</ThemedText>
          </ThemedView>

          <View style={styles.navBar}>
            {dataProfesionales.map((profesional: any) => (
              <TouchableOpacity
                key={profesional.id_profesional}
                style={
                  profesionalSelected === profesional.id_profesional
                    ? styles.btnCardSelected
                    : styles.btnCard
                }
                onPress={() =>
                  handlerSelectProfesional(profesional.id_profesional)
                }
              >
                <Text style={styles.textBtnCard}>{profesional.nombre}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <ThemedText>Horarios Disponibles:</ThemedText>
          <Picker
            selectedValue={valueSelected}
            onValueChange={(itemValue) => {itemValue && setValueSelected(itemValue)}}
          >
            {dataTurnos.length > 0 ? (
              dataTurnos.map((turno: Turno) => (
                <Picker.Item
                  key={turno.id_turno}
                  label={turno.hora_inicio + " - " + turno.hora_fin + " " + (turno.fecha == fechaActual ? "(Hoy)" : turno.fecha == fechaManana ?  moment().add(1, "days").format("LLLL").split(",")[0] : "")}
                  value={turno.id_turno}
                />
              ))
            ) : (
              <Picker.Item
                key={0}
                label="Sin turnos para hoy"
                value={0}
              />
            )}
          </Picker>
          <ButtonSubmit
            isLoading={isLoadingReservation}
            onClick={handlerSubmit}
          ></ButtonSubmit>
        </>
      ) : (
        <Text>Loading</Text>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  textBtnCard: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  btnCard: {
    borderWidth: 2,
    borderColor: "#000",
    padding: 8,
    borderRadius: 4,
    width: "50%",
  },
  btnCardSelected: {
    borderWidth: 2,
    borderColor: "#000",
    padding: 8,
    borderRadius: 4,
    width: "50%",
    opacity: 0.5,
  },
  navBar: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
});
