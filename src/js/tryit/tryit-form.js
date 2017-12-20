import { h, Component } from "preact";
import Qrize from "qrize";
import iconHtml from "../icon";

class TryItForm extends Component {
  constructor() {
    super();
    this.state = { url: "", hasQR: false, time: null };

    this.handleInput = this.handleInput.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.qrize = new Qrize({
      element: document.getElementById("qr-target"),
      cellSize: 5
    });
  }

  handleInput(event) {
    this.setState({ url: event.target.value, hasQR: false });
  }

  handlePaste() {
    setTimeout(() => {
      this.getQR();
    }, 0);
  }

  handleReset() {
    this.setState({ url: "", hasQR: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getQR();
  }

  getQR() {
    const startTime = performance.now();
    this.qrize.createImg({
      url: this.state.url,
      onSuccess: () => {
        console.debug("QR code has been built");
        this.setState({
          hasQR: true
        });
      }
    });
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className={`tryit-form ${this.state.hasQR ? "has-qr" : ""}`}
        autocomplete="off"
      >
        <div role="group" className="input-group">
          {/* input */}
          <input
            type="text"
            name="url"
            className="url-input"
            placeholder="Paste a link"
            value={this.state.url}
            onInput={this.handleInput}
            onPaste={this.handlePaste}
            spellcheck="false"
            autofocus
            required
          />
          {/* reset button */}
          <button
            type="button"
            onClick={this.handleReset}
            className={`reset-btn ${this.state.url.length > 0 ? "show" : ""}`}
            dangerouslySetInnerHTML={iconHtml("x", { "stroke-width": 1 })}
          />
          {/* submit button */}
          <button type="submit" className="submit-btn">
            {this.state.hasQR
              ? [
                  <span
                    dangerouslySetInnerHTML={iconHtml("check", {
                      "stroke-width": 1
                    })}
                  />,
                  <span>Done</span>
                ]
              : "Get QR code"}
          </button>
        </div>
        {/* real QR code */}
        <figure id="qr-target" className="qr-holder" />
      </form>
    );
  }
}

export default TryItForm;
