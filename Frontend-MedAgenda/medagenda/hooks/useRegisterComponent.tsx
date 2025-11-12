import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterDTO } from "../interfaces/register";
import { RegisterSchema } from "../schema/register";
import { registerService } from "../libs/authService";

export default function useRegisterComponent() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDTO>({
    resolver: zodResolver(RegisterSchema),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<RegisterDTO> = async (data) => {
    setError("");
    setSuccess("");
    setIsSubmitting(true);
    try {
      const resp = await registerService(data);
      // Si tu service retorna algo tipo fetch Response:
      if (resp?.ok === false) throw new Error(resp?.message || "Error en la solicitud");
      setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
      setError(""); // por si quedó algo residual
    } catch (e: any) {
      setSuccess("");
      setError(e?.message || "Error en la solicitud");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onErrors = () => {
    // validación del form falló antes de llamar al service
    setError("Información incompleta");
    setSuccess("");
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    onErrors,
    error,
    success,
    errors,
    isSubmitting,
  };
}
