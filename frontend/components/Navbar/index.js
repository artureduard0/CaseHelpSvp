import Link from 'next/link'
import { useContext } from 'react'
import { FaUserCircle } from 'react-icons/fa'

import { AuthContext } from '../../contexts/AuthContext.js'

import styles from './styles.module.scss'

export default function Navbar() {
  const { isAuthenticated, signOut, user } = useContext(AuthContext)

  return (
    <header className={styles.container}>
      <div className={styles.logoContainer}>
        <img src={'/logo.png'} alt='Logo do Lar São Vicente de Paula'></img>
        <Link href='/'>Lar São Vicente de Paula</Link>
      </div>
      <div className={styles.navContainer}>
        <nav>
          <Link href='/'>HOME</Link>
          <Link href='/#quemSomos'>QUEM SOMOS</Link>
          <Link href='/doacoes'>DOAÇÕES</Link>
        </nav>
        {isAuthenticated ? (
          <div className={styles.userIconContainer}>
            <Link href='/dashboard'>
              <a>
                <FaUserCircle size='40px' color='#980057' />
              </a>
            </Link>
            <p>{user?.name}</p>
            <button className={styles.signOutButton} onClick={signOut}>
              SAIR
            </button>
          </div>
        ) : (
          <div className={styles.loginButton}>
            <Link href='/login'>LOGIN</Link>
          </div>
        )}
      </div>
    </header>
  )
}
