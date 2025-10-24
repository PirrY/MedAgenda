import { LoginDTO } from "../interfaces/login";
import { loginScheme } from "../schema/login";
import { loginService } from "../libs/authService";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";

export default function useLoginComponent() {
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

    return{
        register,
        handleSubmit,
        onSubmit,
        onErrors,
        errors
    }
}