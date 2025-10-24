import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterDTO } from "../interfaces/register";
import { RegisterScheme } from "../schema/register";
import { registerService } from "../libs/authService";

export default function useRegisterComponent() {
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

    return{
        register,
        handleSubmit,
        onSubmit,
        onErrors,
        error,
        success
    }
}