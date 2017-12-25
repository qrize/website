import { h, Component } from "preact";
import Qrize from "qrize";
import iconHtml from "../icon";

// See: https://github.com/qrize/qrize/blob/master/src/validators.js
const urlRegExp = {
  shema: /((?:http|ftp)s?:\/\/)/,
  domain: /(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,6}\.?|[A-Z0-9-]{2,}\.?)/,
  ip: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
  port: /(?::\d+)/,
  query: /(?:\/?|[/?]\S+)/
};

urlRegExp.composed = new RegExp(
  `^${urlRegExp.shema.source}?` +
    `(?:${urlRegExp.domain.source}|localhost|${urlRegExp.ip.source})` +
    `${urlRegExp.port.source}?` +
    `${urlRegExp.query.source}$`,
  "i"
);

class TryItForm extends Component {
  constructor() {
    super();
    this.state = { url: "", errorMessage: "", hasQR: false, time: null };

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
    this.setState({ url: event.target.value, errorMessage: "", hasQR: false });
  }

  handlePaste() {
    setTimeout(() => {
      if (this.isUrlValid()) {
        this.getQR();
      }
    }, 0);
  }

  handleReset() {
    this.setState({ url: "", errorMessage: "", hasQR: false });
    this.urlInput.focus();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getQR();
  }

  isUrlValid() {
    return urlRegExp.composed.test(this.state.url);
  }

  getQR() {
    if (!this.state.url) {
      this.showErrorMessage("Please, provide a link");
      return;
    }
    if (!this.isUrlValid()) {
      this.showErrorMessage("Unable to qrize this link. It is not a valid url");
      return;
    }
    const startTime = performance.now();
    this.qrize.createImg({
      url: this.state.url,
      onSuccess: () => {
        console.debug("QR code has been built");
        this.setState({
          hasQR: true,
          time: performance.now() - startTime
        });
      },
      onFailure: (errorStatus, errorText) => {
        this.showErrorMessage(`API error (${errorStatus}): ${errorText}`);
      }
    });
  }

  showErrorMessage(errorMessage) {
    this.setState({ errorMessage });
    console.debug(errorMessage);
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
            ref={input => {
              this.urlInput = input;
            }}
            value={this.state.url}
            onInput={this.handleInput}
            onPaste={this.handlePaste}
            spellCheck="false"
            autofocus
          />
          {/* reset button */}
          <button
            type="button"
            onClick={this.handleReset}
            className={`reset-btn ${this.state.url.length > 0 ? "show" : ""}`}
            dangerouslySetInnerHTML={iconHtml("x", { "stroke-width": 1 })}
            title="Clear input"
            aria-label="Clear input"
          />
          {/* submit button */}
          <button
            type="submit"
            className="submit-btn"
            disabled={this.state.hasQR}
          >
            {this.state.hasQR
              ? [
                  <span
                    aria-hidden="true"
                    dangerouslySetInnerHTML={iconHtml("check", {
                      "stroke-width": 1
                    })}
                  />,
                  <span>Done</span>
                ]
              : "Get QR code"}
          </button>
          {/* error message */}
          <div class={`error ${this.state.errorMessage && "show"}`}>
            {this.state.errorMessage}
          </div>
        </div>
        {/* real QR code */}
        <figure
          id="qr-target"
          className={`qr-holder ${this.state.hasQR ? "show" : ""}`}
        />
      </form>
    );
  }
}

export default TryItForm;
