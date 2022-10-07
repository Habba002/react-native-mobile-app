import { Text, TouchableOpacity } from "react-native";

export default function Button({ title, loading, handleSubmit, backgroundColor="#433362" }) {
  return (
    <TouchableOpacity
      onPress={handleSubmit}
      style={{
        backgroundColor: backgroundColor,
        height: 50,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 24,
      }}
    >
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {loading ? "..." : title}
      </Text>
    </TouchableOpacity>
  );
}
