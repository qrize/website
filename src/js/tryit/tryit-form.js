import { h, Component } from "preact";
import iconHtml from "../icon";
import TryItResult from "./tryit-result";

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

function isUrlValid(url) {
  return urlRegExp.composed.test(url);
}

class TryItForm extends Component {
  constructor() {
    super();
    this.state = { url: "", input: "", errorMessage: "", hasQR: false };

    this.handleInput = this.handleInput.bind(this);
    this.handlePaste = this.handlePaste.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    this.setState({
      input: event.target.value,
      url: "",
      errorMessage: ""
    });
  }

  handlePaste() {
    // let input event change state first, then get QR code
    setTimeout(() => {
      if (isUrlValid(this.state.input)) {
        this.getQR();
      }
    }, 0);
  }

  handleReset() {
    this.setState({ input: "", url: "", errorMessage: "" });
    this.urlInput.focus();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getQR();
  }

  getQR() {
    if (!this.state.input) {
      this.showErrorMessage("Please, provide a link");
      return;
    }
    if (!isUrlValid(this.state.input)) {
      this.showErrorMessage("Unable to qrize this link. It is not a valid url");
      return;
    }
    this.setState({ url: this.state.input }); // pass url to TryitResult
  }

  showErrorMessage(errorMessage) {
    this.setState({ errorMessage });
  }

  handleQRStatusUpdate(error) {
    const errorMessage = error
      ? `API error ${error.errorStatus}: ${error.errorText}`
      : "";
    this.showErrorMessage(errorMessage);
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
            value={this.state.input}
            onInput={this.handleInput}
            onPaste={this.handlePaste}
            spellCheck="false"
            autofocus
          />
          {/* reset button */}
          <button
            type="button"
            onClick={this.handleReset}
            className={`reset-btn ${this.state.input.length > 0 ? "show" : ""}`}
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
            <span className="button-content">
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
            </span>
          </button>
          {/* error message */}
          <div class={`error ${this.state.errorMessage && "show"}`}>
            {this.state.errorMessage}
          </div>
        </div>
        {/* QR code */}
        <TryItResult
          url={this.state.url}
          onQRStatusUpdate={this.handleQRStatusUpdate.bind(this)}
        />
      </form>
    );
  }
}

export default TryItForm;
