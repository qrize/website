import { h, Component } from "preact";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace";

class PrismCode extends Component {
  componentDidMount() {
    this.hightlight();
  }

  componentDidUpdate() {
    this.hightlight();
  }

  hightlight() {
    Prism.highlightElement(this.domNode);
  }

  render() {
    const { className, children } = this.props;

    return (
      <pre class="normalize-whitespace">
        <code
          ref={domNode => {
            this.domNode = domNode;
          }}
          className={className}
        >
          {children}
        </code>
      </pre>
    );
  }
}

export default PrismCode;
