import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { LoginDTO } from "../interfaces/login";
import { loginScheme } from "../schema/login";
import { loginService } from "../libs/authService";

type UseLoginOpts = { onSuccess?: () => void };

export default function useLoginComponent(opts?: UseLoginOpts) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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
      console.log("Respuesta COMPLETA del login:", JSON.stringify(info, null, 2));

      const token = info?.token as string | undefined;
      if (!token) throw new Error("Respuesta inválida del servidor");
      Cookies.set("token", token, { expires: 7 });

      // Decodificar el token para ver si tiene la info del rol
      try {
        const tokenParts = token.split('.');
        if (tokenParts.length === 3) {
          const payload = JSON.parse(atob(tokenParts[1]));
          console.log("Payload del JWT:", payload);
        }
      } catch (e) {
        console.error("Error decodificando token:", e);
      }

      const isDoctor = Boolean(info?.isDoctor);
      const isAdmin = Boolean(info?.isAdmin);

      console.log("isDoctor:", isDoctor, "info.isDoctor:", info?.isDoctor);
      console.log("isAdmin:", isAdmin, "info.isAdmin:", info?.isAdmin);

      if (isDoctor) Cookies.set("isDoctor", "true", { expires: 7 });
      else Cookies.remove("isDoctor");

      if (isAdmin) Cookies.set("isAdmin", "true", { expires: 7 });
      else Cookies.remove("isAdmin");

      const destination = isAdmin ? "/homeAdmin" : isDoctor ? "/homeDoctor" : "/homePatient";
      console.log("Redirigiendo a:", destination);
      router.push(destination);
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
