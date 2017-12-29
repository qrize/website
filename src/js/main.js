import { h, render } from "preact";
import TryItContainer from "./tryit/tryit-container";
import WhyQrizeContainer from "./why/why-container";

const App = () => (
  <main className="main">
    <TryItContainer />
    <WhyQrizeContainer />
  </main>
);

render(<App />, document.body);
