import styled from "styled-components";

export default styled.div`
  position: absolute;
  z-index: 9999;
  overflow: hidden;
  width: 7px;
  bottom: 2px;
  top: 2px;
  right: 1px;
  display: block;
  .indicator {
    box-sizing: border-box;
    position: absolute;
    border: 1px solid rgba(255, 255, 255, 0.9);
    border-radius: 3px;
    width: 100%;
    height: 572px;
    transform: translateY(0px) translateZ(1px);
    transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
    transition-duration: 0ms;
    ${(props) => props.theme.scroll.light};
  }
`;
