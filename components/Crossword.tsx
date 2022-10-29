import {useEffect, useState} from 'react';
import styled from 'styled-components';
import Square, {Colour} from './Square';

namespace S {
  export const Grid = styled.div`
    display: flex;
    margin: 3rem auto;
  `;

  export const Row = styled.div``;
}

const GRID = 15;

type Word = {
  direction: 'across' | 'down';
  start: {column: number; row: number};
  length: number;
  letters: string[];
  valid: boolean;
};

const Crossword = () => {
  const [grid, setGrid] = useState(
    Object.assign(
      {},
      Array.from(Array(GRID), () =>
        Object.assign(
          {},
          Array.from(new Array(GRID), () => ''),
        ),
      ),
    ),
  );

  const [words, setWords] = useState<Word[]>([]);

  const discoverWords = (squares, direction: Word['direction'], index: number): Word[] => {
    const downSquares: (string | null)[] = Object.values(squares);
    return downSquares.reduce((words: Word[], square, i) => {
      if (typeof square === 'string' && [undefined, null].includes(downSquares[i - 1])) {
        const nextNull = downSquares.indexOf(null, i);
        const word = downSquares.slice(i, nextNull > 0 ? nextNull : downSquares.length);
        if (word.length < 3) {
          return words;
        }
        return [
          ...words,
          {
            start: direction == 'across' ? {row: index, column: i} : {row: i, column: index},
            length: word.length,
            direction,
            valid: word.length > 2,
            letters: word,
          },
        ];
      } else {
        return words;
      }
    }, []);
  };

  useEffect(() => {
    const down = Object.values(Object.keys(grid).map((row) => grid[row]));
    const across = Object.keys(grid).map((row) => Object.keys(grid[row]).map((col) => grid[col][row]));
    const downWords: Word[] = down.flatMap((squares, i) => discoverWords(squares, 'down', i));
    const acrossWords: Word[] = across.flatMap((squares, i) => discoverWords(squares, 'across', i));
    setWords([...acrossWords, ...downWords]);
  }, [grid]);

  const toggleSquare = (row: number, column: number) => {
    let newState = null;
    if (grid[column][row] === null) {
      newState = '';
    }
    if (GRID - 1 === column * 2) {
      setGrid({...grid, [column]: {...grid[column], [row]: newState, [GRID - row - 1]: newState}});
    } else {
      setGrid({
        ...grid,
        [column]: {...grid[column], [row]: newState},
        [GRID - column - 1]: {...grid[GRID - column - 1], [GRID - row - 1]: newState},
      });
    }
  };

  const getColour = (row: number, column: number): Colour => {
    if (grid[column][row] === null) {
      return 'black';
    }
    if (words.find((word) => word.start.row === row && word.start.column === column)) {
      return 'lightblue';
    }
    return 'white';
  };

  return (
    <S.Grid>
      {Object.keys(grid).map((column, i) => (
        <S.Row key={i}>
          {Object.keys(grid[column]).map((row, j) => (
            <div onClick={() => toggleSquare(+row, +column)} key={`${i}-${j}`}>
              <Square colour={getColour(+row, +column)} />
            </div>
          ))}
        </S.Row>
      ))}
    </S.Grid>
  );
};

export default Crossword;
