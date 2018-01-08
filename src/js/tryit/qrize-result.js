import { h, Component } from "preact";
import Qrize from "qrize";
import iconHtml from "../icon";

const REDIRECTOR_ENDPOINT = "https://qrize.me/<hash>";

// See: https://blog.qrstuff.com/2011/11/23/qr-code-minimum-size
const QR_CODE_SIZES = [
  { modules: 25, chars: 26 },
  { modules: 30, chars: 49 },
  { modules: 35, chars: 72 },
  { modules: 40, chars: 98 },
  { modules: 45, chars: 125 },
  { modules: 50, chars: 163 },
  { modules: 55, chars: 203 },
  { modules: 60, chars: 249 },
  { modules: 65, chars: 298 },
  { modules: 70, chars: 351 },
  { modules: 75, chars: 407 },
  { modules: 80, chars: 468 },
  { modules: 85, chars: 534 },
  { modules: 90, chars: 601 },
  { modules: 95, chars: 669 },
  { modules: 100, chars: 739 }
];

/**
 * Get a minimal QR code square area
 * @param {Number} chars - url length
 */
function getQRCodeSizeFromUrl({ length }) {
  let edge = QR_CODE_SIZES[QR_CODE_SIZES.length - 1].modules;
  for (let i = 0; i < QR_CODE_SIZES.length; i += 1) {
    const SIZE = QR_CODE_SIZES[i];
    if (length <= SIZE.chars) {
      edge = SIZE.modules;
      break;
    }
  }
  return edge ** 2;
}

class QrizeResult extends Component {
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
      this.props.onQRStatusUpdate(null);
    } else {
      this.getQR(nextProps.url);
    }
  }

  getQR(url) {
    const startTime = performance.now();
    this.qrize.createImg({
      url,
      onSuccess: ({ hash }) => {
        console.debug("QR code has been built");
        const redirectorUrl = REDIRECTOR_ENDPOINT.replace("<hash>", hash);
        const time = Math.round(performance.now() - startTime);
        const minificationRatio =
          getQRCodeSizeFromUrl(this.props.url) /
          getQRCodeSizeFromUrl(redirectorUrl);
        this.setState({
          visible: true,
          redirectorUrl,
          time,
          minificationRatio
        });
        this.props.onQRStatusUpdate(null);
      },
      onFailure: (errorStatus, errorText) => {
        this.props.onQRStatusUpdate({ errorStatus, errorText });
      }
    });
  }

  render() {
    return (
      <div
        className={`qr-holder ${this.state.visible ? "" : "hide"}`}
        tabindex="0"
      >
        <figure>
          <div id="qr-target" />
          <figcaption className="details">
            {/* short link */}
            <dl className="details-group">
              <dt>
                <span
                  className="glyph"
                  aria-label="Short link"
                  dangerouslySetInnerHTML={iconHtml("link-2", {
                    width: 16,
                    height: 16
                  })}
                />
              </dt>
              <dd title="Short link that leads to the original url">
                <a
                  href={this.state.redirectorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {this.state.redirectorUrl}
                </a>
              </dd>
            </dl>
            {/* time taken */}
            <dl className="details-group">
              <dt>
                <span
                  className="glyph"
                  aria-label="Time taken"
                  dangerouslySetInnerHTML={iconHtml("zap", {
                    width: 18,
                    height: 18
                  })}
                />
              </dt>
              <dd
                title={`It took ${this.state
                  .time}ms to shorten a link and render a QR code`}
              >
                Rendered in {this.state.time}ms
              </dd>
            </dl>
            {/* times smaller */}
            <dl className="details-group">
              <dt>
                <span
                  className="glyph"
                  aria-label="Times smaller"
                  dangerouslySetInnerHTML={iconHtml("minimize-2", {
                    width: 18,
                    height: 18
                  })}
                />
              </dt>
              <dd
                title={
                  this.state.minificationRatio > 1
                    ? `Qrized QR code is ${this.state
                        .minificationRatio} times smaller than regular`
                    : "The size of a minified QR code is the same as of regular"
                }
              >
                {this.state.minificationRatio}x smaller
                {this.state.minificationRatio > 1 ? "" : " (try longer url)"}
              </dd>
            </dl>
          </figcaption>
        </figure>
        <span class="hint">
          <span
            dangerouslySetInnerHTML={iconHtml("corner-left-up", {
              width: 18,
              height: 18
            })}
          />
          <span>Hover to see details</span>
        </span>
      </div>
    );
  }
}

export default QrizeResult;
