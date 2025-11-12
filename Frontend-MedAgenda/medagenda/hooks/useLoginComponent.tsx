import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

import { LoginDTO } from "../interfaces/login";
import { loginScheme } from "../schema/login";
import { loginService } from "../libs/authService";

type UseLoginOpts = { onSuccess?: () => void };

export default function useLoginComponent(opts?: UseLoginOpts) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginScheme),
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<LoginDTO> = async (data) => {
    setIsSubmitting(true);
    try {
      const info: any = await loginService(data);
      const token = info?.token as string | undefined;
      if (!token) throw new Error("Respuesta inválida del servidor");
      Cookies.set("token", token, { expires: 7 });
      opts?.onSuccess?.(); // cierra el modal desde el padre
    } catch (e) {
      console.error("Error en solicitud", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onErrors = () => {
    // opcional: feedback de validación
  };

  return { register, handleSubmit, onSubmit, onErrors, errors, isSubmitting };
}
