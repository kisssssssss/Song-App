import styled from "styled-components";

export default styled.div`
  -webkit-app-region: drag;
  margin-bottom: 7px;
  span,
  input {
    -webkit-app-region: no-drag;
  }

  .input {
    float: left;
    max-width: 230px;
    min-width: 230px;
  }

  .btn {
    padding: 8px 12px;
    transition: all 300ms ease;
    border-radius: 4px;
    &:hover {
      color: ${(props) => props.theme.themeColor.color6};
      background-color: ${(props) => props.theme.neutralColor.gray4};
    }
  }

  .spin:hover > svg {
    transform: rotateZ(180deg);
    transition: transform 400ms ease;
  }
`;
