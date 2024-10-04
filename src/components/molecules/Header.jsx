import './Header.css'

export default function Header() {
  return (
    <header>

        <nav>
            <img src="/src/img/logo.jpeg" alt="" height={100} width={100}/>
            <section id='section1'>
              <p>La Solución Integral para la Gestión de tu Clínica</p>
            </section>
            <section id='section2'>
                <button>Iniciar Sesión</button>
                <button>Registrarse</button>
            </section>
        </nav>
    </header>
  )
}
