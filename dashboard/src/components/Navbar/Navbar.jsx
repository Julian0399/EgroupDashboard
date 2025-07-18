import style from './Navbar.module.css'

function Navbar() {
  return (
    <div className={style.navbar}>
      <img src="https://e-group.com.co/static/assets/media/logo_blanco.png" alt="EGroup Logo" className={style.logo} />
      <h1 className={style.title}>Dashboard Admin</h1>
      <button className={style.logoutButton}>Logout</button>
    </div>
  )
}

export default Navbar
