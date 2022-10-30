import styled, {css} from 'styled-components';

namespace S {
  type BoxProps = {
    colour: Colour;
    order?: number;
  };

  export const Box = styled.div<BoxProps>`
    align-items: center;
    background: ${({colour}) => colour};
    border: 0.5px solid black;
    display: flex;
    height: 100%;
    justify-content: center;
    position: relative;
    text-transform: capitalize;
    ${({order}) =>
      order > 0 &&
      css`
        :after {
          content: '${order}';
          position: absolute;
          top: 0;
          left: 0;
        }
      `}
  `;
}

export type Colour = 'red' | 'black' | 'white' | 'lightblue';

type SquareProps = {
  colour?: Colour;
  letter?: string;
  order?: number;
};

const Square = ({colour = 'white', letter, order}: SquareProps) => {
  return (
    <S.Box colour={colour} order={order}>
      {letter}
    </S.Box>
  );
};

export default Square;
