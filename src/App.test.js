import { render } from '@testing-library/react';
import App from './App';

// 🔥 Mock Backpack components
jest.mock('@skyscanner/backpack-web/bpk-component-button', () => () => <button>Mock Button</button>);
jest.mock('@skyscanner/backpack-web/bpk-component-text', () => (props) => <div>{props.children}</div>);
jest.mock('@skyscanner/backpack-web/bpk-component-card', () => (props) => <div>{props.children}</div>);

// 🔥 Mock Backpack styles (IMPORTANT)
jest.mock('@skyscanner/backpack-web/bpk-stylesheets', () => ({}));

test('renders app without crashing', () => {
  render(<App />);
});