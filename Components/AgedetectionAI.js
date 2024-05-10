import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { encode as base64Encode } from "base-64";
import { useNavigation } from "@react-navigation/native";

export default function AgedetectionAI() {
  const [facing, setFacing] = useState("front"); // Assuming you want to start with the front camera
  const [permission, requestPermission] = useCameraPermissions();
  const navigation = useNavigation();
  const [humanResult, setHumanResult] = useState(null);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const handleHumanDetection = async () => {
    if (permission && permission.granted) {
      const photo = await cameraRef.current.takePictureAsync();

      const client_id = "cM1WeOtnhKqMJThjmCFRkBYI";
      const client_secret = "XXBIyvIkjw9E0PbXwMxdcu7l4aurI3ixrYQHVfPNeRaNiU4d";
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
        const age = parseInt(data.faces[0].age);
        setHumanResult(`L'âge détecté est : ${age}`);

        if (age > 18) {
          navigation.navigate("Search");
        } else {
          setHumanResult(`Vous ne pouvez pas accéder vu votre âge : ${age}`);
        }
      } else {
        setHumanResult("Aucun visage détecté");
      }
    }
  };

  const cameraRef = React.useRef(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleHumanDetection}
          >
            <Text style={styles.buttonText}>Detect Age</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.buttonText}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      {humanResult && (
        <View style={styles.resultContainer}>
          <Text>{humanResult}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  permissionButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  resultContainer: {
    position: "absolute",
    top: 20,
    alignItems: "center",
  },
});
