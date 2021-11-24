import { useEffect, useState } from 'react'

import api from '../../../services/api.js'

import UpdateEventsModal from '../../Modals/UpdateEventsModal'
import DeleteModal from '../../Modals/DeleteModal'
import ErrorMsg from '../../ErrorMsg'

import { FaTrashAlt, FaEdit } from 'react-icons/fa'
import { MdMail } from 'react-icons/md'

import styles from './styles.module.scss'

function formatDate(date) {
  if (date) {
    let formattedDate = date.split(' ')
    formattedDate = formattedDate[0].split('-')
    return formattedDate[2] + '/' + formattedDate[1] + '/' + formattedDate[0]
  }
}

export default function Events() {
  const [errorMsg, setErrorMsg] = useState('')

  // * Funções e variáveis referentes à listagem dos eventos

  const tableHeaders = ['Nome', 'Data', 'Local', 'Editar', 'Excluir', 'Convidar']

  const [events, setEvents] = useState([{}])

  useEffect(() => {
    api
      .get('/eventos/listar')
      .then((response) => {
        setEvents(response.data.data)
      })
      .catch((error) => {})
  }, [events])

  // * Funções e variáveis referentes à adição/criação de contas

  const [selectedEventUpdate, setSelectedEventUpdate] = useState({})
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  useEffect(() => {
    if (!!Object.keys(selectedEventUpdate).length) setShowUpdateModal(true)
  }, [selectedEventUpdate])

  function toggleUpdateModal() {
    setSelectedEventUpdate({})
    setShowUpdateModal(!showUpdateModal)
  }

  function addEvent() {
    setSelectedEventUpdate({})
    setShowUpdateModal(true)
  }

  // * Funções e variáveis referentes à exclusão de eventos

  const [selectedEventDelete, setSelectedEventDelete] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  function toggleDeleteModal() {
    setShowDeleteModal(!showDeleteModal)
  }

  useEffect(() => {
    if (!!Object.keys(selectedEventDelete).length) setShowDeleteModal(true)
  }, [selectedEventDelete])

  async function deleteEvent() {
    api
      .delete(`/eventos/${selectedEventDelete.id}`)
      .then()
      .catch((error) => {})

    toggleDeleteModal()
  }

  // * Funções e variáveis referentes à notificação de eventos

  async function notifyEvent(event) {
    api
      .get(`/eventos/notificar/${event.id}`)
      .then((response) => {
        alert(response.data.msg)
      })
      .catch((error) => {
        if (error.response) setErrorMsg(error.response.data.msg)
      })
  }

  return (
    <>
      {showUpdateModal && <UpdateEventsModal toggleModal={toggleUpdateModal} event={selectedEventUpdate} />}

      {showDeleteModal && (
        <DeleteModal toggleModal={toggleDeleteModal} modalMsg={`Deseja excluir o evento '${selectedEventDelete.name}' ?`} onClick={deleteEvent} />
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
            {events.map((event, index) => {
              return (
                <tr key={index}>
                  <td>{event.name}</td>
                  <td>{formatDate(event.date)}</td>
                  <td>{event.local}</td>
                  <td>
                    <FaEdit size='1.5rem' onClick={() => setSelectedEventUpdate(event)} />
                  </td>
                  <td>
                    <FaTrashAlt size='1.2rem' onClick={() => setSelectedEventDelete(event)} />
                  </td>
                  <td>
                    <MdMail size='1.8rem' onClick={() => notifyEvent(event)}></MdMail>
                  </td>
                </tr>
              )
            })}
            <tr id={styles.addEvent} onClick={addEvent}>
              <td colSpan={8}>+ Adicionar novo evento</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  )
}
