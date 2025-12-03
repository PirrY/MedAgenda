import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { LoginDTO } from "../interfaces/login";
import { loginScheme } from "../schema/login";
import { loginService } from "../libs/authService";
import { useFormGuard } from "./useFormGuard";

type UseLoginOpts = { onSuccess?: () => void };

export default function useLoginComponent(opts?: UseLoginOpts) {
  const formGuard = useFormGuard(5000);
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
    // Check form guard
    if (!formGuard.startSubmission()) {
      return;
    }

    try {
      const info: any = await loginService(data);

      const token = info?.token as string | undefined;
      if (!token) throw new Error("Respuesta inválida del servidor");
      Cookies.set("token", token, { expires: 7 });

      const isDoctor = Boolean(info?.isDoctor);
      const isAdmin = Boolean(info?.isAdmin);

      if (isDoctor) Cookies.set("isDoctor", "true", { expires: 7 });
      else Cookies.remove("isDoctor");

      if (isAdmin) Cookies.set("isAdmin", "true", { expires: 7 });
      else Cookies.remove("isAdmin");

      // Lógica de redirección mejorada:
      // - Admin (con o sin doctor explícito) -> Dashboard Admin (admin = doctor con privilegios)
      // - Solo Doctor -> Dashboard Doctor
      // - Ninguno -> Dashboard Paciente
      let destination = "/homePatient";

      if (isAdmin) {
        destination = "/homeAdmin";
      } else if (isDoctor) {
        destination = "/homeDoctor";
      }

      router.push(destination);
      opts?.onSuccess?.();
    } catch (e) {
      formGuard.endSubmission();
    }
  };

  const onErrors = () => {
    // opcional: feedback de validación
    formGuard.endSubmission();
  };

  return { register, handleSubmit, onSubmit, onErrors, errors, isSubmitting: formGuard.isSubmitting };
}
