'use client'
import { useEffect, useState } from 'react'
import { Dialog, DialogPanel, Popover, PopoverButton, PopoverPanel, PopoverGroup } from '@headlessui/react'
import { Activity } from "lucide-react";
import {
  ChevronDownIcon,
  CalendarIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  CogIcon,
  ClockIcon,
  HeartIcon,
  UserCircleIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import AuthModal from '../organisms/AuthModal'

// Servicios médicos para el dropdown
const medicalServices = [
  { name: 'Consulta General', description: 'Atención médica primaria y diagnósticos', href: '#consulta-general', icon: HeartIcon },
  { name: 'Especialidades', description: 'Conecta con médicos especialistas', href: '/Specialties', icon: UserGroupIcon },
  { name: 'Telemedicina', description: 'Consultas médicas virtuales 24/7', href: '#telemedicina', icon: ClockIcon },
  { name: 'Historial Médico', description: 'Acceso seguro a tu información médica', href: '#historial', icon: ShieldCheckIcon },
  { name: 'Citas Online', description: 'Agenda y gestiona tus citas fácilmente', href: '#citas', icon: CalendarIcon },
  { name: 'Integración Clínicas', description: 'Conecta con hospitales y clínicas', href: '#integracion', icon: CogIcon },
]

const navigation = [
  { name: 'Clínicas', href: '/Clinics' },
  { name: 'Seguros', href: '#seguros' },
  { name: 'Nosotros', href: '/us' },
]

export default function HeaderComponent() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [hasToken, setHasToken] = useState(false)
  const router = useRouter()

  const openAuthModal = () => setIsAuthModalOpen(true)
  const closeAuthModal = () => setIsAuthModalOpen(false)

  // Leer cookie 'token' al montar
  useEffect(() => {
    setHasToken(Boolean(Cookies.get('token')))
  }, [])

  // Callback al éxito: marcar sesión iniciada y cerrar modal
  const handleAuthSuccess = () => {
    setHasToken(true)
    closeAuthModal()
  }

  // Función para cerrar sesión
  const handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('isDoctor')
    Cookies.remove('isAdmin')
    setHasToken(false)
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
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-white hover:text-blue-300 transition-colors duration-200">
              Servicios
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-white/70" />
            </PopoverButton>

            <PopoverPanel 
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-200 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {medicalServices.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-100 group-hover:bg-[#5C95FF]/20 transition-colors duration-200">
                      <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-[#5C95FF]" />
                    </div>
                    <div className="flex-auto">
                      <a href={item.href} className="block font-semibold text-gray-900">
                        {item.name}
                        <span className="absolute inset-0" />
                      </a>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-white hover:text-blue-300 transition-colors duration-200"
            >
              {item.name}
            </a>
          ))}
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
                  {/* Mi Perfil */}
                  <button
                    onClick={() => {/* TODO: Navegar a perfil */}}
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

                  {/* Notificaciones */}
                  <button
                    onClick={() => {/* TODO: Navegar a notificaciones */}}
                    className="w-full flex items-center gap-x-3 rounded-lg p-3 text-sm text-left hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-gray-100">
                      <BellIcon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-auto">
                      <p className="font-semibold text-gray-900">Notificaciones</p>
                      <p className="text-xs text-gray-500">Alertas y recordatorios</p>
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
