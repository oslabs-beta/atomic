import React, {useState} from 'react';
import NavBar from "../components/NavBar/NavBar"
import StateTree from "../components/StateTree3D/StateTree"

function VisualContainer() {
  const [tab, setTab] = useState<string>('Atom Network');

  const navLists = {
    "State Tree 3D": (<StateTree/>),
    "Atom Network": (<p>Atom Network</p>),
    "Component tree":(<p>Component tree</p>)
  }

  const tabsList: string[] = Object.keys(navLists);
  return (
    <div className="VisualContainer">
    <NavBar setTab={setTab} tabsList={tabsList} tab={tab} />
    {navLists[tab]}
  </div>
  );
}

export default VisualContainer;
