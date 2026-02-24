import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function App() {
  const [segundos, setSegundos] = useState(10);
  const [activo, setActivo] = useState(false);
  const [fase, setFase] = useState("TRABAJO");

  // Función de audio nativa de la web para evitar errores de Expo en CodeSandbox
  const sonar = (tipo) => {
    const url =
      tipo === "corto"
        ? "https://actions.google.com/sounds/v1/alarms/beep_short.ogg"
        : "https://actions.google.com/sounds/v1/alarms/alarm_clock_beep.ogg";
    const audio = new Audio(url);
    audio
      .play()
      .catch((e) => console.log("Esperando interacción del usuario..."));
  };

  useEffect(() => {
    let intervalo = null;
    if (activo && segundos > 0) {
      intervalo = setInterval(() => {
        setSegundos((s) => s - 1);
        // Pitidos de advertencia
        if (segundos <= 4 && segundos > 1) sonar("corto");
      }, 1000);
    } else if (segundos === 0 && activo) {
      sonar("largo");
      // Lógica de cambio de fase
      if (fase === "TRABAJO") {
        setFase("DESCANSO");
        setSegundos(5);
      } else {
        setFase("TRABAJO");
        setSegundos(10);
      }
    }
    return () => clearInterval(intervalo);
  }, [activo, segundos, fase]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: fase === "TRABAJO" ? "#2ecc71" : "#e74c3c" },
      ]}
    >
      <Text style={styles.faseLabel}>{fase}</Text>
      <Text style={styles.timerText}>{segundos}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setActivo(!activo)}
      >
        <Text style={styles.buttonText}>{activo ? "PAUSAR" : "INICIAR"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  faseLabel: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginBottom: 10,
  },
  timerText: { fontSize: 120, color: "white", fontWeight: "bold" },
  button: {
    backgroundColor: "white",
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 40,
  },
  buttonText: { color: "black", fontSize: 20, fontWeight: "bold" },
});
