import React, { use } from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGarden } from '../helpers/GardenContext'
import { LEVEL_CONTENT } from '../data/levelContent'
import CodeProblem from '../components/CodeProblem'
import '../styles/levels.css'
import Terminal from '../components/Terminal'
import Navbar from '../components/NavBar'

const Level = () => {
  const { section, level } = useParams(); // from url
  const { gameState, completeLevel, ready } = useGarden();
  const navigate = useNavigate();
  const [userBlocks, setUserBlocks] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [assembledCode, setAssembledCode] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [codeToDisplay, setCodeToDisplay] = useState('');


  const levelData = LEVEL_CONTENT[section][level];

  useEffect(() => {
    setUserBlocks([]);
    setFeedback(null);
    setAssembledCode('');
    setIsRunning(false);
    setCodeToDisplay('');
  }, [section, level]);

  function handleChange(updated) {
    if (!Array.isArray(updated)) return;
    setUserBlocks(updated);
    console.log(updated.filter(Boolean).join(' ').trim());
    setAssembledCode(updated.filter(Boolean).join(' ').trim());
  }

  function handleRun() {
    const current = userBlocks.filter(Boolean).join(' ').trim();
    setCodeToDisplay(current);
    setIsRunning(false);
    setTimeout(() => setIsRunning(true), 0);
  }

  function handleCheck() {
    if (userBlocks.length !== levelData.snippetSlots) {
      setFeedback('incomplete');
      return;
    }

    const isCorrect = userBlocks.every(
      (block, index) => block === levelData.solution[index]
    );

    if (isCorrect) {
      setFeedback('correct');
      completeLevel(Number(section), Number(level));
      setCodeToDisplay(levelData.codeToRun); // run what should be shown
      setIsRunning(false);
      setTimeout(() => setIsRunning(true), 0);
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
    navigate('/garden');
  }
}


  return (
    <div className='level-container'>
      
      <div className='level-header'>
        <Navbar />
        <div className='level-info'>
          <p className='level-title'>Section {section} - Level {level}</p>
          <p className='level-prompt'>{levelData.prompt}</p>
        </div>
       
      </div>

      <div className='level-content'>
        <CodeProblem
          blocks={levelData.blocks}
          snippetSlots={levelData.snippetSlots}
          onChange={handleChange}
          disabled={!ready}
        />
        
        {/* user hasn't checked */}
        <div className='level-btns'>
          <button onClick={handleRun} disabled={!ready}>Run</button>
          <button onClick={handleCheck}>Submit</button>
        </div>
        

        <Terminal 
          key={`${section}-${level}`}
          code={codeToDisplay} 
          run={isRunning} 
          onRunComplete={() => setIsRunning(false)}
        />
      
        {/* user checked answer */}
        {feedback && (
          <div className='level-feedback'>
            <p>{feedback}</p>
            {feedback === 'correct' && (
              <button onClick={handleNext}>Next</button>
            )}
            
            {feedback === 'incomplete' && (
              <p>Fill all the slots before submitting!</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Level