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

export default function UpdateInvoiceModal({ toggleModal, invoice, isReceivable }) {
  const [isUpdate] = useState(!!Object.keys(invoice).length)
  const [url] = useState(isReceivable ? 'contasReceber' : 'contasPagar')
  const [values, setValues] = useState({
    identification: '',
    due_date: '',
    amount: '',
    paid: false,
    payday: null,
  })

  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (isUpdate) {
      const paid = invoice.paid === '1' ? true : false
      const due_date = formatHTMLDate(invoice.due_date)
      let payday
      if (invoice.payday) payday = formatHTMLDate(invoice.payday)

      setValues({ ...invoice, due_date: due_date, paid: paid, payday: payday })
    }
  }, [])

  function onChange(e) {
    let { value, name } = e.target

    if (name === 'due_date') value = formatDate(value)
    if (name === 'payday') value = formatDate(value)
    if (name === 'paid') value = e.target.checked

    setValues({
      ...values,
      [name]: value,
    })
  }

  async function handleUpdateInvoice(e) {
    e.preventDefault()

    if (isUpdate) {
      try {
        await api.put(`/${url}/${invoice.id}`, values)
        toggleModal()
      } catch (error) {
        setErrorMsg(error.response.data.msg)
      }
    } else {
      try {
        await api.post(`/${url}`, values)
        toggleModal()
      } catch (error) {
        setErrorMsg(error.response.data.msg)
      }
    }
  }

  return (
    <Modal id={styles.modal}>
      {errorMsg && <ErrorMsg msg={errorMsg}></ErrorMsg>}
      <h3 id={styles.header}>{isReceivable ? 'Insira as informações da conta a receber' : 'Insira as informações da conta a pagar'}</h3>
      <form onSubmit={handleUpdateInvoice}>
        <label>
          Identificação da conta
          <input type='text' placeholder='Compras no mercado' name='identification' onChange={onChange} value={values.identification} required />
        </label>

        <label>
          Data de vencimento
          <input type='date' name='due_date' onChange={onChange} required />
        </label>

        <label>
          {isReceivable ? 'Valor a receber' : 'Valor a pagar'}
          <input type='text' placeholder='R$ 16,00' name='amount' onChange={onChange} value={values.amount} required />
        </label>

        <label>
          {isReceivable ? 'Recebido (opcional)' : 'Pago (opcional)'}
          <input type='checkbox' name='paid' onChange={onChange} />
        </label>

        <label>
          {isReceivable ? 'Data de recebimento (opcional)' : 'Data de pagamento (opcional)'}
          <input type='date' name='payday' onChange={onChange} />
        </label>

        <div className={styles.buttons}>
          <Button onClick={toggleModal}>Cancelar</Button>
          <Button>{isUpdate ? 'Atualizar' : 'Criar'}</Button>
        </div>
      </form>
    </Modal>
  )
}
