import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGarden } from '../helpers/GardenContext'
import { useNavigate } from 'react-router-dom'
import { LEVEL_CONTENT } from '../data/levelContent'
import CodeProblem from '../components/CodeProblem'

const Level = () => {
  const { section, level } = useParams(); // from url
  const { gameState, completeLevel } = useGarden();
  const navigate = useNavigate();
  const [userBlocks, setUserBlocks] = useState([]);
  const [feedback, setFeedback] = useState(null);
  

  const levelData = LEVEL_CONTENT[section][level];

  function handleCheck() {
    const isCorrect = userBlocks.every(
      (block, index) => block === levelData.solution[index]
    );

    if (userBlocks.length !== levelData.snippetSlots) {
      setFeedback('incorrect');
      return;
    }

    if (isCorrect) {
      setFeedback('correct');
      completeLevel(Number(section), Number(level));
    } else {
      setFeedback('incorrect');
    }
  }

  function handleNext() {
    const nextLevel = Number(level) + 1;
    const nextSection = Number(section) + 1;

    if (Number(level) < 3) {
      navigate(`/level/${section}/${nextLevel}`);
    } else if (Number(section) < 2) {
      navigate(`/level/${nextSection}/1`);
    } else {
      navigate(`/garden`); // all levels are done
    }
  }


  return (
    <div>
      <p>Section {section} - Level {level}</p>
      <p>{levelData.prompt}</p>
      <CodeProblem
        blocks={levelData.blocks}
        snippetSlots={levelData.snippetSlots}
        onChange={setUserBlocks}
      />

      {/* user checked answer */}
      {feedback && (
        <div>
          <p>{feedback}</p>
          {feedback === 'correct' && (
            <button onClick={handleNext}>Next</button>
          )}
          {feedback === 'incorrect' && (
            <button onClick={handleCheck}>Try Again</button>
          )}
        </div>
      )}

      {/* user hasn't checked */}
      {!feedback && (
          <button onClick={handleCheck}>Check</button>
      )}
      
    </div>
  )
}

export default Level