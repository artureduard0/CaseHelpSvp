// = OK

import Modal from '..'
import Button from '../../elements/Button'

import styles from './styles.module.scss'

export default function DeleteModal({ modalMsg, toggleModal, onClick }) {
  return (
    <Modal id={styles.modal}>
      <h3 id={styles.header}>{modalMsg}</h3>
      <div className={styles.buttons}>
        <Button onClick={toggleModal}>Cancelar</Button>
        <Button onClick={onClick}>Excluir</Button>
      </div>
    </Modal>
  )
}
