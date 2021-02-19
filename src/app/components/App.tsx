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

function App({ team }: { team: string }) {
  console.log('hello fro App.tsx');
  return (
    <>
      <strong>{team} :</strong>
      <List
        items={['Gio', 'Logan', 'Stanley', 'Chandni']}
        render={(item: string) => <div>{item}</div>}
      ></List>
    </>
  );
}

export default App;
