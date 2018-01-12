import { h, render } from "preact";
import "./scss/main.scss";
import TryItContainer from "./1__tryit/tryit-container";
import WhyQrizeContainer from "./2__why/why-container";
import HowToUseContainer from "./3__howto/howto-container";
import GitHubContainer from "./4__github/github-container";
import FooterContainer from "./5__footer/footer-container";

const App = () => (
  <main className="main">
    <TryItContainer />
    <WhyQrizeContainer />
    <HowToUseContainer />
    <GitHubContainer />
    <FooterContainer />
  </main>
);

render(<App />, document.body);
