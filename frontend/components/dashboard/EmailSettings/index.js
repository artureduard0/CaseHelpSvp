import { useState } from 'react'

import api from '../../../services/api.js'

import Button from '../../elements/Button'
import ErrorMsg from '../../ErrorMsg/index.js'
import styles from './styles.module.scss'

export default function EmailSettings() {
  const [values, setValues] = useState({
    user: String,
    password: String,
    host: String,
    port: String,
  })

  function onChange(e) {
    const { value, name } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const [errorMsg, setErrorMsg] = useState('')

  async function handleEmailUpdate(e) {
    e.preventDefault()

    try {
      await api.post('/configuracoes/editarSmtp', values)
      setErrorMsg('')
      document.getElementById('form').reset()
    } catch (error) {
      if (error.response) setErrorMsg(error.response.data.msg)
    }
  }

  return (
    <div className={styles.main}>
      <div>
        {errorMsg && <ErrorMsg msg={errorMsg}></ErrorMsg>}
        <h2>Atualizar as informações de envio de email</h2>
        <form id='form' onSubmit={handleEmailUpdate}>
          <input type='text' placeholder='Host' name='host' onChange={onChange} required />
          <input type='text' placeholder='Porta' name='port' onChange={onChange} required />
          <input type='text' placeholder='Usuario' name='user' onChange={onChange} required />
          <input type='password' placeholder='Senha' name='password' onChange={onChange} required />
          <Button type='submit'>Atualizar</Button>
        </form>
      </div>
    </div>
  )
}
