import Head from 'next/head'
import { useState } from 'react'

import ErrorMsg from '../../../components/ErrorMsg/index.js'

import api from '../../../services/api.js'

import styles from '../styles.module.scss'

export default function Home() {
  const [values, setValues] = useState({
    email: '',
    cpf: '',
  })

  const [errorMsg, setErrorMsg] = useState('')

  function onChange(e) {
    const { value, name } = e.target

    setValues({
      ...values,
      [name]: value,
    })
  }

  async function handlePasswordRecover(e) {
    e.preventDefault()
    const { email, cpf } = values

    try {
      await api.post('/usuarios/recuperar', { email, cpf })
    } catch (error) {
      if (error.response) setErrorMsg(error.response.data.msg)
    }
  }

  return (
    <>
      <Head>
        <title>Recuperação de senha - Lar São Vicente de Paula</title>
      </Head>

      <main className={styles.mainContainer}>
        <img id={styles.logo} src={'/LogoSVP.png'} alt='logo do lar São Vicente de Paula' />

        <form onSubmit={handlePasswordRecover}>
          {errorMsg && <ErrorMsg msg={errorMsg}></ErrorMsg>}
          <p>Recupere sua senha</p>

          <input id='email' type='email' placeholder='Email' name='email' value={values.email} onChange={onChange} required />
          <input id='cpf' type='text' placeholder='CPF' name='cpf' value={values.cpf} onChange={onChange} required />

          <button>Recuperar</button>
        </form>
      </main>
    </>
  )
}
