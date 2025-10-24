"use client";
import InputComponents from "../atoms/Input";
import Button from "../atoms/Button";
import useLoginComponent from "../../hooks/useLoginComponent";

export default function LoginComponent() {
  const{register, handleSubmit, onSubmit, onErrors, errors} = useLoginComponent();

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
