import { Text, TextInput } from 'react-native';

export default function Input({
  name, value, setValue, 
  autoCapitalize = "none", autoCorrect = false,
  secureTextEntry = false,
  multiline = false,
  keyboardType = "default",
  color = "#fff"
}){
  return (
    <>
      <Text style={{ color: color }}>{name}</Text>
        <TextInput
          value={value}
          onChangeText={(text) => setValue(text)}
          autoCorrect={autoCorrect}
          autoCapitalize={autoCapitalize}
          secureTextEntry={secureTextEntry}
          multiline={multiline}
          keyboardType={keyboardType}
          style={{
            borderBottomWidth: 0.5,
            height: 48,
            borderBottomColor: "#8e93a1",
            marginBottom: 30,
            color: color,
          }}
        />
    </>
  )
}