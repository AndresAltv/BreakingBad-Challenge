import { useEffect, useState } from 'react';
import elements from './data/elements';

type Letter = {
  letter: string,
  green: boolean
}

export const App: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [nameArr, setNameArr] = useState<Letter[]>([]);
  const [lastArr, setLastArr] = useState<Letter[]>([]);

  const handleClear = (): void => {
    setFirstName("");
    setLastName("");
    setNameArr([]);
    setLastArr([]);
  }

  const checkLetter = (word: string): Letter[] => {

    let placeholder: Letter[] = [];
    for (let i: number = 0; i < word.length; i++) {
      placeholder.push({ letter: word[i], green: false })
    }

    if (placeholder.length === 1) {
      let letter = placeholder[0].letter;
      let find: number = elements.findIndex((el) => el === letter);
      if (find !== -1) { placeholder[0].green = true }
    }
    
    if (placeholder.length > 1) {
      let letters = placeholder[0].letter + placeholder[1].letter;
      let find: number = elements.findIndex((el) => el === letters);
      if (find !== -1) {
        placeholder[0].green = true;
        placeholder[1].green = true;
      }
    }

    return placeholder;

  }

  useEffect(() => {

    setNameArr(checkLetter(firstName));

  }, [firstName])

  useEffect(() => {
    
    setLastArr(checkLetter(lastName));

  },[lastName])

  return (

    <div className="container">
      <div className="strings">
        {
          nameArr.length !== 0 &&
          nameArr.map((nam) =>
            !nam.green ? nam.letter : <span>{nam.letter}</span>
          )
        }
      </div>
      <div id="stringLast" className="strings">
        {
          lastArr.length !== 0 &&
          lastArr.map((nam) =>
            !nam.green ? nam.letter : <span>{nam.letter}</span>
          )
        }
      </div>

      <input id="firstInput" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <input id="lastInput" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <div className="actions">
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>

  )

}


export default App
