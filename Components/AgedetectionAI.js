import React, { useEffect, useState, useRef } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Camera } from "expo-camera";
import { encode as base64Encode } from "base-64";
import { useNavigation } from "@react-navigation/native"; // Import de useNavigation

const HumanPage = () => {
  const navigation = useNavigation(); // Utilisation de useNavigation
  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front);
  const [humanResult, setHumanResult] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
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
    if (cameraRef.current) {
      try {
        let photo = await cameraRef.current.takePictureAsync();

        const client_id = "cM1WeOtnhKqMJThjmCFRkBYI";
        const client_secret =
          "XXBIyvIkjw9E0PbXwMxdcu7l4aurI3ixrYQHVfPNeRaNiU4d";
        const base64Credentials = base64Encode(`${client_id}:${client_secret}`);

        const formData = new FormData();
        formData.append("data", {
          uri: photo.uri,
          name: "photo.jpg",
          type: "image/jpg",
        });

        const response = await fetch("https://api.everypixel.com/v1/faces", {
          method: "POST",
          headers: {
            Authorization: `Basic ${base64Credentials}`,
          },
          body: formData,
        });

        const data = await response.json();

        if (data.faces && data.faces.length > 0) {
          const age = parseInt(data.faces[0].age); // Convertir l'âge en entier
          setHumanResult(`L'âge détecté est : ${age}`);

          // Vérification de l'âge et navigation
          if (age > 18) {
            navigation.navigate("Search"); // Naviguer vers la page Search
          } else {
            setHumanResult(`Vous ne pouvez pas accedez vu votre age : ${age}`);
          }
        } else {
          setHumanResult("Aucun visage détecté");
        }
      } catch (error) {
        console.error("Erreur lors de la détection humaine:", error);
        setHumanResult("Erreur lors de la détection humaine");
      }
    }
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
            ref={cameraRef}
            onCameraReady={() => Alert.alert("Caméra prête")}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.detectButton}
              onPress={handleHumanDetection}
            >
              <Text style={styles.detectButtonText}>Détecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {humanResult && (
        <View style={styles.resultContainer}>
          <Text>{humanResult}</Text>
        </View>
      )}
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
    aspectRatio: 4 / 3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
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
    marginTop: 20,
    alignItems: "center",
  },
});

export default HumanPage;
