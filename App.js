import React from "react";
import Main from "./src/Main";
import { Root } from "native-base";

export class App extends React.Component {
  render() {
    return (
      <Root>
        <Main />
      </Root>
    );
  }
}

export default App;
