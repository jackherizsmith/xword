import styled from 'styled-components';

namespace S {
  type BoxProps = {
    colour: Colour;
  };

  export const Box = styled.div<BoxProps>`
    align-items: center;
    background: ${({colour}) => colour};
    border: 0.5px solid black;
    display: flex;
    justify-content: center;
    height: 40px;
    text-transform: capitalize;
    width: 40px;
  `;
}

export type Colour = 'red' | 'black' | 'white' | 'lightblue';

type SquareProps = {
  colour?: Colour;
  letter?: string;
};

const Square = ({colour = 'white', letter}: SquareProps) => {
  return <S.Box colour={colour}>{letter}</S.Box>;
};

export default Square;
