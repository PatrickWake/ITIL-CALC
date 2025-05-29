import React, { useState } from 'react';
import './App.css';

const itilCategories = [
  {
    category: 'Service Strategy',
    questions: [
      {
        question: 'Do you have a formal service portfolio management process?',
        description: 'This includes maintaining a complete list of all services, their status, and lifecycle stages.'
      },
      {
        question: 'Is there a documented financial management process for IT services?',
        description: 'Includes budgeting, accounting, and charging for IT services.'
      },
      {
        question: 'Do you have a formal demand management process?',
        description: 'Understanding and influencing customer demand for services.'
      }
    ]
  },
  {
    category: 'Service Design',
    questions: [
      {
        question: 'Do you have a formal service level management process?',
        description: 'Defining, documenting, and agreeing on service levels with customers.'
      },
      {
        question: 'Is there a documented capacity management process?',
        description: 'Ensuring IT capacity meets current and future business needs.'
      },
      {
        question: 'Do you have a formal availability management process?',
        description: 'Ensuring IT services meet agreed availability targets.'
      },
      {
        question: 'Is there a documented IT service continuity management process?',
        description: 'Ensuring IT services can be recovered in case of disaster.'
      }
    ]
  },
  {
    category: 'Service Transition',
    questions: [
      {
        question: 'Do you have a formal change management process?',
        description: 'Controlling the lifecycle of all changes to IT services.'
      },
      {
        question: 'Is there a documented release and deployment management process?',
        description: 'Planning, scheduling, and controlling the movement of releases.'
      },
      {
        question: 'Do you maintain a configuration management database (CMDB)?',
        description: 'Storing information about configuration items and their relationships.'
      }
    ]
  },
  {
    category: 'Service Operation',
    questions: [
      {
        question: 'Do you have a formal incident management process?',
        description: 'Managing the lifecycle of all incidents to restore normal service.'
      },
      {
        question: 'Is there a documented problem management process?',
        description: 'Preventing incidents and minimizing the impact of incidents that cannot be prevented.'
      },
      {
        question: 'Do you have a formal request fulfillment process?',
        description: 'Handling service requests from users.'
      },
      {
        question: 'Is there a documented access management process?',
        description: 'Granting authorized users the right to use a service.'
      }
    ]
  },
  {
    category: 'Continual Service Improvement',
    questions: [
      {
        question: 'Do you regularly review and analyze service metrics?',
        description: 'Using metrics to identify areas for improvement.'
      },
      {
        question: 'Is there a formal process for implementing service improvements?',
        description: 'Planning and implementing improvements to services.'
      },
      {
        question: 'Do you conduct regular service reviews with stakeholders?',
        description: 'Reviewing service performance and identifying improvement opportunities.'
      }
    ]
  }
];

function App() {
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [showResults, setShowResults] = useState(false);

  const handleResponse = (categoryIndex: number, questionIndex: number, value: string) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setResponses(prev => ({ ...prev, [key]: value }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    let totalQuestions = 0;

    itilCategories.forEach((category, categoryIndex) => {
      category.questions.forEach((_, questionIndex) => {
        const key = `${categoryIndex}-${questionIndex}`;
        const response = responses[key];
        if (response) {
          totalQuestions++;
          switch (response) {
            case 'fully-implemented':
              totalScore += 100;
              break;
            case 'partially-implemented':
              totalScore += 50;
              break;
            case 'not-implemented':
              totalScore += 0;
              break;
          }
        }
      });
    });

    return totalQuestions > 0 ? Math.round(totalScore / totalQuestions) : 0;
  };

  const getRecommendations = () => {
    const recommendations: string[] = [];
    
    itilCategories.forEach((category, categoryIndex) => {
      let categoryScore = 0;
      let categoryQuestions = 0;

      category.questions.forEach((_, questionIndex) => {
        const key = `${categoryIndex}-${questionIndex}`;
        const response = responses[key];
        if (response) {
          categoryQuestions++;
          switch (response) {
            case 'fully-implemented':
              categoryScore += 100;
              break;
            case 'partially-implemented':
              categoryScore += 50;
              break;
            case 'not-implemented':
              categoryScore += 0;
              break;
          }
        }
      });

      const averageScore = categoryQuestions > 0 ? categoryScore / categoryQuestions : 0;
      
      if (averageScore < 50) {
        recommendations.push(`Consider implementing or improving ${category.category} processes.`);
      }
    });

    return recommendations;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ITIL Maturity Assessment Tool</h1>
        <p>Evaluate your organization's ITIL implementation and identify areas for improvement</p>
      </header>

      <main>
        {!showResults ? (
          <div className="assessment-form">
            {itilCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="category-section">
                <h2>{category.category}</h2>
                {category.questions.map((item, questionIndex) => (
                  <div key={questionIndex} className="question-card">
                    <h3>{item.question}</h3>
                    <p className="description">{item.description}</p>
                    <div className="response-options">
                      <label>
                        <input
                          type="radio"
                          name={`${categoryIndex}-${questionIndex}`}
                          value="fully-implemented"
                          checked={responses[`${categoryIndex}-${questionIndex}`] === 'fully-implemented'}
                          onChange={(e) => handleResponse(categoryIndex, questionIndex, e.target.value)}
                        />
                        Fully Implemented
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`${categoryIndex}-${questionIndex}`}
                          value="partially-implemented"
                          checked={responses[`${categoryIndex}-${questionIndex}`] === 'partially-implemented'}
                          onChange={(e) => handleResponse(categoryIndex, questionIndex, e.target.value)}
                        />
                        Partially Implemented
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`${categoryIndex}-${questionIndex}`}
                          value="not-implemented"
                          checked={responses[`${categoryIndex}-${questionIndex}`] === 'not-implemented'}
                          onChange={(e) => handleResponse(categoryIndex, questionIndex, e.target.value)}
                        />
                        Not Implemented
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <button 
              className="submit-button"
              onClick={() => setShowResults(true)}
            >
              Generate Assessment Report
            </button>
          </div>
        ) : (
          <div className="results-section">
            <h2>Assessment Results</h2>
            <div className="score-card">
              <h3>Overall ITIL Maturity Score</h3>
              <div className="score">{calculateScore()}%</div>
            </div>
            <div className="recommendations">
              <h3>Recommendations</h3>
              <ul>
                {getRecommendations().map((recommendation, index) => (
                  <li key={index}>{recommendation}</li>
                ))}
              </ul>
            </div>
            <button 
              className="back-button"
              onClick={() => setShowResults(false)}
            >
              Back to Assessment
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
