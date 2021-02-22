import React, { useState } from 'react';

function NavBar({ setTab, tabsList, tab }) {
  const tabButtons = tabsList.reduce((acc, name) => {
    acc.push(
      <button
        className="navBarButtons"
        key={name}
        style={
          tab === name
            ? { color: '#1cb5c9', backgroundColor: '#212121' }
            : { color: '#989898' }
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
