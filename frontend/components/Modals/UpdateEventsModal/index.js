// = OK

import { useEffect, useState } from 'react'

import api from '../../../services/api'

import Modal from '..'
import Button from '../../elements/Button'
import ErrorMsg from '../../ErrorMsg'
import styles from './styles.module.scss'

function formatDate(date) {
  const formattedDate = date.split('-')
  return formattedDate[2] + '/' + formattedDate[1] + '/' + formattedDate[0]
}

function formatHTMLDate(date) {
  let formattedDate = date.split(' ')
  return formattedDate[0]
}

export default function UpdateEventsModal({ toggleModal, event }) {
  const [isUpdate] = useState(!!Object.keys(event).length)
  const [values, setValues] = useState({
    name: '',
    date: '',
    local: '',
  })

  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (isUpdate) {
      const date = formatHTMLDate(event.date)

      setValues({ ...event, date: date })
    }
  }, [])

  function onChange(e) {
    let { value, name } = e.target

    if (name === 'date') value = formatDate(value)
    setValues({
      ...values,
      [name]: value,
    })
  }

  async function handleUpdateEvent(e) {
    e.preventDefault()

    if (isUpdate) {
      try {
        await api.put(`/eventos/${event.id}`, values)
        toggleModal()
      } catch (error) {
        setErrorMsg(error.response.data.msg)
      }
    } else {
      try {
        await api.post(`/eventos`, values)
        toggleModal()
      } catch (error) {
        setErrorMsg(error.response.data.msg)
      }
    }
  }

  return (
    <Modal id={styles.modal}>
      {errorMsg && <ErrorMsg msg={errorMsg}></ErrorMsg>}
      <h3 id={styles.header}>{isUpdate ? 'Atualize as informações do evento ' : 'Insira as informações do evento'}</h3>
      <form onSubmit={handleUpdateEvent}>
        <label>
          Nome do evento
          <input type='text' placeholder='Ação solidária' name='name' onChange={onChange} value={values.name} required />
        </label>

        <label>
          Data
          <input type='date' name='date' onChange={onChange} required />
        </label>

        <label>
          Local
          <input type='text' placeholder='UNISINOS' name='local' onChange={onChange} value={values.local} required />
        </label>

        <div className={styles.buttons}>
          <Button onClick={toggleModal}>Cancelar</Button>
          <Button>{isUpdate ? 'Atualizar' : 'Criar'}</Button>
        </div>
      </form>
    </Modal>
  )
}
