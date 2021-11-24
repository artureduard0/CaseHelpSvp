// = OK

import styled from 'styled-components'
const StyledModalBackground = styled.div`
  position: fixed;
  z-index: 999;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s linear;

  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledModal = styled.div`
  background-color: white;
  padding: 2rem;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default function Modal({ children, className, id }) {
  return (
    <StyledModalBackground>
      <StyledModal id={id} className={className}>
        {children}
      </StyledModal>
    </StyledModalBackground>
  )
}
