import styled from "styled-components";

const Button = styled.button`
  outline: none;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition-duration: 0.3s;
  color: black;

  &.reload:active {
    transform: translateY(3px);
    background-color: #21b7cb;
  }

  &.reload {
    float: right;
    background-color: #2ae0f8;
  }

  &.toggle {
    float: right;
    margin-right: 10px;
    color: var(--background);
    background-color: var(--foreground);
  }
`;

export default Button;
