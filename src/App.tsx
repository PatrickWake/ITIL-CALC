import React, { useState } from 'react';
import './App.css';

const itilQuestions = [
  {
    category: 'Service Management',
    questions: [
      'Do you have a documented incident management process?',
      'Are incidents logged and tracked in a centralised system?',
      'Is there a defined process for prioritising incidents?',
      'Do you have a documented escalation procedure?',
      'Are incident response times monitored and reported?',
      'Is trend analysis used to identify recurring issues?',
      'Are incident records reviewed post-resolution?',
      'Do users receive consistent communication during incidents?'
    ]
  },
  {
    category: 'Problem Management',
    questions: [
      'Do you have a documented problem management process?',
      'Are problems linked to related incidents in your ITSM tool?',
      'Is root cause analysis regularly performed?',
      'Are known errors and workarounds documented and accessible?',
      'Do you review problem trends and recurring issues?',
      'Is there a major problem review process?'
    ]
  },
  // Add more categories and questions as needed
];

// Function to evaluate the response and return a score
const evaluateResponse = (response: string): { score: number, className: string } => {
  const lowerCaseResponse = response.toLowerCase();
  let score = 0;
  let className = 'score';

  if (lowerCaseResponse.includes('yes')) {
    score = 100;
    className += ' good';
  } else if (lowerCaseResponse.includes('no')) {
    score = 0;
    className += ' worse';
  } else {
    score = 50;
    className += ' bad';
  }

  return { score, className };
};

function App() {
  const [responses, setResponses] = useState<string[]>(Array(itilQuestions.reduce((acc, curr) => acc + curr.questions.length, 0)).fill(''));

  const handleInputChange = (index: number, value: string) => {
    const newResponses = [...responses];
    newResponses[index] = value;
    setResponses(newResponses);
  };

  return (
    <div className="App">
      <h1>ITIL Self-Assessment</h1>
      {itilQuestions.map((section, sectionIndex) => (
        <div key={sectionIndex} className="section">
          <h2>{section.category}</h2>
          {section.questions.map((question, questionIndex) => {
            const responseIndex = itilQuestions.slice(0, sectionIndex).reduce((acc, curr) => acc + curr.questions.length, 0) + questionIndex;
            const { score, className } = evaluateResponse(responses[responseIndex]);
            return (
              <div key={questionIndex} className="question">
                <label>{question}</label>
                <input
                  type="text"
                  value={responses[responseIndex]}
                  onChange={(e) => handleInputChange(responseIndex, e.target.value)}
                />
                <span className={className}>Score: {score}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default App;
