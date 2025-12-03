'use client'
import { useEffect, useState, } from 'react'
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
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import AuthModal from '../organisms/AuthModal'
import Link from 'next/link'

const navigation = [
  { name: 'Clínicas', href: '/Clinics' },
  { name: 'Nosotros', href: '/us' },
]

export default function HeaderComponent() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">MedAgenda</span>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#259487] to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">MedAgenda</span>
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white hover:bg-white/10 transition-colors duration-200"
          >
            <span className="sr-only">Abrir menú</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold text-white hover:text-blue-300 transition-colors duration-200"
            >
              {item.name}
            </Link>
          ))}

          {/* Link para crear clínica - solo para usuarios autenticados */}
          {hasToken && (
            <Link
              href="/create-clinic"
              className="flex items-center gap-x-2 text-sm/6 font-semibold text-white hover:text-blue-300 transition-colors duration-200"
            >
              <PlusCircleIcon className="h-5 w-5" />
              Crear Clínica
            </Link>
          )}
        </PopoverGroup>

        {/* Desktop user menu */}
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

      {/* Mobile menu Dialog */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#4682B4] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="sr-only">MedAgenda</span>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#259487] to-indigo-700 rounded-xl flex items-center justify-center shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">MedAgenda</span>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-white hover:bg-white/10 transition-colors duration-200"
            >
              <span className="sr-only">Cerrar menú</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white/10">
              {/* Navigation links */}
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                {hasToken && (
                  <Link
                    href="/create-clinic"
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 flex items-center gap-x-2 rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    <PlusCircleIcon className="h-5 w-5" />
                    Crear Clínica
                  </Link>
                )}
              </div>

              {/* User section */}
              <div className="py-6">
                {!hasToken ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      openAuthModal()
                    }}
                    className="w-full -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-white hover:bg-white/10 transition-colors duration-200"
                  >
                    Iniciar sesión
                  </button>
                ) : (
                  <div className="space-y-2">
                    {/* Dashboard Administración - Solo para admins */}
                    {isAdmin && (
                      <button
                        onClick={() => {
                          router.push('/homeAdmin')
                          setMobileMenuOpen(false)
                        }}
                        className="w-full -mx-3 flex items-center gap-x-3 rounded-lg px-3 py-2 text-left hover:bg-white/10 transition-colors duration-200"
                      >
                        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-blue-100">
                          <BuildingOffice2Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-auto">
                          <p className="font-semibold text-white">Dashboard Administración</p>
                          <p className="text-xs text-blue-200">Gestión de clínica</p>
                        </div>
                      </button>
                    )}

                    {/* Dashboard Doctores - Para doctores o admins */}
                    {(isDoctor || isAdmin) && (
                      <button
                        onClick={() => {
                          router.push('/homeDoctor')
                          setMobileMenuOpen(false)
                        }}
                        className="w-full -mx-3 flex items-center gap-x-3 rounded-lg px-3 py-2 text-left hover:bg-white/10 transition-colors duration-200"
                      >
                        <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-green-100">
                          <HeartIcon className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="flex-auto">
                          <p className="font-semibold text-white">Dashboard Doctores</p>
                          <p className="text-xs text-blue-200">Citas y pacientes</p>
                        </div>
                      </button>
                    )}

                    {/* Dashboard Paciente - Para todos */}
                    <button
                      onClick={() => {
                        router.push('/homePatient')
                        setMobileMenuOpen(false)
                      }}
                      className="w-full -mx-3 flex items-center gap-x-3 rounded-lg px-3 py-2 text-left hover:bg-white/10 transition-colors duration-200"
                    >
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-purple-100">
                        <HomeIcon className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-auto">
                        <p className="font-semibold text-white">Dashboard</p>
                        <p className="text-xs text-blue-200">Mis citas y servicios</p>
                      </div>
                    </button>

                    {/* Mi Perfil */}
                    <button
                      onClick={() => {
                        router.push('/profile')
                        setMobileMenuOpen(false)
                      }}
                      className="w-full -mx-3 flex items-center gap-x-3 rounded-lg px-3 py-2 text-left hover:bg-white/10 transition-colors duration-200"
                    >
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-gray-100">
                        <UserCircleIcon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div className="flex-auto">
                        <p className="font-semibold text-white">Mi Perfil</p>
                        <p className="text-xs text-blue-200">Ver y editar información</p>
                      </div>
                    </button>

                    {/* Cerrar Sesión */}
                    <button
                      onClick={() => {
                        handleLogout()
                        setMobileMenuOpen(false)
                      }}
                      className="w-full -mx-3 flex items-center gap-x-3 rounded-lg px-3 py-2 text-left hover:bg-red-500/20 transition-colors duration-200"
                    >
                      <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-red-100">
                        <ArrowRightOnRectangleIcon className="h-6 w-6 text-red-600" />
                      </div>
                      <div className="flex-auto">
                        <p className="font-semibold text-red-100">Cerrar Sesión</p>
                        <p className="text-xs text-blue-200">Salir de tu cuenta</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        onSuccess={handleAuthSuccess}
      />
    </header>
  )
}
