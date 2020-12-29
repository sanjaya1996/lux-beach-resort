import React, { useState } from 'react';
import Styled from 'styled-components';

// #4BB543 primary color
// position: fixed;
// top: 80px;
// right: 20px;
// left: 20px;
const StyledAlert = Styled.div`
margin: auto;
margin-top: 20px;
width: 80vw;
max-width: 1000px;
text-align: center;
border-radius: 10px;
padding: 20px;
background-color: ${(props) =>
  props.type === 'error' ? '#FFD2D2' : '#DFF2BF'} ; 
color: ${(props) => (props.type === 'error' ? '#D8000C' : '#4F8A10')} ; 
margin-bottom: 15px;
display: ${(props) => (props.clicked ? 'none' : null)}
`;

// position: fixed;
// top: 5px;
// right: 10px;
const Closebtn = Styled.span`
float: right;
font-size: 1.2em;
margin-left: 15px;
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

const AlertBox = ({ message, type, onClose, noBtn }) => {
  const [alertClosed, setAlertClosed] = useState(false);
  return (
    <StyledAlert type={type} clicked={alertClosed}>
      <StyledParagraph>
        {!noBtn && (
          <Closebtn
            onClick={() => {
              setAlertClosed(true);
              onClose && onClose();
            }}
          >
            x
          </Closebtn>
        )}

        {message}
      </StyledParagraph>
    </StyledAlert>
  );
};

AlertBox.defaultProps = {
  type: 'error',
};

export default AlertBox;
