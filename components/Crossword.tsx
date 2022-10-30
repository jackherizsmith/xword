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
  order: number;
  length: number;
  letters: string[];
  start: {column: number; row: number};
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
    const directionSquares: (string | null)[] = Object.values(squares);
    return directionSquares.reduce((words: Word[], square, i) => {
      if (typeof square === 'string' && [undefined, null].includes(directionSquares[i - 1])) {
        const nextNull = directionSquares.indexOf(null, i);
        const word = directionSquares.slice(i, nextNull > 0 ? nextNull : directionSquares.length);
        if (word.length < 3) {
          return words;
        }
        return [
          ...words,
          {
            direction,
            length: word.length,
            letters: word,
            order: 0,
            start: direction == 'across' ? {row: index, column: i} : {row: i, column: index},
            valid: word.length > 2,
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
    let order = 0;
    const sortedWords = [...acrossWords, ...downWords].sort(
      (a, b) => a.start.row * GRID + a.start.column - (b.start.row * GRID + b.start.column),
    );
    const orderedWords = sortedWords.map((word, i, arr) => {
      const firstInstance = arr.findIndex(({start: {row: firstRow, column: firstColumn}}) => {
        return firstRow === word.start.row && firstColumn === word.start.column;
      });
      if (firstInstance === i) order += 1;
      return {...word, order};
    });
    setWords(orderedWords);
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
    return 'white';
  };

  if (!words.length) {
    return null;
  }

  return (
    <S.Grid>
      {Object.keys(grid).map((column, i) => (
        <S.Row key={i}>
          {Object.keys(grid[column]).map((row, j) => {
            const thisWord = words.find(({start}) => start.row === +row && start.column === +column);
            return (
              <div onClick={() => toggleSquare(+row, +column)} key={`${i}-${j}`}>
                <Square colour={getColour(+row, +column)} order={thisWord?.order} />
              </div>
            );
          })}
        </S.Row>
      ))}
    </S.Grid>
  );
};

export default Crossword;
