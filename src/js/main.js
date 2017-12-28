import { h, render } from "preact";
import TryItContainer from "./tryit/tryit-container";
import WhyQrize from "./why/why-container";

const App = () => (
  <main className="main">
    <TryItContainer />
    <WhyQrize />
  </main>
);

render(<App />, document.body);
