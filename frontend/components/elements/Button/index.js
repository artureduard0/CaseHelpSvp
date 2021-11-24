import styled from 'styled-components'
const StyledButton = styled.button`
  background: var(--primary-color);
  color: #fff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);

  border: 1px solid var(--primary-color);
  border-radius: 4px;

  cursor: pointer;
  transition: 0.25s;

  &:hover {
    outline: none;
    background: rgba(134, 1, 77, 0.938);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  }
`

export default function Button({ children, onClick, id }) {
  return (
    <StyledButton id={id} onClick={onClick}>
      {children}
    </StyledButton>
  )
}
