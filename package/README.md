<!-- BANNER LOGO
<br />
<p align="center">
    <a href="https://www.atomictool.dev"><img src="./assets/atomic-banner.png" alt="atomic banner"></a>
</p> -->

<h1>Developer tool for Jotai applications</h1>

[![gitHub license](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/oslabs-beta/atomic/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/atomic-devtools)](https://www.npmjs.com/package/atomic-devtools) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg?style=flat)](https://github.com/oslabs-beta/atomic/issues) 

<!-- ABOUT -->
<h1>About</h1>
<p>
Atomic is an open source Google Chrome developer tool designed for  applications built using Jotai as a  state management library. Atomic developer tool provides real-time snapshots of a Jotai application's atomic state and component structure allowing developers to visually inspect their application state and to readily determine development solutions.
</br>

Key features of Atomic devtool include:

- Display state changes between snapshots
- Display component tree structure
- Dynamically rendering graphic component visualization with state changes
- Atom network data visualization for both atom dependents and atom read dependencies

</p>

<!-- INSTALLATION -->
<h1>
Getting Started
</h1>

1. #### Install Atomic Chrome extension.

   Add Atomic [Chrome extension](https://chrome.google.com/webstore/detail/atomic-dev-tool/nnchkolpjdpkpbolophmdkglenapodbo) to your chrome browser.

2. #### Install atomic-devtools Module.

   ```js
   npm install atomic-devtools
   ```

3. #### Import `useAtomicDevtool` & `AtomicDebugger` from the Atomic module.

   ```js
   import { useAtomicDevtool, AtomicDebugger } from 'atomic-devtools';
   ```

4. #### Integrate `AtomicDebugger` as a React component within the application wrapping all application components intended to debug.

   - _`AtomicDebugger` currently extracts Jotai State from it's `Provider` Component. Implementation is required_

   - _Placement of `AtomicDebugger` component relative to `App` component or `Provider` component is not important, so long as all stateful components are children of `AtomicDebugger`_

   - _`ReactDOM.Render( )` Must receive a document \*\*_'root'_\*\* element from the application as it's argument._

   - _Currently, only intended to be used with a single `Provider` component._

   ```js
   import AtomicDebugger from 'atomic-devtools';
   import { Provider } from 'jotai';

   function App() {
     return (
        <AtomicDebugger>
            <Provider>
                {Application Components}
            </Provider>
       </AtomicDebugger>
     );
   }

   ReactDOM.render(<App />, document.getElementById('root'));

   ```

5. #### While developing your application, utilize `useAtomicDevtool` hook in place of Jotai's `useAtom` hook to send atom's config to Atomic Devtools.

   ```ts
   function useAtomicDevtool(atom: anyAtom, name: string);
   ```

   `useAtomicDevtool` is an Atomic hook that manages Atomic devtool integration for a particular atom. The hook accepts two arguments, `atom` and `name`. `atom` is the atom that will be connected to the devtools instance. `name` is a string label for identifying the atom for the devtools instance.

   ### Example

   ```js
   import { useAtomicDevtool } from 'atomic-devtools';

   const anAtom = atom('example')


   function SomeComponent() {
        const [value, updateValue] = useAtomicDevtool(anAtom, 'anAtomName');

        ...
   }
   ```

6. #### Open your application on the Chrome Browser and start debugging with Atomic devtool!

   **Important**- Only supported with React applications using Jotai as state management.

   **Important**- Only intended for development (`NODE_ENV === 'development'`).

<!-- FEATURES -->
<h1>
Features
</h1>

- ### State Change Display

  Easily compare atom state changes between snapshots in real-time.

    <!-- <img src="assets/stateDiff.gif" alt="stateDiff GIF" width="600px"> -->

- ### Component Graph Visualization

  Atomic provides a data visualization of an applications React component tree. Have the ability to see a hierarchical view of all the React components in an application. The component graph provides the locations of each useAtom invocation per components, as well provides real-time data on an atom's value, dependents, and read dependencies for a specific snapshot.

    <!-- <img src="assets/componentGraph.gif" alt="componentGraph GIF" width="600px"> -->

- ### Atom Network Visualization of Dependents and Read Dependencies

  Visualize an atom's dependents
  _(displays all atoms affected by an atom)_ and read dependencies _(displays all atoms that affect the inspected atom)_.

    <!-- <img src="assets/atomNetwork.gif" alt="atomNetwork GIF" width="600px"> -->

- ### Component Tree

  Displays the applications React component structure with subscribed atom(s) for a given snapshot.

    <!-- <img src="assets/componentTree.gif" alt="componentTree GIF" width="600px"> -->

<h1>
WIP
</h1>

- ### Time Travel
  Currently, the ability to jump between state changes within the devtool is feasible. The snapshot list provides the state throughout the Jotai-built application runtime and each time state changes, a new snapshot is added. We intend to develop functionality that will, pressing the jump button next to each snapshot, revert application state to the desired historical snapshot.

<!-- CORE TEAM -->
<h1>
Core Team
</h1>

- Logan Thies - [Github](https://github.com/Thiesl137) | [Linkedin](https://www.linkedin.com/in/loganthies137)
- Giovanni Lituma - [Github](https://github.com/giovannixdev) | [Linkedin](https://www.linkedin.com/in/giovanni-lituma)
- Stanley Huang - [Github](https://github.com/stanleyhuang16) | [Linkedin](https://www.linkedin.com/in/stanleyhuang16)
- Chandni Patel - [Github](https://github.com/chandnikat) | [Linkedin](https://www.linkedin.com/in/chandnip6)
  <!-- LICENSE -->
  <h1>
  License
  </h1>

- This project is licensed under the MIT License.

#### Atomic was developed under tech accelerator OSLabs.
