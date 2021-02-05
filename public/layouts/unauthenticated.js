import { html } from 'https://unpkg.com/lit-html?module';
import { main, login, signup } from '../scripts/index.js';

const layout = (content) => html`
  <link href="./styles/unauthenticated.css" rel="stylesheet" />
  <div class="ua-header">
    <div>
      <button @click=${main}>Multistore</button>
    </div>
    <div class="ua-login">
      <button @click=${login}>Login</button>
      <button @click=${signup}>Sign Up</button>
    </div>
  </div>
  <div class="ua-body">
    ${content}
  </div>
  <div class="ua-footer">
    <p>Web programming 2020</p>
    <p>Group 1</p>
  </div>
`;

export default layout;
