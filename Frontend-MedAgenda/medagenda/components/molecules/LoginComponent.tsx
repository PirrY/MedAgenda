"use client";
import InputComponents from "../atoms/Input";
import Button from "../atoms/Button";
import useLoginComponent from "../../hooks/useLoginComponent";

type Props = { onSuccess?: () => void };

export default function LoginComponent({ onSuccess }: Props) {
  const { register, handleSubmit, onSubmit, onErrors, errors, isSubmitting } =
    useLoginComponent({ onSuccess });

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
      {errors?.email && (
        <p className="text-xs text-red-500">{errors.email.message as string}</p>
      )}

      <InputComponents
        label="Contraseña"
        typeElement="password"
        idElement="password"
        nameRegister="password"
        register={register}
      />
      {errors?.password && (
        <p className="text-xs text-red-500">{errors.password.message as string}</p>
      )}

      <a
        href="#"
        className="text-xs text-[#4682B4] hover:text-[#259487] underline block"
      >
        ¿Olvidaste tu contraseña?
      </a>

      <Button variant="primary" className="mb-4" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Ingresando..." : "Ingresar"}
      </Button>
    </form>
  );
}
