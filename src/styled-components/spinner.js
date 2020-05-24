import styled from "styled-components";
import { Spinner as ReactSpinner } from "reactstrap";
export const SpinnerDiv = styled.div`
  display: flex;
  justify-content: center;
  width: 100px;
  margin: 50px auto;
`;
export const Spinner = styled(ReactSpinner)`
  width: 100px;
  height: 100px;
`;
