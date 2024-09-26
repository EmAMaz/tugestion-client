import { TurnoValues } from "@/constants/AllTypes";
import { Image } from "expo-image";
import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native-reanimated/lib/typescript/Animated";
import twrnc from "twrnc";

type Props = {
  item: TurnoValues;
  onPressDelete: () => void;
};

export default function CardTurno({ item, onPressDelete }: Props) {
  const [showDeleteOption, setShowDeleteOption] = useState(false);
  const [fechaActual, setFechaActual] = useState(
    moment().format().split("T")[0]
  );
  const [fechaManana, setFechaManana] = useState(
    moment().add(1, "days").format().split("T")[0]
  );
  const [showModal, setShowModal] = useState(false);

  return (
    <Text>HOlis</Text>
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
  },
  modalButtonText: {
    color: "#000",
    fontSize: 16,
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE",
  },
});
