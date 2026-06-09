import React, { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import SummaryScreen from './components/SummaryScreen';
import { useScores } from './hooks/useScores';

// screen: intro | home | quiz | result | summary
export default function App() {
  const [screen, setScreen] = useState('intro');
  const [intro, setIntro] = useState(null);
  const [activeModule, setActiveModule] = useState(null);

  const { answers, completed, scores, saveAnswers, completedCount, allDone } = useScores();

  const handleStart = (formData) => {
    setIntro(formData);
    setScreen('home');
  };

  const handleSelectModule = (moduleId) => {
    setActiveModule(moduleId);
    setScreen('quiz');
  };

  const handleQuizComplete = (moduleId, moduleAnswers) => {
    saveAnswers(moduleId, moduleAnswers);
    setActiveModule(moduleId);
    setScreen('result');
  };

  const handleNextModule = (moduleId) => {
    setActiveModule(moduleId);
    setScreen('quiz');
  };

  if (screen === 'intro') {
    return <IntroScreen onStart={handleStart} />;
  }

  if (screen === 'home') {
    return (
      <HomeScreen
        intro={intro}
        completed={completed}
        scores={scores}
        completedCount={completedCount}
        onSelectModule={handleSelectModule}
        onSummary={() => setScreen('summary')}
      />
    );
  }

  if (screen === 'quiz') {
    return (
      <QuizScreen
        moduleId={activeModule}
        onBack={() => setScreen(completed[activeModule] ? 'result' : 'home')}
        onComplete={handleQuizComplete}
      />
    );
  }

  if (screen === 'result') {
    return (
      <ResultScreen
        moduleId={activeModule}
        scores={scores}
        completedCount={completedCount}
        onHome={() => setScreen('home')}
        onSummary={() => setScreen('summary')}
        onNext={handleNextModule}
      />
    );
  }

  if (screen === 'summary') {
    return (
      <SummaryScreen
        intro={intro}
        scores={scores}
        completedCount={completedCount}
        allDone={allDone}
        onHome={() => setScreen('home')}
        onModule={(id) => { setActiveModule(id); setScreen('result'); }}
      />
    );
  }

  return null;
}
