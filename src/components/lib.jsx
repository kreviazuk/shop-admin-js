import styled from "@emotion/styled";
import React from "react";
import { Button, Spin, Typography } from "antd";


const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size={"large"} />
  </FullPage>
);

export const FullPageErrorFallback = (error) => (
    <FullPage>
      <ErrorBox error={error} />
    </FullPage>
);


export const ErrorBox = ( error ) => {
  if (error) {
    return <Typography.Text type={"danger"}>{error.message}</Typography.Text>;
  }
  return null;
};

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;