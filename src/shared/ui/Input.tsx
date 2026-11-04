import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

interface InputProps {
  label:           string;
  value:           string;
  onChangeText:    (t: string) => void;
  placeholder?:    string;
  secureTextEntry?: boolean;
  keyboardType?:   "default" | "email-address" | "numeric";
  error?:          string;
  autoCapitalize?: "none" | "sentences" | "words";
}

export const Input = ({
  label, value, onChangeText, placeholder,
  secureTextEntry, keyboardType = "default", error,
  autoCapitalize = "none",
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          secureTextEntry={Boolean(secureTextEntry) && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          style={[
            styles.input,
            secureTextEntry ? styles.inputWithToggle : null,
            error ? styles.inputError : null,
          ]}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            style={styles.eyeButton}
            activeOpacity={0.7}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.eyeIcon}>
              {isPasswordVisible ? "🙈" : "👁️"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper:         { gap: 6 },
  label:           { fontSize: 14, fontWeight: "500", color: "#334155" },
  inputContainer:  { position: "relative", justifyContent: "center" },
  input:           { borderWidth: 1.5, borderColor: "#CBD5E1", borderRadius: 10,
                     paddingHorizontal: 16, paddingVertical: 13, fontSize: 15,
                     color: "#0F172A", backgroundColor: "#F8FAFC" },
  inputWithToggle: { paddingRight: 48 },
  eyeButton:       { position: "absolute", right: 14, height: "100%",
                     justifyContent: "center", alignItems: "center" },
  eyeIcon:         { fontSize: 18 },
  inputError:      { borderColor: "#DC2626" },
  error:           { fontSize: 12, color: "#DC2626" },
});
