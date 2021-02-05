import { html } from 'https://unpkg.com/lit-html?module';
import { main, stores } from '../scripts/index.js';
import { logout } from '../services/users.js';

export default (content) => html`
  <link href="./styles/authenticated.css" rel="stylesheet" />
  <div class="a-header">
    <div>
      <button @click=${main}>Multistore</button>
      <button @click=${stores}>My Stores</button>
    </div>
    <div class="a-logout">
      <button @click=${logout}>Logout</button>
    </div>
  </div>
  <div class="a-body">
    ${content}
  </div>
  <div class="a-footer">
    <p>Web programming 2020</p>
    <p>Group 1</p>
  </div>
`;
