import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";

type PostData = {
  id?: number;
  name: string;
  email: string;
};

// Fetch data from the API with React Query
const fetchData = async (): Promise<PostData> => {
  const response = await api.get("/hello");
  return response.data;
};

// Post data to the API with React Query
const postData = async (data: PostData) => {
  const response = await api.post("/addUser", data);
  return response.data;
};

export default function HomeScreen() {
  const [data, setData] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await api.get("/hello");
  //       console.log(response.data);
  //       setData(response.data);
  //     } catch (err) {
  //       setError("Failed to fetch data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // fetch data with react query
  const {
    data: fetchedData,
    isLoading,
    isError,
    error: queryError,
  } = useQuery({ queryKey: ["data"], queryFn: fetchData });

  console.log("fetched data", fetchedData);

  const handleChange = (field: "name" | "email", value: string) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async () => {
    const dataToSend = {
      name: data.name,
      email: data.email,
    };
    if (!data.name || !data.email) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const response = await api.post("/addUser", dataToSend);
      if (response?.data?.success) {
        setSuccessMessage(response.data?.success);
      } else {
        setErrorMessage(response.data?.error);
      }

      console.log(response.data);
      // Handle successful submission (e.g., show success message, clear form)
    } catch (err) {
      setError("Failed to submit user data");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20 }}>Enter your name:</Text>
        <TextInput
          value={data.name}
          onChangeText={(text) => handleChange("name", text)}
          style={{ borderWidth: 1, padding: 10, width: 200 }}
        />
        <Text style={{ fontSize: 20 }}>Enter your email:</Text>
        <TextInput
          value={data.email}
          onChangeText={(text) => handleChange("email", text)}
          style={{ borderWidth: 1, padding: 10, width: 200 }}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={{ fontSize: 20 }}>Submit</Text>
        </TouchableOpacity>
      </View>
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
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
  },
});
