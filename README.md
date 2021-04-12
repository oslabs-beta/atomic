<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/chandnikat/atomic">
    <img src="assets/Atomic.jpeg" alt="Logo" width="800px">
  </a>

  <h3 align="center">Developer tool for Jotai applications.</h3>

  <p align="center">
    </br>
    <a href="https://www.atomictool.dev"><strong>Atomictool.dev</strong></a>
    </br>
    <a href="https://www.getatomos.io">View Demo</a>   
  </p>
</p>

<!-- ABOUT -->
<h1>About</h1>
<p>
Atomic is an open source chrome developer tool debugger for applications built with Jotai state management library. Atomic developer tool provides real-time snapshots of a Jotai application's atomic state and component structure allowing developers to easily debug and build an application that is more performant.
</br>
Key features of Atomic devtool include:
<ul>
<li>Time travel between snapshots within devtool
<li>Display state changes between snapshots
<li>Display component tree structure
<li>Dynamically rendering a component graph visualization with state changes
<li>Atom network data visualization for both atom dependents and atom read dependencies
</ul>
</p>


<!-- INSTALLATION -->
<h1>
Getting Started:
</h1>

1. #### Install Atomic Chrome extension
    Add Atomic devtool chrome extension to your chrome browser.

2. #### Install Atomic Module

    ```js
    npm install atomic-devtools
    ```

3. #### Import useAtomicDevtool & AtomicDebugger from the Atomic module

    ```js
    import { useAtomicDevtool, AtomicDebugger } from "atomic-devtools";
    ```

4. #### Integrate AtomicDebugger as a React component within the Jotai root AFTER Provider:

    ```js
    import AtomicDebugger from 'atomic-devtools';
    import { Provider } from "jotai";

    function App() {
    return (
    <Provider>
        <AtomicDebugger>
            Application Components
        </AtomicDebugger>
    </Provider>)
    }

    ReactDOM.render(<App/>,
    document.getElementById("root")
    );
    ```

5. #### Open your application on the Chrome Browser and start debugging with Atomic devtool!
    ##### (Only supported with React applications using Jotai as state management)