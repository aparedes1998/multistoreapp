import { html } from 'https://unpkg.com/lit-html?module';
import { login } from '../services/users.js';

const loginApp = () => {
  const handler = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    await login(email, password);
  };
  return html`
    <link href="./styles/login.css" rel="stylesheet" />
    <div class="content">
      <div class="grid">
        <form @submit=${handler}>
          <div class="field">
            <p>Email</p>
            <input name="email" type="email" placeholder="email" required />
          </div>
          <div class="field">
            <p>Password</p>
            <input
              name="password"
              type="password"
              placeholder="password"
              required
            />
          </div>
          <button class="netlify" type="submit">Login</button>
        </form>
      </div>
    </div>
  `;
};

export default loginApp;
