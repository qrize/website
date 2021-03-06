import { h, Component } from 'preact';
import './scss/tryit-container.scss';
import TryItForm from './tryit-form';

const TryItContainer = () => (
  <div className="try-it">
    <section className="section">
      <header>
        <h1 className="title">
          <strong>QR code</strong> and <strong>URL shortener</strong> got married 🎉
        </h1>
        <p class="try-qrize">
          Create <strong>tiny QR codes</strong> for your web-pages. Check it out:
        </p>
      </header>
      <TryItForm />
    </section>
  </div>
);

export default TryItContainer;
