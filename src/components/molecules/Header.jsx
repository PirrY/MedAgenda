import './Header.css'

export default function Header() {
  return (
    <header>

        <nav>
            <img src="/src/img/logo.jpeg" alt="" height={100} width={100}/>
            <section id='section1'>
              <p>Servicios Medicos</p>
              <p>Medios de contacto</p>
            </section>
            <section id='section2'>
                <button>Login</button>
                <button>Register</button>
            </section>
        </nav>
    </header>
  )
}
