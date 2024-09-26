import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
    onClick: (event: any) => void;
    isLoading: boolean;
};

export const ButtonSubmit = ( { onClick, isLoading }: Props) => {
  return (
    <TouchableOpacity style={styles.btnCard} activeOpacity={0.7} onPress={onClick}>
      {isLoading ? <Text style={styles.textBtnCard}>Guardando...</Text> : <Text style={styles.textBtnCard}>Guardar</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    btnCard:{
      borderWidth: 1.3,
      borderColor: '#00b806',
      padding: 8,
      borderRadius: 4,
      width: '50%',
      backgroundColor: '#00b806',
    },
    textBtnCard:{
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#fff',
    }
  });