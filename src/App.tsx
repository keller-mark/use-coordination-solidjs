import type { Component } from 'solid-js';
import { useCounter } from './hooks';

import logo from './logo.svg';
import styles from './App.module.css';

const App: Component = () => {
  const [count, { increment, decrement }] = useCounter();
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Counter: <code>{count()}</code>
          <button onClick={increment}>+</button>
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default App;
