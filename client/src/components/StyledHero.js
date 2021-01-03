import styled from 'styled-components';

const StyledHero = styled.header`
  position: relative;
  min-height: 60vh;
  background: url(${(props) => props.img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StyledHero;
