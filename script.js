
    const quizzes = {
      1: {
        name: 'Quiz 1',
        questions: [
          { question: 'What is the capital of France?', options: ['Paris', 'Berlin', 'London', 'Madrid'], correctAnswer: 'Paris' },
          { question: 'Who wrote "Romeo and Juliet"?', options: ['Shakespeare', 'Hemingway', 'Tolstoy', 'Austen'], correctAnswer: 'Shakespeare' },
          { question: 'What is the largest planet in our solar system?', options: ['Earth', 'Jupiter', 'Mars', 'Venus'], correctAnswer: 'Jupiter' },
          { question: 'Who among the following discovered X-rays?', options: ['Marie Curie', 'J.JThompson', 'W.CRoentgen', 'James Chadwick'], correctAnswer: 'W.CRoentgen' },
          { question: 'What is the length of seconds pendulum?', options: ['1.5 meter', '2 meter', '99.3 cm', '98.5 cm'], correctAnswer: '99.3 cm' },
        ]
      },
      2: {
        name: 'Quiz 2',
        questions: [
          { question: 'Which programming language is known for building dynamic web pages?', options: ['Java', 'Python', 'JavaScript', 'C#'], correctAnswer: 'JavaScript' },
          { question: 'What is the capital of Japan?', options: ['Seoul', 'Beijing', 'Tokyo', 'Bangkok'], correctAnswer: 'Tokyo' },
          { question: 'What is the square root of 144?', options: ['10', '12', '14', '16'], correctAnswer: '12' },
          { question: 'Which of the following principles is used to define the First law of Thermodynamics?', options: ['Conservation of mass', 'Conservation of energy', 'Conservation of momentum', 'Conservation of charge'], correctAnswer: 'Conservation of energy' },
          { question: 'Which of these is used as a material for making semiconductor devices?', options: ['Silicon', 'Germanium', 'Gallium Arsenide', 'All of the above'], correctAnswer: 'All of the above' },
        ]
      },
      3: {
        name: 'Quiz 3',
        questions: [
          { question: 'Who painted the Mona Lisa?', options: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Claude Monet'], correctAnswer: 'Leonardo da Vinci' },
          { question: 'What is the currency of Brazil?', options: ['Euro', 'Peso', 'Real', 'Dollar'], correctAnswer: 'Real' },
          { question: 'Which planet is known as the Red Planet?', options: ['Earth', 'Mars', 'Jupiter', 'Saturn'], correctAnswer: 'Mars' },
          { question: 'Algae cell wall is made up of which of the following?', options: ['Chitin', 'Cutin', 'Cellulose', 'Suberin'], correctAnswer: 'Cellulose' },
          { question: 'What is the study of bird migration?', options: ['Ecology', 'Nidology', 'Phenology', 'Phrenology'], correctAnswer: 'Phenology' },
        ]
      }
    };

    const leaderboard = {};

    function startQuiz(student, quizId) {
      const quizContainer = document.getElementById(`quiz${quizId}`);
      const quiz = quizzes[quizId];

    
      const questionsHtml = quiz.questions.map((q, index) => `
      <div>
        <p>${index + 1}. ${q.question}</p>
        <select id="question${index}" class="options">
          ${q.options.map(option => `<option value="${option}">${option}</option>`).join('')}
        </select>
      </div>
    `).join('');

      
      quizContainer.innerHTML = `
      <h2>${quiz.name}</h2>
      ${questionsHtml}
      <button  id="submit" onclick="submitQuiz('${student}', ${quizId})">Submit Quiz</button>
    `;
    }

    function submitQuiz(student, quizId) {
      const quiz = quizzes[quizId];
      const answers = quiz.questions.map((q, index) => ({
        question: q.question,
        selectedOption: document.getElementById(`question${index}`).value,
        correctAnswer: q.correctAnswer
      }));

      const score = calculateScore(answers, quiz.questions.length);

      if (!leaderboard[student]) {
        leaderboard[student] = { score, quizId };
      } else {
        leaderboard[student].score += score;
      }

      displayLeaderboard();

   
      alert(`${student}'s Answers:\n\n${answers.map(a => `${a.question}\nYour Answer: ${a.selectedOption}\nCorrect Answer: ${a.correctAnswer}\n`).join('\n')}\n\nScore: ${score}`);
    }

    function calculateScore(answers, totalQuestions) {
      const correctAnswers = answers.filter(a => a.selectedOption === a.correctAnswer).length;
      return (correctAnswers / totalQuestions) * 100;
    }

    function displayLeaderboard() {
      const rankingsElement = document.getElementById('rankings');
      rankingsElement.innerHTML = '';

      const sortedLeaderboard = Object.entries(leaderboard)
        .sort((a, b) => b[1].score - a[1].score);

      sortedLeaderboard.forEach(([student, data], index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${student} - ${data.score.toFixed(2)}% (${quizzes[data.quizId].name})`;
        rankingsElement.appendChild(listItem);
      });
    }
  