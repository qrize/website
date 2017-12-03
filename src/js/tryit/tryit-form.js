import { h, Component } from "preact";
import Qrize from "qrize";

class TryItForm extends Component {
  constructor() {
    super();
    this.state = { url: "", hasQR: false };

    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.qrize = new Qrize({
      element: document.getElementById("qr-target"),
      cellSize: 5
    });
  }

  handleUrlChange(event) {
    this.setState({ url: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.qrize.createImg({
      url: this.state.url,
      onSuccess: () => {
        console.debug("QR code has been built");
        this.setState({ hasQR: true });
      }
    });
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className={this.state.hasQR ? "has-qr" : ""}
      >
        <div role="group" className="input-group">
          <input
            type="url"
            name="url"
            className="url-input"
            placeholder="Paste a link"
            value={this.state.url}
            onChange={this.handleUrlChange}
            autofocus
            required
          />
          <input type="submit" value="Get QR code" className="submit-btn" />
        </div>
        {/* Real QR code */}
        <figure id="qr-target" className="qr-holder" />
      </form>
    );
  }
}

export default TryItForm;
