// = OK

import { useEffect, useState } from 'react'

import api from '../../../services/api.js'

import UpdateInvoiceModal from '../../Modals/UpdateInvoiceModal'
import DeleteModal from '../../Modals/DeleteModal'

import Button from '../../elements/Button/index.js'
import { FaTrashAlt, FaEdit } from 'react-icons/fa'

import styles from './styles.module.scss'

function formatDate(date) {
  if (date) {
    let formattedDate = date.split(' ')
    formattedDate = formattedDate[0].split('-')
    return formattedDate[2] + '/' + formattedDate[1] + '/' + formattedDate[0]
  }
}

export default function ReceivableInvoices() {
  // * Funções e variáveis referentes à listagem de contas

  const tableHeaders = ['Identificação', 'Data de Vencimento', 'Valor', 'Recebido', 'Data de Recebimento', 'Editar', 'Excluir']

  const [invoices, setInvoices] = useState([{}])

  useEffect(() => {
    api
      .get('/contasReceber/listar')
      .then((response) => {
        setInvoices(response.data.data)
      })
      .catch((error) => {
        if (error.response) {
          console.log('Error data: ', error.response.data)
          console.log('Error status: ', error.response.status)
        } else if (error.request) console.log('Error request: ', error.request)
        else console.log('Error', error.message)
      })
  }, [invoices])

  // * Funções e variáveis referentes à adição/criação de contas

  const [selectedInvoiceUpdate, setSelectedInvoiceUpdate] = useState({})
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  useEffect(() => {
    if (!!Object.keys(selectedInvoiceUpdate).length) setShowUpdateModal(true)
  }, [selectedInvoiceUpdate])

  function toggleUpdateModal() {
    setSelectedInvoiceUpdate({})
    setShowUpdateModal(!showUpdateModal)
  }

  function addInvoice() {
    setSelectedInvoiceUpdate({})
    setShowUpdateModal(true)
  }

  // * Funções e variáveis referentes à exclusão de contas

  const [selectedInvoiceDelete, setSelectedInvoiceDelete] = useState({})
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  function toggleDeleteModal() {
    setShowDeleteModal(!showDeleteModal)
  }

  useEffect(() => {
    if (!!Object.keys(selectedInvoiceDelete).length) setShowDeleteModal(true)
  }, [selectedInvoiceDelete])

  async function deleteInvoice() {
    api
      .delete(`/contasReceber/${selectedInvoiceDelete.id}`)
      .then()
      .catch((error) => {
        if (error.response) {
          console.log('Error data: ', error.response.data)
          console.log('Error status: ', error.response.status)
        } else if (error.request) console.log('Error request: ', error.request)
        else console.log('Error', error.message)
      })
    toggleDeleteModal()
  }

  // * Funções e variáveis referentes ao relatório

  async function getReport() {
    const FileDownload = require('js-file-download')

    api
      .get('/contasReceber/gerarRelatorio', {
        responseType: 'blob',
      })
      .then((response) => {
        FileDownload(response.data, 'Relatório de contas a receber.xslx')
      })
      .catch((error) => {})
  }

  return (
    <>
      {showUpdateModal && <UpdateInvoiceModal toggleModal={toggleUpdateModal} invoice={selectedInvoiceUpdate} isReceivable={true} />}
      {showDeleteModal && (
        <DeleteModal toggleModal={toggleDeleteModal} modalMsg={`Deseja excluir a conta '${selectedInvoiceDelete.identification}' ?`} onClick={deleteInvoice} />
      )}

      <main className={styles.main}>
        <Button id={styles.reportButton} onClick={getReport}>
          Gerar relatório
        </Button>
        <table>
          <thead>
            <tr>
              {tableHeaders.map((element, index) => {
                return <th key={index}>{element}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => {
              return (
                <tr key={index}>
                  <td>{invoice.identification}</td>
                  <td>{formatDate(invoice.due_date)}</td>
                  <td>{invoice.amount ? invoice.amount : '0'}</td>
                  <td>{invoice.paid ? 'Sim' : 'Não'}</td>
                  <td>{invoice.payday ? formatDate(invoice.payday) : '--/--/----'}</td>
                  <td>
                    <FaEdit size='1.5rem' onClick={() => setSelectedInvoiceUpdate(invoice)} />
                  </td>
                  <td>
                    <FaTrashAlt size='1.2rem' onClick={() => setSelectedInvoiceDelete(invoice)} />
                  </td>
                </tr>
              )
            })}
            <tr id={styles.addInvoice} onClick={addInvoice}>
              <td colSpan={8}>+ Adicionar conta a receber</td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  )
}
