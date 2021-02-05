import { html } from 'https://unpkg.com/lit-html?module';
import { register } from '../services/users.js';

const signupApp = () => {
  const handler = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    await register(username, email, password);
  };
  return html`
    <link href="./styles/login.css" rel="stylesheet" />
    <div class="content">
      <div class="grid">
        <form @submit=${handler}>
          <div class="field">
            <p>Username</p>
            <input
              name="username"
              type="text"
              placeholder="username"
              required
            />
          </div>
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
          <div class="field">
            <p>Confirm Password</p>
            <input
              name="cpassword"
              type="password"
              placeholder="confirm password"
              required
            />
          </div>
          <button class="netlify" type="submit">Register</button>
        </form>
      </div>
    </div>
  `;
};

export default signupApp;
