import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ErrorMsg from '../../components/ErrorMsg/index.js'
import api from '../../services/api.js'

import styles from './styles.module.scss'

export default function Cadastrar() {
  const router = useRouter()

  const [values, setValues] = useState({
    email: '',
    password: '',
    name: '',
    cpf: '',
    cellphone: '',
  })

  const [errorMsg, setErrorMsg] = useState('')

  function onChange(e) {
    const { value, name } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  async function handleSignUp(e) {
    e.preventDefault()
    const { email, cpf, name, password, cellphone } = values

    try {
      await api.post('/usuarios/cadastrar', {
        name,
        email,
        password,
        cpf,
        cellphone,
      })
      router.push('/login')
    } catch (error) {
      if (error.response) setErrorMsg(error.response.data.msg)
    }
  }

  return (
    <>
      <Head>
        <title>Cadastro - Lar São Vicente de Paula</title>
      </Head>

      <main className={styles.mainContainer}>
        <form onSubmit={handleSignUp}>
          {errorMsg && <ErrorMsg msg={errorMsg}></ErrorMsg>}
          <p>Crie sua conta</p>

          <div className={styles.inputContainer}>
            <div>
              <input type='text' placeholder='Nome completo' name='name' onChange={onChange} required />
              <input type='text' placeholder='CPF' name='cpf' onChange={onChange} required />
              <input type='text' placeholder='Celular' name='cellphone' onChange={onChange} required />
            </div>

            <div>
              <input type='email' placeholder='Email' name='email' onChange={onChange} required />
              <input type='password' placeholder='Senha' name='password' onChange={onChange} required />
            </div>
          </div>

          <button type='submit'>Cadastrar</button>
          <a href='/login'>Já possuo uma conta</a>
        </form>
      </main>
    </>
  )
}
