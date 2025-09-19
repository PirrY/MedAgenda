"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterDTO } from "@/interfaces/register";
import { RegisterScheme } from "@/schema/register";
import { registerService } from "@/libs/authService";
import InputComponents from "../atoms/Input";
import Button from "../atoms/Button";

export default function RegisterComponent() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDTO>({
    resolver: zodResolver(RegisterScheme),
  });

  const onSubmit: SubmitHandler<RegisterDTO> = (data) => {
    registerService(data)
      .then(() => setSuccess("Registro exitoso. Ahora puedes iniciar sesión."))
      .catch(() => {
        setError("Error en la solicitud");
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
        label="Nombre"
        typeElement="text"
        idElement="name"
        nameRegister="name"
        register={register}
      />

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

      <p className="text-xs text-gray-600">
        Al registrarte aceptas nuestros{" "}
        <a href="#" className="underline hover:text-[#259487]">
          Términos y Condiciones
        </a>{" "}
        y nuestra{" "}
        <a href="#" className="underline hover:text-[#259487]">
          Política de Privacidad
        </a>
        .
      </p>

      <div className="flex items-start space-x-2">
        <input type="checkbox" id="privacy" className="mt-1" />
        <label htmlFor="privacy" className="text-xs text-gray-600">
          Acepto la política de privacidad.
        </label>
      </div>

      <div className="flex items-start space-x-2">
        <input type="checkbox" id="newsletter" className="mt-1" />
        <label htmlFor="newsletter" className="text-xs text-gray-600">
          Deseo recibir novedades y beneficios exclusivos.
        </label>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{success}</p>}

      <Button variant="primary">Registrarme</Button>

      <div className="flex items-center justify-center my-2">
        <span className="text-gray-400 text-sm">O</span>
      </div>
    </form>
  );
}
