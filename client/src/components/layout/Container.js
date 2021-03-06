import React from 'react';
import styled from 'styled-components';

const StyledDivWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #0038F5;

`;

const StyledDiv = styled.div`
  height: 91%;
  width: 100%;
  position: absolute;
  top: 110px;

  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-content: center;

  border-radius: 40px;
  background-color: white;
  box-shadow: 0px 3px 5px 2px rgba(0, 0, 0, 0.13);

  z-index: 10;

`;

const StyledDivContent = styled.div`
  width: 315px;
  height: 100%;
  margin-top: -100px;
`;

const Container = (props) => {
  return (
    <StyledDivWrapper className="container">
      <StyledDiv>
        <StyledDivContent>{props.children}</StyledDivContent>
      </StyledDiv>
    </StyledDivWrapper>
  );
};

export default Container;
