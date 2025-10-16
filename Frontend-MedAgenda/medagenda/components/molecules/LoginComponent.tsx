"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponents from "../atoms/Input";
import { LoginDTO } from "../../interfaces/login";
import { loginScheme } from "../../schema/login";
import { loginService } from "../../libs/authService";
import Cookies from "js-cookie";
import Button from "../atoms/Button";

export default function LoginComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginScheme),
  });

  const onSubmit: SubmitHandler<LoginDTO> = (data) => {
    loginService(data)
      .then((info) =>
        Cookies.set("token", info.token, {
          expires: 7,
        })
      )
      .catch(() => {
        console.error("Error en solicitud");
      });
  };

  const onErrors = () => {
    alert("Información incompleta");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onErrors)}
      className="space-y-5 max-h-[60vh] overflow-y-auto pr-1"
    >
      <InputComponents
        label="Correo electrónico"
        typeElement="text"
        idElement="email"
        nameRegister="email"
        register={register}
      />

      <InputComponents
        label="Contraseña"
        typeElement="password"
        idElement="password"
        nameRegister="password"
        register={register}
      />

      <a
        href="#"
        className="text-xs text-[#4682B4] hover:text-[#259487] underline block"
      >
        ¿Olvidaste tu contraseña?
      </a>

      <Button variant="primary" className="mb-4">Ingresar</Button>

    </form>
  );
}
