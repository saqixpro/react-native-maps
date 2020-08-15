import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const App = (props) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [friends] = useState([
    {
      username: "bob",
      description: "school friend",
      icon: "dog",
      location: {
        longitude: "77.3",
        latitude: "32.5"
      }
    },
    {
      username: "Alex",
      description: "Childhood friend",
      icon: "dragon",
      location: {
        longitude: "78.3",
        latitude: "32.8"
      }
    },
    {
      username: "Jack",
      description: "Business Partner",
      icon: "dove",
      location: {
        longitude: "77.7",
        latitude: "32.1"
      }
    }
  ]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setMapRegion({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        longitudeDelta: 0.0922,
        latitudeDelta: 0.0421
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MapView
        initialRegion={mapRegion}
        mapType="terrain"
        style={styles.mapView}
      >
        {mapRegion ? (
          <Circle
            center={{
              longitude: mapRegion.longitude,
              latitude: mapRegion.latitude
            }}
            radius={1000}
            strokeColor="transparent"
            fillColor="rgba(255,0,0,0.3)"
          ></Circle>
        ) : null}
        {mapRegion ? (
          <Marker
            coordinate={{
              longitude: mapRegion.longitude,
              latitude: mapRegion.latitude
            }}
            title="Me"
            description="Myself"
          >
            <View style={styles.circle}>
              <View style={styles.core} />
              <View style={styles.stroke} />
            </View>
          </Marker>
        ) : null}

        {friends
          ? friends.map((friend) => (
              <Marker
                coordinate={friend.location}
                title={friend.username}
                description={friend.description}
              >
                <FontAwesome5
                  name={friend.icon}
                  size={26}
                  style={{ color: "red" }}
                />
              </Marker>
            ))
          : null}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width,
    height
  },
  mapView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width,
    height
  },
  circle: {
    width: 26,
    height: 26,
    borderRadius: 50
  },
  stroke: {
    backgroundColor: "#ffffff",
    borderRadius: 50,
    width: "100%",
    height: "100%",
    zIndex: 1
  },
  core: {
    backgroundColor: "red",
    width: 24,
    position: "absolute",
    top: 1,
    left: 1,
    right: 1,
    bottom: 1,
    height: 24,
    borderRadius: 50,
    zIndex: 2
  }
});

export default App;
