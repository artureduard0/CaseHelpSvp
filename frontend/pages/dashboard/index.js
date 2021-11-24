import Head from 'next/head'
import { useState } from 'react'

import styles from './styles.module.scss'

import DashboardPanel from '../../components/dashboard/DashboardPanel/'

export default function Dashboard() {
  const [panelOption, setPanelOption] = useState('Não autorizado!')
  return (
    <>
      <Head>
        <title>Dashboard - Lar São Vicente de Paula</title>
      </Head>

      <div className={styles.container}>
        <DashboardPanel setOption={setPanelOption} option={panelOption} />
        {panelOption}
      </div>
    </>
  )
}
