import React from "react";
import styled from "@emotion/styled";
import { LoginScreen } from "./login";
import { Card } from "antd";
export default function unAuthPage() {
  return(
    <Container>
      <ShadowCard>
        <Title>react+hooks</Title> 
        <LoginScreen />
      </ShadowCard>
    </Container>
  )
}


const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
  margin-top: 20rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Title = styled.div`
  color: #666;
  font-size:18px;
  padding-bottom:2rem ;
`