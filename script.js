const quizContainer = document.querySelector('.container');
const questionEl = document.querySelector('.question h4');
const optionEls = document.querySelectorAll('.option');
const nextButton = document.querySelector('.btn.next button');
const submitButton = document.querySelector('.btn.submit button');

let qno = 0;
let score = 0;

const storedQno = localStorage.getItem('qno');
if (storedQno !== null) {
    qno = parseInt(storedQno) + 1;
};

let questions = [
    {
        question: 'What is the capital of Pakistan?',
        options: ['Peshawar', 'Islamabad', 'Lahore', 'Karachi'],
        answer: 1
    },
    {
        question: 'What is the largest ocean on Earth?',
        options: ['Pacific Ocean', 'Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
        answer: 0
    },
    {
        question: 'How many hearts does an octopus have?',
        options: ['1', '2', '3', 'Multiple'],
        answer: 2
    },
    {
        question: 'Who invent World Wide Web (www)?',
        options: ['Steve Jobs', 'Tim Berners-Lee', 'Bill Gates', 'Mark Zuckerberg'],
        answer: 1
    },
    {
        question: 'What is the hottest planet in our solar system?',
        options: ['Mercury', 'Venus', 'Earth', 'Mars'],
        answer: 0
    },
    {
        question: 'What is the coldest planet in our solar system?',
        options: ['Earth', 'jupiter', 'Neptune', 'Mars'],
        answer: 2
    },
    {
        question: 'Which country is known as the "Land of the Rising Sun"?',
        options: ['China', 'Japan', 'South Korea', 'India'],
        answer: 1
    },
    {
        question: 'Who discover America?',
        options: ['Alexender Johnson', 'Sir Anderson', 'Mr.Bean', 'Christopher Columbus'],
        answer: 3
    },
    {
        question: 'What is the chemical symbol for gold?',
        options: ['Fe', 'Ag', 'Cu', 'Au'],
        answer: 3
    },
    {
        question: 'In which year did the first iPhone launch?',
        options: ['2004', '2007', '2010', '2013'],
        answer: 1
    },
    {
        question: "What is the capital of Australia?",
        options: ["Melbourne", "Sydney", "Canberra", "Perth"],
        answer: 2
    },
    {
        question: "What is the smallest continent?",
        options: ["Asia", "Antarctica", "Europe", "Australia"],
        answer: 3
    },
    {
        question: "What is the currency of the United Kingdom?",
        options: ["Euro", "Yen", "US Dollar", "Pound Sterling"],
        answer: 3
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Mercury", "Venus", "Jupiter", "Mars"],
        answer: 2 // Jupiter
    },
    {
        question: "What is the chemical symbol for Oxygen?",
        options: ["O", "C", "Na", "Cl"],
        answer: 0 // H2O
    },
    {
        question: "What is the capital city of France?",
        options: ["Berlin", "London", "Paris", "Rome"],
        answer: 2 // Paris
    },
    {
        question: "What is the currency of Japan?",
        options: ["Euro", "Yen", "Dollar", "Pound"],
        answer: 1 // Yen
    },
    {
        question: "Who invented the telephone?",
        options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Isaac Newton"],
        answer: 1 // Alexander Graham Bell
    },
    {
        question: "What is the tallest mountain in the world?",
        options: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
        answer: 0 // Mount Everest
    },
    {
        question: 'Which planet is known as the "Red Planet"?',
        options: ["Mercury", "Venus", "Earth", "Mars"],
        answer: 3 // Mars
    }
];

function loadQuestion() {
    if (qno < questions.length) {
        const currentQuestion = questions[qno];
        optionEls.forEach((optionEl, index) => {
            optionEl.textContent = `${index + 1}- ${currentQuestion.options[index]}`;
            questionEl.textContent = `Q No ${qno + 1} :- ${currentQuestion.question}`;
            optionEl.classList.remove('correct', 'incorrect', 'selected', 'disabled');
            nextButton.style.display = 'none';
            submitButton.style.display = 'flex';
        });
    }
};

function checkAnswer() {
    const selectedOption = document.querySelector('.option.selected');
    const correctAnswer = questions[qno].answer;

    if (!selectedOption) {
        return;
    }

    const selectedOptionIndex = Array.from(optionEls).indexOf(selectedOption);

    console.log(selectedOptionIndex);

    if (selectedOptionIndex === correctAnswer) {
        score++;
        selectedOption.classList.add('correct');
    } else {
        optionEls[correctAnswer].classList.add('correct');
        selectedOption.classList.add('incorrect');
    }

    optionEls.forEach(option => option.classList.add('disabled'));
    localStorage.setItem('qno', (qno).toString());

}

function nextQuestion() {
    qno++;
    if (qno >= questions.length) {
        quizContainer.innerHTML = `<h3>Total Questions = ${questions.length} <br> Correct = ${score} <br> Wrong = ${questions.length - score} <br> Percentage = ${Math.round(score / questions.length * 100)}%</h3>` + '<div class="restart btn"><button onclick="location.reload()">Restart</button></div>';
        localStorage.removeItem('qno');
        return;
    }

    loadQuestion();
}

loadQuestion();

nextButton.addEventListener('click', nextQuestion);
submitButton.addEventListener('click', () => {
    checkAnswer();
    const selectedOption = document.querySelector('.option.selected');
    let request = document.querySelector('.request');
    if (!selectedOption) {
        request.innerHTML = '*Please select an option';
    }
    if (selectedOption) {
        nextButton.style.display = 'flex';
        submitButton.style.display = 'none';
        request.innerHTML = '';
    }
});

optionEls.forEach(optionEl => optionEl.addEventListener('click', () => {
    document.querySelector('.option.selected')?.classList.remove('selected');
    optionEl.classList.add('selected');
}));