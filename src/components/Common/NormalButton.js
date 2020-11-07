import React from "react";
import styled from "styled-components";

const ButtonContainer = styled.button`
  background-color: skyBlue;
`;

export default function Button({ children, ...props }) {
  return <ButtonContainer {...props}> {children}</ButtonContainer>;
}
