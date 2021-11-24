import Router from 'next/router'

import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import styles from './styles.module.scss'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerColumn}>
        <h3>| Endereço</h3>
        <p>Rua Barão de Cambaí nº 200, Bairro Primavera, Novo Hamburgo.</p>
      </div>
      <div className={styles.footerColumn}>
        <h3>| Contato</h3>
        <p>(51) 3595-8181</p>
      </div>
      <div className={styles.footerColumn}>
        <h3>| Redes Sociais</h3>
        <div>
          <a href='https://www.facebook.com/LarSaoVicenteDePaula' target='_blank'>
            <FaFacebookF size='2rem' className={styles.socialIcons} />
          </a>
          <a href='https://www.instagram.com/larsaovicentedepaula/' target='_blank'>
            <FaInstagram size='2rem' className={styles.socialIcons} />
          </a>
        </div>
      </div>
    </footer>
  )
}
