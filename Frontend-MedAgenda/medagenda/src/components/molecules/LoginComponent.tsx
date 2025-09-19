"use client";
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import InputComponents from "../atoms/Input"

import { LoginDTO } from "@/interfaces/login"
import { loginScheme } from "@/schema/login"

import { loginService } from "@/libs/authService"
import Cookies from "js-cookie"
import Button from "../atoms/Button";


export default function LoginComponent() {

  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm<LoginDTO>({
    resolver: zodResolver(loginScheme)
  })

  const onSubmit: SubmitHandler<LoginDTO> = (data) => {
    loginService(data)
    .then((info) => 
    Cookies.set('token', info.token,
      { expires: 7 }
    ))
    .catch(() => {
      console.error('Error en solicitud');
    })
  }

  const onErrors = () => {
    console.log('Errores', errors);
    
    alert('Informacion incompleta')
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit, onErrors)}
      className="space-y-4 max-h-80 overflow-y-auto p-4"
    >
      <InputComponents
        label="Email address"
        typeElement="text"
        idElement="email"
        nameRegister="email"
        register={register}
      />

      <InputComponents
        label="Password"
        typeElement="password"
        idElement="password"
        nameRegister="password"
        register={register}
      />

      <a
        href="#"
        className="text-sm text-black-600 hover:underline block"
      >
        Forgot your password?
      </a>

      <Button variant="primary" >
        Sign in
      </Button>

      <Button variant="secondary">
        Continue With One-Time Code
      </Button>

      <div className="flex items-center justify-center my-2 text-gray-500">
        <span>OR</span>
      </div>

    </form>
  );
}
