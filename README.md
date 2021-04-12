<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/chandnikat/atomic">
    <img src="assets/Atomic.jpeg" alt="Logo" width="800px">
  </a>
  <p align="center">
    </br>
    <a href="https://www.atomictool.dev"><strong>Atomictool.dev</strong></a>
    </br>
    <a href="https://www.getatomos.io">View Demo</a>   
  </p>
</p>

<h1>Developer tool for Jotai applications</h1>

[![gitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/oslabs-beta/atomic/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/atomic-devtools)](https://www.npmjs.com/package/atomic-devtools) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg?style=flat)](https://github.com/oslabs-beta/atomic/issues)


<!-- ABOUT -->
<h1>About</h1>
<p>
Atomic is an open source chrome developer tool debugger for applications built with Jotai state management library. Atomic developer tool provides real-time snapshots of a Jotai application's atomic state and component structure allowing developers to easily debug and build an application that is more performant.
</br>

Key features of Atomic devtool include:

- Time travel between snapshots within devtool
- Display state changes between snapshots
- Display component tree structure
- Dynamically rendering a component graph visualization with state changes
- Atom network data visualization for both atom dependents and atom read dependencies

</p>


<!-- INSTALLATION -->
<h1>
Getting Started
</h1>

1. #### Install Atomic Chrome extension.
    Add Atomic devtool chrome extension to your chrome browser.

2. #### Install Atomic Module.

    ```js
    npm install atomic-devtools
    ```

3. #### Import `useAtomicDevtool` & `AtomicDebugger` from the Atomic module.

    ```js
    import { useAtomicDevtool, AtomicDebugger } from "atomic-devtools";
    ```

4. #### Integrate `AtomicDebugger` as a React component within the Jotai root AFTER Provider.

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

5. #### Utilize `useAtomicDevtool` hook instead of useAtom hook to read an atom's value and provide a label within the functional component. 

    ```ts
    function useAtomicDevtool(atom, name: string)
    ```

    `useAtomicDevtool` is an Atomic hook that manages Atomic devtool integration for a particular atom. The hook accepts two invocation parameters, `atom` and `name`. `atom` is the atom that will be attached to the devtools instance. `name` is a parameter that labels the atom for the devtools instance.

    ### Example

    ```js
    import { useAtomicDevtool } from 'atomic-devtools'

    // Declare useAtomicDevtool hook inside functional component.
    const [value, updateValue] = useAtomicDevtool(anAtom, name)


6. #### Open your application on the Chrome Browser and start debugging with Atomic devtool!
    **Important**- Only supported with React applications using Jotai as state management.

<!-- FEATURES -->
<h1>
Features
</h1>

- ### Time Travel
    The ability to jump between state changes within the devtool. By pressing the jump button next to each snapshot, you are able to visualize state for a specific snapshot. 
- ### State Change
    Easily compare atom state changes between snapshots in real-time.
- ### Component Graph Visualization
    The ability to jump between state changes within the devtool. By pressing the jump button next to each snapshot, you are able to visualize state for a specific snapshot. 
- ### Atom Network Visualization of Dependents and Read Dependencies
    The ability to jump between state changes within the devtool. By pressing the jump button next to each snapshot, you are able to visualize state for a specific snapshot. 
- ### Component Tree
    The ability to jump between state changes within the devtool. By pressing the jump button next to each snapshot, you are able to visualize state for a specific snapshot. 

<!-- CORE TEAM -->
<h1>
Core Team
</h1>

- Logan Thies - [@Github](https://github.com/Thiesl137) - [@Linkedin](https://www.linkedin.com/in/loganthies137)
- Giovanni Lituma - [@Github](https://github.com/giovannixdev) - [@Linkedin](https://www.linkedin.com/in/giovanni-lituma)
- Stanley Huang - [@Github](https://github.com/stanleyhuang16) - [@Linkedin](https://www.linkedin.com/in/stanleyhuang16)
- Chandni Patel - [@Github](https://github.com/chandnikat) - [@Linkedin](www.linkedin.com/in/chandnip6
)
<!-- LICENSE -->
<h1>
License
</h1>

- Atomic was developed under tech accelerator OSLabs.
- This project is licensed under the MIT License.