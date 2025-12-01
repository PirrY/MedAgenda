"use client";
import InputComponents from "../atoms/Input";
import useRegisterComponent from "../../hooks/useRegisterComponent";
import Button from "../atoms/Button";

type Props = {
  onSuccess?: () => void;
};

export default function RegisterComponent({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    onSubmit,
    onErrors,
    error,
    success,
    errors,
    isSubmitting,
  } = useRegisterComponent({ onSuccess });

  const feedback = error || success;

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onErrors)}
      className="space-y-5 max-h-[60vh] overflow-y-auto pr-1"
    >
      <InputComponents label="Nombre" typeElement="text" idElement="first_name" nameRegister="first_name" register={register} />
      {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name.message as string}</p>}

      <InputComponents label="Segundo nombre (opcional)" typeElement="text" idElement="second_name" nameRegister="second_name" register={register} />
      {errors.second_name && <p className="text-red-500 text-xs">{errors.second_name.message as string}</p>}

      <InputComponents label="Primer apellido" typeElement="text" idElement="first_last_name" nameRegister="first_last_name" register={register} />
      {errors.first_last_name && <p className="text-red-500 text-xs">{errors.first_last_name.message as string}</p>}

      <InputComponents label="Segundo apellido" typeElement="text" idElement="second_last_name" nameRegister="second_last_name" register={register} />
      {errors.second_last_name && <p className="text-red-500 text-xs">{errors.second_last_name.message as string}</p>}

      <InputComponents label="Documento" typeElement="text" idElement="legal_id" nameRegister="legal_id" register={register} />
      {errors.legal_id && <p className="text-red-500 text-xs">{errors.legal_id.message as string}</p>}

      <InputComponents label="Teléfono" typeElement="text" idElement="user_phone_number" nameRegister="user_phone_number" register={register} />
      {errors.user_phone_number && <p className="text-red-500 text-xs">{errors.user_phone_number.message as string}</p>}

      <InputComponents label="Correo electrónico" typeElement="text" idElement="user_email_address" nameRegister="user_email_address" register={register} />
      {errors.user_email_address && <p className="text-red-500 text-xs">{errors.user_email_address.message as string}</p>}

      <InputComponents label="Contraseña" typeElement="password" idElement="password" nameRegister="password" register={register} />
      {errors.password && <p className="text-red-500 text-xs">{errors.password.message as string}</p>}

      <p className="text-xs text-gray-600">
        Al registrarte aceptas nuestros{" "}
        <a href="#" className="underline hover:text-[#259487]">Términos y Condiciones</a>{" "}
        y nuestra{" "}
        <a href="#" className="underline hover:text-[#259487]">Política de Privacidad</a>.
      </p>

      <div className="flex items-start space-x-2">
        <input type="checkbox" id="privacy" className="mt-1" />
        <label htmlFor="privacy" className="text-xs text-gray-600">Acepto la política de privacidad.</label>
      </div>

      <div className="flex items-start space-x-2">
        <input type="checkbox" id="newsletter" className="mt-1" />
        <label htmlFor="newsletter" className="text-xs text-gray-600">Deseo recibir novedades y beneficios exclusivos.</label>
      </div>

      {feedback && (
        <p className={`text-sm ${error ? "text-red-500" : "text-green-500"}`}>{feedback}</p>
      )}

      <Button variant="primary" className="mb-4" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Enviando..." : "Registrarme"}
      </Button>
    </form>
  );
}
