import { useEffect, useState } from 'react';
import { useRive, useStateMachineInput } from 'rive-react';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { CSSTransition } from 'react-transition-group';
import './App.css';

function App() {
  const [cardIndex, setCardIndex] = useState(1);
  const { RiveComponent, rive } = useRive({
    src: 'penguinretro.riv',
    stateMachines: 'cards',
    autoplay: true,
  });

  const cardSelect = useStateMachineInput(rive, 'cards', 'card-number');
  const next = useStateMachineInput(rive, 'cards', 'draw-next');
  const prev = useStateMachineInput(rive, 'cards', 'draw-prev');

  useEffect(() => {
    if (cardSelect) cardSelect.value = cardIndex;
  }, [cardIndex, cardSelect])

  function nextCard() {
    if (next) next.fire();
    setTimeout(() => setCardIndex(cardIndex + 1), 500);
  }

  function prevCard() {
    if (prev) prev.fire();
    setTimeout(() => setCardIndex(cardIndex - 1), 500);
  }

  function imageForIndex(index) {
    if (index < 3) return "https://i.redd.it/yoa0dq79k0t21.jpg";
    if (index < 6) return "https://media.giphy.com/media/nwyqBwP65XCAU/giphy.gif";
    if (index < 10) return "https://media.giphy.com/media/LrXAkOxhUT1S0/giphy.gif";
    if (index < 14) return "https://media.giphy.com/media/QBC5foQmcOkdq/giphy.gif";
    return "https://media.giphy.com/media/gr5qY4qj8G96o/giphy.gif";
  }

  function shouldDisplayImage() {
    return [1, 3, 7, 11, 15].includes(cardIndex);
  }

  function headerForIndex(index) {
    const headers = {
      2: 'Practice round',
      4: '1 of 9',
      5: '2 of 9',
      6: '3 of 9',
      8: '4 of 9',
      9: '5 of 9',
      10: '6 of 9',
      12: '7 of 9',
      13: '8 of 9',
      14: '9 of 9',
    }
    return headers[index];
  }

  return (
    <div className="App">
      <RiveComponent />/
      <h2 className="header">{headerForIndex(cardIndex)}</h2>
      <div className="buttons">
        <button onClick={prevCard}  disabled={cardIndex <= 1}>
          <FiChevronLeft fontSize={24} />
        </button>
        <button onClick={nextCard} disabled={cardIndex >= 15}>
          <FiChevronRight fontSize={24} />
        </button>
      </div>
      <CSSTransition
        in={shouldDisplayImage()}
        timeout={300}
        classNames="image-transition"
        unmountOnExit
      >
        <div className="image-container">
          <img src={imageForIndex(cardIndex)} alt="" />
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
