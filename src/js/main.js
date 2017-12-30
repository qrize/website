import { h, render } from "preact";
import TryItContainer from "./tryit/tryit-container";
import WhyQrizeContainer from "./why/why-container";
import HowToUseContainer from "./howto/howto-container";
import GitHubContainer from "./github/github-container";
import FooterContainer from "./footer/footer-container";

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
