import { useEffect, useState } from 'react'

import { MdCallReceived, MdOutlineCallMade, MdEventAvailable, MdPerson } from 'react-icons/md'
import { IoMdSettings } from 'react-icons/io'

import UserManagement from '../UserManagement'
import PayableInvoices from '../PayableInvoices'
import ReceivableInvoices from '../ReceivableInvoices'
import EmailSettings from '../../dashboard/EmailSettings'
import Events from '../../dashboard/Events'

import styles from './styles.module.scss'

export default function DashboardPanel({ setOption, panelOption }) {
  const [selectedOption, setSelectedOption] = useState('')

  useEffect(() => {
    setOption(<UserManagement />)
    setSelectedOption('Gestão de usuários')
  }, [])

  return (
    <section className={styles.panelContainer}>
      <a
        className={selectedOption === 'Gestão de usuários' ? styles.selectedOption : null}
        onClick={() => {
          setOption(<UserManagement />)
          setSelectedOption('Gestão de usuários')
        }}
      >
        <MdPerson size='2rem' color='#980057' />
        Gestão de Usuários
      </a>

      <a
        className={selectedOption === 'Contas a pagar' ? styles.selectedOption : null}
        onClick={() => {
          setOption(<PayableInvoices />)
          setSelectedOption('Contas a pagar')
        }}
      >
        <MdCallReceived size='2rem' color='#980057' />
        Contas a pagar
      </a>

      <a
        className={selectedOption === 'Contas a receber' ? styles.selectedOption : null}
        onClick={() => {
          setOption(<ReceivableInvoices />)
          setSelectedOption('Contas a receber')
        }}
      >
        <MdOutlineCallMade size='2rem' color='#980057' />
        Contas a receber
      </a>

      <a
        className={selectedOption === 'Eventos' ? styles.selectedOption : null}
        onClick={() => {
          setOption(<Events />)
          setSelectedOption('Eventos')
        }}
      >
        <MdEventAvailable size='2rem' color='#980057' />
        Eventos
      </a>

      <a
        onClick={() => {
          setOption(<EmailSettings />)
          setSelectedOption('Configurações')
        }}
        className={selectedOption === 'Configurações' ? styles.selectedOption : null}
      >
        <IoMdSettings size='2rem' color='#980057' />
        Configurações
      </a>
    </section>
  )
}
