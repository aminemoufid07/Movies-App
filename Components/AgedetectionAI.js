import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Camera } from "expo-camera"; // Import de la bibliothèque pour accéder à la caméra sur les appareils mobiles

const HumanPage = () => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front); // Choisir le type de caméra (frontale ou arrière)
  const [humanResult, setHumanResult] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync(); // Demander la permission d'accès à la caméra
      setCameraPermission(status === "granted");
    })();
  }, []);

  const toggleCameraType = () => {
    setCameraType(
      cameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const handleHumanDetection = async () => {
    // Fonction pour détecter les objets, les visages, les corps, les mains et les gestes
    // Utilisez les fonctions de la bibliothèque appropriée pour effectuer la détection
    // Mettez à jour l'état humanResult avec les résultats de détection
  };

  return (
    <View style={styles.container}>
      {cameraPermission === null ? (
        <Text>Demande de permission de la caméra...</Text>
      ) : cameraPermission === false ? (
        <Text>La permission de la caméra a été refusée</Text>
      ) : (
        <View style={styles.cameraContainer}>
          <Camera
            style={styles.camera}
            type={cameraType}
            onCameraReady={() => Alert.alert("Caméra prête")}
          />
          <View style={styles.buttonContainer}>
            <Button title="Changer de caméra" onPress={toggleCameraType} />
            <TouchableOpacity
              style={styles.detectButton}
              onPress={handleHumanDetection}
            >
              <Text style={styles.detectButtonText}>Détecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {/* <ScrollView style={styles.resultContainer}>
        {humanResult && (
          // Afficher les résultats de détection
          // Utilisez les composants appropriés pour afficher les résultats
        )}
      </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  cameraContainer: {
    flex: 1,
    width: "100%",
    aspectRatio: 4 / 3, // Aspect ratio standard de la caméra
    justifyContent: "flex-end",
    alignItems: "center",
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  detectButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  detectButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  resultContainer: {
    flex: 1,
    width: "100%",
  },
});

export default HumanPage;
