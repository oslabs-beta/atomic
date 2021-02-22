import React, {useState} from 'react';

function NavBar({setTab, tabsList, tab}) {
  const renderedTabButtons = tabsList.reduce((acc, tabName) => {
    acc.push(
      <button
        className="navBarButtons"
        key={tabName}
        style={
          tab === tabName
            ? {color: '#E6E6E6', backgroundColor: '#212121'}
            : {color: '#989898'}
        }
        onClick={() => {
          setTab(tabName);
        }}>
        {tabName}
      </button>,
    );
    return acc;
  }, []);
  // render the array of NavBar buttons generated above
  return <div className="NavBar">{renderedTabButtons}</div>;
}

export default NavBar;
