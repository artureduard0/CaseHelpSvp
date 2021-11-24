import Head from 'next/head'
import { useState } from 'react'

import { PayPalButton } from 'react-paypal-button-v2'

import styles from './styles.module.scss'

export default function Donations() {
  const [amount, setAmount] = useState()

  function DefaultDonations({ amount, src }) {
    return (
      <div
        onClick={() => {
          setAmount(parseInt(amount))
        }}
        className={styles.defaultDonation}
      >
        <div>
          <img src={src}></img>
        </div>
        <span> {'R$ ' + amount}</span>
      </div>
    )
  }

  function handleChange(e) {
    setAmount(e.target.value)
  }

  return (
    <>
      <Head>
        <title>Lar São Vicente de Paula - Doações</title>
      </Head>

      <main id={styles.main}>
        <h1>Selecione ou insira um valor para doação</h1>

        <div id={styles.donations}>
          <DefaultDonations amount={'10,00'} src={'/Layer 1.png'} />
          <DefaultDonations amount={'25,00'} src={'/Layer 2.png'} />
          <DefaultDonations amount={'50,00'} src={'/Layer 3.png'} />
        </div>

        <input type='text' placeholder='Insira um valor' name='amount' onChange={handleChange} value={amount} />
      </main>
      <div id={styles.paypal}>
        <PayPalButton
          amount={amount}
          onSuccess={(details, data) => {
            alert('Transaction completed by ' + details.payer.name.given_name)
          }}
          options={{
            clientId: 'AWG0E4FoU9E_xWYn3QEQIDD02BRV1uFNVKWcDwCoyVDoWtaModp61lARh4vkP7rCR7_8KxBWWHZIslZr',
            currency: 'BRL',
          }}
        />
      </div>
    </>
  )
}
