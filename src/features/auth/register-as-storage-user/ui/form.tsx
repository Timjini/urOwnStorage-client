import { Theme } from "@/constants/theme";
import { IAuth } from "@/entities/auth/models/auth";
import { AuthFormData, authSchema } from "@/entities/auth/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../shared/hook";

const lightBorder = "#ECEDEE";

export function AuthForm() {
  const { createAccount } = useAuth();
  const { mutate, isPending, isError, error } = createAccount;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      // phone: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = (data: AuthFormData) => {
    console.log("Form successfully validated! Data:", data);

    const payload: IAuth = {
      user: {
        email: data.email,
        password: data.password,
      },
    };
    mutate(payload);
  };

  const onInvalid = (formErrors: any) => {
    console.log("Validation Failed! Missing or invalid fields:", formErrors);
    Alert.alert("Validation Failed! Missing or invalid fields");
  };

  return (
    <View style={styles.formContainer}>
      <View style={{ flex: 1 }}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="john@email.com"
                autoCapitalize="none"
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="*******"
                secureTextEntry={true}
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Verify Password</Text>
          <Controller
            control={control}
            name="passwordConfirmation"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  errors.passwordConfirmation && styles.inputError,
                ]}
                placeholder="*******"
                secureTextEntry={true}
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.passwordConfirmation && (
            <Text style={styles.errorText}>
              {errors.passwordConfirmation.message}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={[styles.confirmButton, isPending && styles.disabledButton]}
          disabled={isPending}
          onPress={handleSubmit(onSubmit, onInvalid)}
        >
          {isPending ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.confirmButtonText}>Sign up</Text>
          )}
        </TouchableOpacity>
      </View>

      {isError && (
        <Text
          style={[styles.errorText, { marginTop: 15, textAlign: "center" }]}
        >
          {error instanceof Error ? error.message : "Something went wrong!"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: { width: "100%", paddingHorizontal: 4 },
  inputGroup: { marginBottom: 20 },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#151718",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  input: {
    height: 55,
    backgroundColor: "#F5F7F9",
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: lightBorder,
    fontSize: 15,
  },
  inputError: { borderColor: "#E53E3E", backgroundColor: "#FFF5F5" },
  errorText: {
    color: "#E53E3E",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
  },
  confirmButton: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 12,
    minWidth: 150,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: { backgroundColor: "#A0D1E1" },
  confirmButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
