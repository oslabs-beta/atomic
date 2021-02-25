/* eslint-disable no-console */
import React, { ReactNode } from 'react';

// List
function List<ListItem>({
  items,
  render,
}: {
  items: ListItem[];
  render: (item: ListItem) => ReactNode;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
}

const port = chrome.runtime.connect();

console.log('port in App --> ', port);

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line @typescript-eslint/no-unused-vars
port.onMessage.addListener(
  (message: {
    action: string;
    payload: Record<string, unknown>;
    sourceTab?: number;
  }) => {
    console.log('message in App is --> ', message);
  }
);

// const fiber = chrome.storage.sync.get('fiber', item => {
//   item;
// });

// console.log(fiber);

function App({ team }: { team: string }) {
  console.log('hello fro App.tsx');
  return (
    <>
      <strong>{team} :</strong>
      {/* <p>{localStorage.getItem('fiber')}</p> */}
      <List
        items={['Gio', 'Logan', 'Stanley', 'Chandni']}
        render={(item: string) => <div>{item}</div>}
      ></List>
    </>
  );
}

export default App;
