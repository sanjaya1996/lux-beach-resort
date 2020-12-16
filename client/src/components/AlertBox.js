import React, { useState } from 'react';
import Styled from 'styled-components';

// #4BB543 primary color
const StyledAlert = Styled.div`
position: fixed;
top: 80px;
right: 20px;
left: 20px;
margin: auto;
width: 80vw;
max-width: 1000px;
text-align: center;
border-radius: 10px;
padding: 20px;
background-color: ${(props) =>
  props.type === 'error' ? '#cd472b' : '#4BB543'} ; 
color: white;
margin-bottom: 15px;
display: ${(props) => (props.clicked ? 'none' : null)}
`;

const Closebtn = Styled.span`
position: fixed;
top: 5px;
right: 10px;
font-size: 1.2em;
margin-left: 15px;
float: right;
line-height: 20px;
cursor: pointer;
transition: 0.3s;
:hover {
  color: black;
}

`;

const StyledParagraph = Styled.p`
margin: auto;
letter-spacing: 3px;
`;

const AlertBox = ({ message, type }) => {
  const [alertClosed, setAlertClosed] = useState(false);
  return (
    <StyledAlert type={type} clicked={alertClosed}>
      <StyledParagraph>
        {message}
        <Closebtn onClick={() => setAlertClosed(true)}>x</Closebtn>
      </StyledParagraph>
    </StyledAlert>
  );
};

AlertBox.defaultProps = {
  type: 'error',
};

export default AlertBox;
