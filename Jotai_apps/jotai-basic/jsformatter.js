state => {
  const atomState = readAtom(state, atom);
  
  if (atomState.e) {
     throw atomState.e; // read error
    }
  if (atomState.p) {
    throw atomState.p; // read promise
    }
  if (atomState.w) {
      throw atomState.w; // write promise
      }
  if ('v' in atomState) {
    return atomState.v;
  }
   throw new Error('no atom value');
}