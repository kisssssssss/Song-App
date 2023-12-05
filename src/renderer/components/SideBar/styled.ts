import styled from "styled-components";

export default styled.div`
  height: 100%;
  .scroll {
    background-color: ${(props) => props.theme.backgroundColor};
    border-radius: 7px;
  }
  .menu {
    background-color: ${(props) => props.theme.backgroundColor};
    border-radius: 7px;
    padding: 20px 0;
  }
`;
