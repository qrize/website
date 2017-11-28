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
          />
          <input type="submit" value="Get QR code" className="submit-btn" />
        </div>
        {/* Real QR code */}
        <figure id="qr-target" className="qr-holder" />
        {/* QR code placeholder */}
        <figure id="qr-placeholder" className="qr-holder">
          <img
            src="data:image/gif;base64,R0lGODdhfQB9AIAAAAAAAP///ywAAAAAfQB9AAAC/4SPqbvhnp58rE0Zcd28+z9lFwSO5BF+6spaFGKeXRyIcovnVYrGKm2r6YbE3ss4+vlgmmKJBr3xZk1D9GitAq7RDRcaVGK33DDza/Ki0+ebevw1I9faIF1a32njbeH87ucCiDf2RtjVZ3dnGMgxRXblxChHVZj4dAgmyfD4OKlnyblXtinY6AnqdunRSVpKCakqGppFq9Aa+QqLOitb63s7mvu3RMw2JwbMa6p4/KtpnLRaqZzXe+r6DNS3jYzZCPsZfdEsPY4LHD7tKIx43g79nAy+Li6PsxzsHEt/bc8Oxxq1fqbQEdRXzdYugQDTcYM379+/fBJTkatnsaI/jP+sGJbDppCjtkXrut3b6O3dsIIkU44MaMvgRz7XAC3cl0/mQzqMbJYsdpLZz0EJid40FxQhyEw+daFMqtMlP6dUhUqNCtVjVUlYpw7NtDWs16sQvx4UW6Sr2rJVifIUqXSe27l0YTqU2rOu3kHqnjbcC7hlUo0sAxt2Nzjjt8MhxxFWapDiYq0d9/UtzJTyQMmVkcadbPciEZM6SF+GDI/zZs1/c7ImbRof0M94d4K1qJqf69ATGcL2PTtvTLZWEzuGG7smcN6Kax93/vJu9INdj1Kfvduz8KJLrzfe9Pv72KzDmaPVTfyv9d7inYSXPj5+9u7np59ejzx92PdnzZ7/zs1YZm5tJ9p08wU2k2Co4ZTNgnol+JZyDK7kYF0QrkFgZMHZZiGHTWFWIHp7yaUfh+wZ5eGGEt62oncCYpiiZbiV+FxxIsKoknYzmgfiiXzFqGOL/6lIHorQ3Ujfjp4lxwJNNn40JIVMruAkbT3mJyWRVDYY5ZLLIYake1xi6WV5YE5JooydhSimmkV2B+BrWuYw5VpuWtkaa2lyZ12c4qEp2512Bvmkkv21UGd6gJJFIZT+NffmhYYRiJ9fgwZIaJiPWqooplry12WSjHrKpomb2ngpXT5WZ6ijo2H3JZw0XlljabCaKSuPeYaWG6Vk5sriarzq2eqvrhpHq31p/91KqoZZTnhmp81K6uyLIaYaILWpbQutqAYCpu2w4pYZLJIIAnkts/HIR+yrEb55qa/nfchut6H2uuy79ZLrbYX1mavusfu6WGpbClbb74Gx0quwvpIKnGGDDeMIIsJ7onGvgg+buibDC2uMLsSGVjkxxiNzC5+f1mbcXqCZqgxsvyKXkuifKMvMMVU1p3wzy/DR+amc4+Jcqy47Hwpvz6fiCbSuqyo9KsFtlvv00JUWiuisePIXL6S2Ou0119LymS/VYY+NtKa1Lors1mhfLDDb8fl49a4r56zeN3XDbDHej+2tddzq8n0w1BXHGnG3Hlt9Mq6J87v43S3O93i6AzGaVTLljUNeOOOTI755weB93DKnirc7RMlTxzyzzqT/fPbppaf+etpVS46W6mWzjncBADs="
            width="125"
            height="125"
          />
        </figure>
      </form>
    );
  }
}

export default TryItForm;
