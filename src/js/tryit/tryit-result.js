import { h, Component } from "preact";
import Qrize from "qrize";

class TryItResult extends Component {
  constructor() {
    super();
    this.state = { url: "", visible: false, time: null };
  }

  componentDidMount() {
    this.qrize = new Qrize({
      element: document.getElementById("qr-target"),
      cellSize: 5
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url === this.props.url) {
      return;
    }
    if (!nextProps.url) {
      this.setState({ visible: false });
    } else {
      this.getQR(nextProps.url);
    }
  }

  getQR(url) {
    const startTime = performance.now();
    this.qrize.createImg({
      url,
      onSuccess: () => {
        console.debug("QR code has been built");
        this.setState({
          visible: true,
          time: performance.now() - startTime
        });
        this.props.onQRStatusUpdate();
      },
      onFailure: (errorStatus, errorText) => {
        this.props.onQRStatusUpdate({ errorStatus, errorText });
      }
    });
  }

  render() {
    return (
      <figure className={`qr-holder ${this.state.visible ? "show" : ""}`}>
        <div id="qr-target" />
        <figcaption />
      </figure>
    );
  }
}

export default TryItResult;
