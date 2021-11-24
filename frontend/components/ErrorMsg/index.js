import styled from 'styled-components'

const Error = styled.span`
    background-color: var(--error);
    color: #fff;
    padding: 10px 20px;
    border-radius: 5px;
  `

export default function ErrorMsg({msg}){
    return <Error>{msg}</Error>
}