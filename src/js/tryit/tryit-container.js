import { h, Component } from "preact";
import TryItForm from "./tryit-form";

const TryItContainer = () => (
  <section className="try-it">
    <h1>
      <strong>QR code</strong> and <strong>URL shortener</strong> got married.
    </h1>
    <p>Generate tiny QR codes of your web-pages</p>
    <TryItForm />
  </section>
);

export default TryItContainer;
