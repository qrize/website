import "feather-icons";
import { h, render } from "preact";
import TryItContainer from "./tryit/tryit-container";

const App = () => (
  <main>
    <TryItContainer />
  </main>
);

render(<App />, document.body);
