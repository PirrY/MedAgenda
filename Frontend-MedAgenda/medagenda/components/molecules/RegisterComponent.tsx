"use client";
import InputComponents from "../atoms/Input";
import useRegisterComponent from "../../hooks/useRegisterComponent";
import Button from "../atoms/Button";

export default function RegisterComponent() {
  const{register, handleSubmit, onSubmit, onErrors, error, success} = useRegisterComponent();

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

      <Button variant="primary" className="mb-4">Registrarme</Button>

    </form>
  );
}
