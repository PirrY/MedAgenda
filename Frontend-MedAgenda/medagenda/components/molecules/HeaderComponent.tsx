'use client'
import { useEffect, useState } from 'react'
import { Dialog, DialogPanel, Popover, PopoverButton, PopoverPanel, PopoverGroup } from '@headlessui/react'
import { Activity } from "lucide-react";
import {
  ChevronDownIcon,
  CalendarIcon,
  HeartIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  BuildingOffice2Icon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import AuthModal from '../organisms/AuthModal'

const navigation = [
  { name: 'Clínicas', href: '/Clinics' },
  { name: 'Nosotros', href: '/us' },
]

export default function HeaderComponent() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [hasToken, setHasToken] = useState(false)
  const [isDoctor, setIsDoctor] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const router = useRouter()

  const openAuthModal = () => setIsAuthModalOpen(true)
  const closeAuthModal = () => setIsAuthModalOpen(false)

  // Leer cookies al montar
  useEffect(() => {
    setHasToken(Boolean(Cookies.get('token')))
    setIsDoctor(Cookies.get('isDoctor') === 'true')
    setIsAdmin(Cookies.get('isAdmin') === 'true')
  }, [])

  // Callback al éxito: marcar sesión iniciada, actualizar roles y cerrar modal
  const handleAuthSuccess = () => {
    setHasToken(true)
    setIsDoctor(Cookies.get('isDoctor') === 'true')
    setIsAdmin(Cookies.get('isAdmin') === 'true')
    closeAuthModal()
  }

  // Función para cerrar sesión
  const handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('isDoctor')
    Cookies.remove('isAdmin')
    setHasToken(false)
    setIsDoctor(false)
    setIsAdmin(false)
    router.push('/')
  }

  return (
    <header className="bg-[#4682B4] border-b-4 border-[#566794]">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">MedAgenda</span>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#259487] to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MedAgenda</span>
            </div>
          </a>
        </div>

        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-white hover:text-blue-300 transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}

          {/* Link para crear clínica - solo para usuarios autenticados */}
          {hasToken && (
            <a
              href="/create-clinic"
              className="flex items-center gap-x-2 text-sm/6 font-semibold text-white hover:text-blue-300 transition-colors duration-200"
            >
              <PlusCircleIcon className="h-5 w-5" />
              Crear Clínica
            </a>
          )}
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {!hasToken ? (
            <button
              onClick={openAuthModal}
              className="text-sm/6 font-semibold text-white hover:text-blue-300 transition-colors duration-200"
            >
              Iniciar sesión <span aria-hidden="true">&rarr;</span>
            </button>
          ) : (
            <Popover className="relative">
              <PopoverButton className="p-1 rounded-full hover:bg-white/10 transition-colors duration-200 focus:outline-none">
                <UserCircleIcon className="h-7 w-7 text-white" />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute right-0 top-full z-10 mt-3 w-64 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="p-2">
                  {/* Dashboard Administración - Solo para admins */}
                  {isAdmin && (
                    <button
                      onClick={() => router.push('/homeAdmin')}
                      className="w-full flex items-center gap-x-3 rounded-lg p-3 text-sm text-left hover:bg-blue-50 transition-colors duration-200"
                    >
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-blue-100">
                        <BuildingOffice2Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-auto">
                        <p className="font-semibold text-gray-900">Dashboard Administración</p>
                        <p className="text-xs text-gray-500">Gestión de clínica</p>
                      </div>
                    </button>
                  )}

                  {/* Dashboard Doctores - Para doctores o admins (admin = doctor con privilegios) */}
                  {(isDoctor || isAdmin) && (
                    <button
                      onClick={() => router.push('/homeDoctor')}
                      className="w-full flex items-center gap-x-3 rounded-lg p-3 text-sm text-left hover:bg-green-50 transition-colors duration-200"
                    >
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-green-100">
                        <HeartIcon className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-auto">
                        <p className="font-semibold text-gray-900">Dashboard Doctores</p>
                        <p className="text-xs text-gray-500">Citas y pacientes</p>
                      </div>
                    </button>
                  )}

                  {/* Dashboard Paciente - Para todos */}
                  <button
                    onClick={() => router.push('/homePatient')}
                    className="w-full flex items-center gap-x-3 rounded-lg p-3 text-sm text-left hover:bg-purple-50 transition-colors duration-200"
                  >
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-purple-100">
                      <HomeIcon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-auto">
                      <p className="font-semibold text-gray-900">Dashboard</p>
                      <p className="text-xs text-gray-500">Mis citas y servicios</p>
                    </div>
                  </button>

                  {/* Divider */}
                  <div className="my-2 h-px bg-gray-200"></div>

                  {/* Crear Clínica - Para usuarios autenticados */}
                  <button
                    onClick={() => router.push('/create-clinic')}
                    className="w-full flex items-center gap-x-3 rounded-lg p-3 text-sm text-left hover:bg-teal-50 transition-colors duration-200"
                  >
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-teal-100">
                      <PlusCircleIcon className="h-6 w-6 text-teal-600" />
                    </div>
                    <div className="flex-auto">
                      <p className="font-semibold text-gray-900">Crear Clínica</p>
                      <p className="text-xs text-gray-500">Registra tu clínica</p>
                    </div>
                  </button>

                  {/* Divider */}
                  <div className="my-2 h-px bg-gray-200"></div>

                  {/* Mi Perfil */}
                  <button
                    onClick={() => router.push('/profile')}
                    className="w-full flex items-center gap-x-3 rounded-lg p-3 text-sm text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-gray-100">
                      <UserCircleIcon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-auto">
                      <p className="font-semibold text-gray-900">Mi Perfil</p>
                      <p className="text-xs text-gray-500">Ver y editar información</p>
                    </div>
                  </button>

                  {/* Divider */}
                  <div className="my-2 h-px bg-gray-200"></div>

                  {/* Cerrar Sesión */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-x-3 rounded-lg p-3 text-sm text-left hover:bg-red-50 transition-colors duration-200"
                  >
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-red-100">
                      <ArrowRightOnRectangleIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-auto">
                      <p className="font-semibold text-red-600">Cerrar Sesión</p>
                      <p className="text-xs text-gray-500">Salir de tu cuenta</p>
                    </div>
                  </button>
                </div>
              </PopoverPanel>
            </Popover>
          )}
        </div>
      </nav>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        onSuccess={handleAuthSuccess}
      />
    </header>
  )
}
