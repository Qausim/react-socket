import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
  & {
    display: flex;
    color: #ffffff;
    min-width: 100vw;
    min-height: 100vh;
    justify-content: center;
    align-items: center;
  }

  p {
    font-size: 36px;
    font-weight: bold;
    font-family: cursive;
  }
`;

const Error404 = () => {
  return (
    <Wrapper className='outerContainer'>
      <p>Error: 404</p>
    </Wrapper>
  );
};
 
export default Error404;