import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useContext } from 'react'

import ErrorMsg from '../../components/ErrorMsg'

import { AuthContext } from '../../contexts/AuthContext.js'

import styles from './styles.module.scss'

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const [errorMsg, setErrorMsg] = useState('')

  function onChange(e) {
    const { value, name } = e.target

    setValues({
      ...values,
      [name]: value,
    })
  }

  async function handleSignIn(e) {
    e.preventDefault()
    const { email, password } = values
    const res = await signIn(email, password)
    setErrorMsg(res)
  }

  return (
    <>
      <Head>
        <title>Login - Lar São Vicente de Paula</title>
      </Head>

      <main className={styles.mainContainer}>
        <img id={styles.logo} src={'/LogoSVP.png'} alt='logo do lar São Vicente de Paula' />

        <form onSubmit={handleSignIn}>
          {errorMsg && <ErrorMsg msg={errorMsg}></ErrorMsg>}
          <p>LOGIN</p>

          <input id='email' type='email' placeholder='Email' name='email' value={values.email} onChange={onChange} required />
          <input id='password' type='password' placeholder='Senha' name='password' value={values.password} onChange={onChange} required />

          <button>Entrar</button>
          <Link href='/cadastrar'>Criar nova conta</Link>
          <Link href='/login/recuperar'>Esqueci minha senha</Link>
        </form>
      </main>
    </>
  )
}
