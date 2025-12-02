import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { RegisterDTO } from "../interfaces/register";
import { RegisterSchema } from "../schema/register";
import { registerService, loginService } from "../libs/authService";

type UseRegisterOpts = { onSuccess?: () => void };

export default function useRegisterComponent(opts?: UseRegisterOpts) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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
      setSuccess("Registro exitoso. Iniciando sesión...");

      // Hacer login automático
      const loginData = {
        email: data.user_email_address,
        password: data.password
      };

      const info: any = await loginService(loginData);
      const token = info?.token as string | undefined;
      if (!token) throw new Error("Error al iniciar sesión automáticamente");

      Cookies.set("token", token, { expires: 7 });

      const isDoctor = Boolean(info?.isDoctor);
      const isAdmin = Boolean(info?.isAdmin);

      if (isDoctor) Cookies.set("isDoctor", "true", { expires: 7 });
      else Cookies.remove("isDoctor");

      if (isAdmin) Cookies.set("isAdmin", "true", { expires: 7 });
      else Cookies.remove("isAdmin");

      const destination = isAdmin ? "/homeAdmin" : isDoctor ? "/homeDoctor" : "/homePatient";
      router.push(destination);
      opts?.onSuccess?.(); // cierra el modal desde el padre

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
