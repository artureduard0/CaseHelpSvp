import { useState } from 'react'

import api from '../../../services/api.js'

import Modal from '../index'
import Button from '../../elements/Button'

import styles from './styles.module.scss'

export default function EditUserPermissionModal({ user, toggleModal }) {
  const [values, setValues] = useState({
    isAdmin: '',
  })

  function onChange(e) {
    const { value, name } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  async function handlePermissionUpdate(e) {
    e.preventDefault()
    const admin = values.isAdmin === '1' ? true : false

    try {
      await api.post(`/usuarios/alterarPermissao/${user.id}`, {
        admin,
      })
      toggleModal()
    } catch (error) {}
  }

  return (
    <Modal id={styles.modal}>
      <h3 className={styles.header}>Atualizar as permissões de {user.email}</h3>
      <form className={styles.form} onSubmit={handlePermissionUpdate}>
        <select name='isAdmin' onChange={onChange} required>
          <option value=''>Selecione uma opção</option>
          <option value='1'>Diretor Financeiro</option>
          <option value='0'>Usuário</option>
        </select>
        <div className={styles.buttons}>
          <Button onClick={toggleModal}>Cancelar</Button>
          <Button type='submit'>Atualizar</Button>
        </div>
      </form>
    </Modal>
  )
}
