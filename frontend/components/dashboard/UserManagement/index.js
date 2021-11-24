import { useEffect, useState } from 'react'

import { FaTrashAlt, FaUserEdit } from 'react-icons/fa'

import EditUserPermissionModal from '../../Modals/EditUserPermissionModal'
import DeleteModal from '../../Modals/DeleteModal'
import ErrorMsg from '../../ErrorMsg'

import styles from './styles.module.scss'

import api from '../../../services/api.js'

export default function UserManagement() {
  const tableHeaders = ['Nome', 'CPF', 'Celular', 'Email', 'Cargo', 'Editar', 'Excluir']

  const [users, setUsers] = useState([{}])

  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    api
      .get('/usuarios/listar')
      .then((response) => {
        setUsers(response.data.data)
      })
      .catch((error) => {
        if (error.response) setErrorMsg(error.response.data.msg)
      })
  }, [users])

  const [userPermissionModal, setUserPermissionModal] = useState({})
  const [showUserPermissionModal, setShowUserPermissionModal] = useState(false)

  function toggleUserPermissionModal() {
    setShowUserPermissionModal(!showUserPermissionModal)
  }

  useEffect(() => {
    if (!!Object.keys(userPermissionModal).length) setShowUserPermissionModal(true)
  }, [userPermissionModal])

  // * Funções e variáveis referentes à exclusão de usuários

  const [selectedUserDelete, setSelectedUserDelete] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  function toggleDeleteModal() {
    setShowDeleteModal(!showDeleteModal)
  }

  useEffect(() => {
    if (!!Object.keys(selectedUserDelete).length) setShowDeleteModal(true)
  }, [selectedUserDelete])

  async function deleteUser() {
    api
      .post(`/usuarios/desativar/${selectedUserDelete.id}`)
      .then()
      .catch((error) => {
        if (error.response) setErrorMsg(error.response.data.msg)
      })
    toggleDeleteModal()
  }

  return (
    <>
      {showUserPermissionModal && <EditUserPermissionModal toggleModal={toggleUserPermissionModal} user={userPermissionModal} />}
      {showDeleteModal && (
        <DeleteModal toggleModal={toggleDeleteModal} onClick={deleteUser} modalMsg={`Deseja desativar o usuário: ${selectedUserDelete.email} ?`} />
      )}

      <main className={styles.main}>
        {errorMsg && <ErrorMsg msg={errorMsg}></ErrorMsg>}
        <table>
          <thead>
            <tr>
              {tableHeaders.map((element, index) => {
                return <th key={index}>{element}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.cpf}</td>
                  <td>{user.cellphone}</td>
                  <td>{user.email}</td>
                  <td>{user.admin ? 'Diretor Financeiro' : 'Usuário'}</td>
                  <td>
                    <FaUserEdit size='1.5rem' onClick={() => setUserPermissionModal(user)} />
                  </td>
                  <td>
                    <FaTrashAlt size='1.2rem' onClick={() => setSelectedUserDelete(user)} />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </main>
    </>
  )
}
