import Head from 'next/head'
import Link from 'next/link'

import styles from './styles.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Lar São Vicente de Paula</title>
      </Head>

      <main className={styles.mainContainer}>
        <div className={styles.backgroundImg}>
          <h1>Respeito, amor e dedicação.</h1>
          <p>Conheça o lar São Vicente de Paula e ajude a completar a nossa missão.</p>
          <Link href='/doacoes'>Faça sua doação!</Link>
        </div>
      </main>

      <div className={styles.container} id='quemSomos'>
        <div className={styles.column}>
          <img id={styles.logoAboutUs} src={'LogoSVP.png'}></img>
          <p>
            Fundado em 30 de Julho de 1994 o Lar São Vicente de Paula é uma Instituição pertencente à comunidade de Novo Hamburgo, que abriga em regime integral
            49 idosos carentes da cidade.
          </p>
          <p>
            <br></br>Proporcionamos um ambiente saudável e acolhedor, com serviços de psicologia, nutrição, alimentação, médico, enfermagem 24 horas, lazer,
            medicação, roupas, fraldas, calçados e tudo o mais que se faz necessário.
          </p>
          <p>
            <br></br>O Lar conta hoje com uma diretoria voluntária, 31 funcionários e muitos parceiros, todos dispostos a dar o melhor de si para prover todas
            as necessidades dos nossos
          </p>
        </div>

        <div className={styles.column} id={styles.secondColumn}>
          <div>
            <h2>Missão</h2>
            <p>Acolher idosos, proporcionando assistência, cuidados e qualidade de vida, provendo as suas necessidades com ética e seriedade.</p>
          </div>
          <hr></hr>
          <div>
            <h2>Valores</h2>
            <p>Respeito ao idoso na sua integridade física e emocional, preservando sua essência, com amor, responsabilidade, caridade e dedicação.</p>
          </div>
        </div>
      </div>
    </>
  )
}
