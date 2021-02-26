import React, { ReactNode } from 'react';

interface NavBarProps {
  setTab: React.Dispatch<React.SetStateAction<string>>;
  tabsList: string[];
  tab: string;
}

function NavBar({ setTab, tabsList, tab }): ReactNode {
  const tabButtons = tabsList.reduce<JSX.Element[]>((acc, name) => {
    acc.push(
      <button
        className="navBarButtons"
        key={name}
        style={
          tab === name
            ? { color: '#1cb5c9', backgroundColor: '#212121' }
            : { color: '#e6e6e6' }
        }
        onClick={() => {
          setTab(name);
        }}
      >
        {name}
      </button>
    );
    return acc;
  }, []);
  // render the array of NavBar buttons generated above
  return <div className="navBar">{tabButtons}</div>;
}

export default NavBar;
