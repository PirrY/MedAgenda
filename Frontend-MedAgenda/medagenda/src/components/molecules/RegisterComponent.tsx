"use client";

import { useState } from "react";
import Input from "../atoms/Input";
import { apiFetch } from "../../libs/singletonFetch";
import {useForm, SubmitHandler} from "react-hook-form";
import { loginService, registerService } from "@/libs/authService";
import { RegisterDTO } from "@/interfaces/register";
import { zodResolver } from "@hookform/resolvers/zod"
import { RegisterScheme } from "@/schema/register";
import InputComponents from "../atoms/Input";
import Button from "../atoms/Button";

export default function RegisterComponent() {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const { 
        register, 
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterDTO>({
        resolver: zodResolver(RegisterScheme)
    })


    const onSubmit: SubmitHandler<RegisterDTO> = (data) => {
        registerService(data)
        .then(() => setSuccess("Registro exitoso. Ahora puedes iniciar sesión."))
        .catch(() => {
        console.error(setError('Error en solicitud'));
        })
    }

    const onErrors = () => {
    console.log('Errores', errors);
    
    alert('Informacion incompleta')
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit, onErrors)}
            className="space-y-4 max-h-[60vh] overflow-y-auto pr-2"
        >

            <InputComponents
                label="Name"
                typeElement="text"
                idElement="name"
                nameRegister="name"
                register={register}
            />

            <InputComponents
                label="Email"
                typeElement="text"
                idElement="email"
                nameRegister="email"
                register={register} />

            <InputComponents
                label="Password" 
                typeElement="password"
                idElement="password"
                nameRegister="password" 
                register={register}/>

            <p className="text-xs text-gray-600">
                By registering your details, you agree to our{" "}
                <a href="#" className="underline hover:text-black">
                    Terms & Conditions
                </a>{" "}
                and to join our loyalty programme
            </p>

            <div className="flex items-start space-x-2">
                <input type="checkbox" id="privacy" className="mt-1" />
                <label htmlFor="privacy" className="text-xs text-gray-600">
                    You accept and agree with our{" "}
                    <a href="#" className="underline hover:text-black">
                        Privacy and Cookie Policy
                    </a>
                    .
                </label>
            </div>

            <div className="flex items-start space-x-2">
                <input type="checkbox" id="newsletter" className="mt-1" />
                <label htmlFor="newsletter" className="text-xs text-gray-600">
                    Sign up and never miss out on exclusive member rewards,
                    tailored new arrivals and new launches. Unsubscribe at the
                    bottom of our emails.{" "}
                    <a href="#" className="underline hover:text-black">
                        Find out more
                    </a>
                </label>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            {/* Botón de registro */}
            <Button variant="primary">
                {"Register"}
            </Button>

            <div className="flex items-center justify-center my-2 text-gray-500">
                <span className="text-sm">OR</span>
            </div>

        </form>
    );
}
