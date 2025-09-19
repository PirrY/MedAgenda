'use client'

const navigation = [
  { name: 'Servicios', href: '#servicios' },
  { name: 'Doctores', href: '#doctores' },
  { name: 'Especialidades', href: '#especialidades' },
  { name: 'Nosotros', href: '#nosotros' },
]

export default function MedicalHero() {

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">MedAgenda</span>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <span className="text-xl font-bold text-stone-800">MedAgenda</span>
              </div>
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a 
                key={item.name} 
                href={item.href} 
                className="text-sm/6 font-semibold text-stone-800 hover:text-blue-700 transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a 
              href="#" 
              className="text-sm/6 font-semibold text-stone-800 hover:text-blue-700 transition-colors duration-200"
            >
              Iniciar sesión <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-red-300 via-blue-400 to-blue-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-4 py-2 text-sm/6 text-stone-600 ring-1 ring-stone-300 hover:ring-blue-400 transition-all duration-200 bg-white/50 backdrop-blur-sm">
              🩺 Nueva plataforma de telemedicina disponible.{' '}
              <a href="#" className="font-semibold text-blue-700 hover:text-blue-800">
                <span aria-hidden="true" className="absolute inset-0" />
                Conocer más <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-balance text-stone-800 sm:text-7xl">
              Agendate con los mejores 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700"> doctores</span> cerca de ti
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-stone-600 sm:text-xl/8 max-w-3xl mx-auto">
              Encuentra y agenda citas con profesionales de la salud verificados. 
              Atención médica de calidad, disponible 24/7, desde la comodidad de tu hogar.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 flex-wrap">
              <a
                href="#"
                className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-blue-700 hover:to-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200 hover:scale-105 hover:shadow-xl"
              >
                Buscar Doctor
              </a>
              <a 
                href="#" 
                className="text-sm/6 font-semibold text-stone-800 hover:text-blue-700 transition-colors duration-200 group"
              >
                Ver especialidades{' '}
                <span aria-hidden="true" className="group-hover:translate-x-1 inline-block transition-transform duration-200">→</span>
              </a>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-700">5,000+</div>
              <div className="text-sm text-stone-600">Doctores</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-red-500">50,000+</div>
              <div className="text-sm text-stone-600">Pacientes</div>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-stone-200 via-blue-200 to-indigo-300 opacity-15 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  )
}