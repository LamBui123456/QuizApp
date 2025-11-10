import { useEffect, useState } from "react";
import Results from "./Results";
import confetti from "canvas-confetti"; // 🎆 thêm thư viện pháo giấy

const quizData = [
  { question: "1 + 2 = ?", options: ["2", "3", "4", "5"], answer: "3" },
  {
    question: "Số nào đứng liền sau số 5?",
    options: ["4", "5", "6", "7"],
    answer: "6",
  },
  { question: "10 - 7 = ?", options: ["2", "3", "4", "5"], answer: "3" },
  {
    question: "Số lớn nhất có một chữ số là số nào?",
    options: ["8", "9", "10", "7"],
    answer: "9",
  },
  { question: "3 + 5 = ?", options: ["7", "8", "9", "6"], answer: "8" },
  {
    question: "Số nào nhỏ hơn 9?",
    options: ["10", "9", "8", "11"],
    answer: "8",
  },
  { question: "4 + 4 = ?", options: ["6", "7", "8", "9"], answer: "8" },
  {
    question: "Số nào đứng liền trước số 10?",
    options: ["8", "9", "10", "11"],
    answer: "9",
  },
  { question: "5 + 0 = ?", options: ["4", "5", "6", "0"], answer: "5" },
  { question: "8 - 3 = ?", options: ["4", "5", "6", "3"], answer: "5" },
  {
    question: "Số có hai chữ số là số nào?",
    options: ["9", "10", "5", "8"],
    answer: "10",
  },
  { question: "2 + 6 = ?", options: ["6", "7", "8", "9"], answer: "8" },
];

const Quiz = () => {
  const [optionSelected, setOptionSelected] = useState("");
  const [userAnswers, setUserAnswers] = useState(
    Array.from({ length: quizData.length })
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuizEnded, setIsQuizEnded] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelectedOption = (option, index) => {
    setOptionSelected(option);
    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = index;
    setUserAnswers(newUserAnswers);
  };

  const goNext = () => {
    if (currentQuestion === quizData.length - 1) {
      setIsQuizEnded(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setIsQuizEnded(false);
    setScore(0);
    setUserAnswers(Array.from({ length: quizData.length }));
    setOptionSelected("");
  };

  const reviewQuiz = () => {
    setCurrentQuestion(0);
    setIsQuizEnded(false);
  };

  useEffect(() => {
    const answer = Number(userAnswers[currentQuestion]);
    const pastOptionSelected = quizData[currentQuestion].options[answer];
    if (answer !== undefined) {
      setOptionSelected(pastOptionSelected);
    } else {
      setOptionSelected("");
    }
  }, [currentQuestion, userAnswers]);

  useEffect(() => {
    if (optionSelected === quizData[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }
  }, [optionSelected]);

  // 🔔 Khi quiz kết thúc: phát nhạc & bắn pháo giấy
  useEffect(() => {
    if (isQuizEnded) {
      const audio = new Audio("/sounds/applause.mp3");
      audio.volume = 0.8;
      audio.play();

      // 🎉 hiệu ứng pháo giấy
      const duration = 3 * 1000; // 3 giây
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isQuizEnded]);

  if (isQuizEnded) {
    return (
      <Results
        score={score}
        totalQuestionNum={quizData.length}
        restartQuiz={restartQuiz}
        reviewQuiz={reviewQuiz}
      />
    );
  }

  return (
    <div className="container">
      <h2>Câu {currentQuestion + 1}</h2>
      <p className="question">{quizData[currentQuestion].question}</p>

      {quizData[currentQuestion].options.map((option, index) => (
        <button
          key={option}
          className={`option ${optionSelected === option ? "selected" : ""}`}
          disabled={!!optionSelected && optionSelected !== option}
          onClick={() => handleSelectedOption(option, index)}
        >
          {option}
        </button>
      ))}

      {optionSelected ? (
        optionSelected === quizData[currentQuestion].answer ? (
          <p className="correct-answer">✅ Câu trả lời của bạn chính xác!</p>
        ) : (
          <p className="incorrect-answer">❌ Câu trả lời sai!</p>
        )
      ) : null}

      <div className="nav-buttons">
        <button onClick={goBack} disabled={currentQuestion === 0}>
          ⬅ Quay lại
        </button>
        <button onClick={goNext} disabled={!optionSelected}>
          {currentQuestion === quizData.length - 1
            ? "🎯 Hoàn thành"
            : "➡ Câu tiếp theo"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;
