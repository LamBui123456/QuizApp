import { useEffect, useState } from "react";
import Results from "./Results";
import confetti from "canvas-confetti"; // 🎆 thêm thư viện pháo giấy

const quizData = [
  {
    question: "1. Con gì càng to càng bé?",
    options: ["Con voi", "Con cá", "Con mèo", "Con cua"],
    answer: "Con voi (to đầu nhưng bé nhỏ tuổi hơn mẹ)",
  },
  {
    question: "2. Cái gì càng cắt càng dài?",
    options: ["Tóc", "Đường", "Dây thừng", "Giấy"],
    answer: "Tóc",
  },
  {
    question: "3. Con gì đẻ con rồi mới chết?",
    options: ["Con người", "Con bướm", "Con ong", "Con cá"],
    answer: "Con ong",
  },
  {
    question: "4. Cái gì có cổ mà không có đầu?",
    options: ["Chai", "Cốc", "Ghế", "Áo"],
    answer: "Chai",
  },
  {
    question: "5. Thứ gì bạn không thể ăn vào buổi sáng?",
    options: ["Bữa trưa", "Bữa tối", "Cả hai", "Nước"],
    answer: "Bữa trưa",
  },
  {
    question: "6. Cái gì luôn đi mà không bao giờ đến?",
    options: ["Thời gian", "Gió", "Xe buýt", "Sóng"],
    answer: "Thời gian",
  },
  {
    question: "7. Cái gì càng rửa càng bẩn?",
    options: ["Cái giẻ lau", "Nước", "Quần áo", "Bàn tay"],
    answer: "Cái giẻ lau",
  },
  {
    question: "8. Con gì mang được cả ngôi nhà trên lưng?",
    options: ["Con ốc sên", "Con rùa", "Con cua", "Con dã tràng"],
    answer: "Con ốc sên",
  },
  {
    question: "9. Con gì biết bay nhưng không có cánh?",
    options: ["Máy bay", "Khói", "Thời gian", "Bóng bay"],
    answer: "Thời gian",
  },
  {
    question: "10. Cái gì càng nhiều răng càng ít cắn?",
    options: ["Cái lược", "Cưa", "Cá mập", "Miệng"],
    answer: "Cái lược",
  },
  {
    question: "11. Cái gì có đầu, có đuôi mà không có thân?",
    options: ["Đồng xu", "Con rắn", "Cá", "Sợi dây"],
    answer: "Đồng xu",
  },
  {
    question: "12. Cái gì bạn cầm được nhưng không ném được?",
    options: ["Hơi thở", "Nước", "Lửa", "Không khí"],
    answer: "Hơi thở",
  },
  {
    question: "13. Con gì luôn nằm mà không bao giờ đứng?",
    options: ["Con sông", "Con cá", "Con mèo", "Con trăn"],
    answer: "Con sông",
  },
  {
    question:
      "14. Trên đồng cỏ có 6 con bò, sét đánh chết 2 con. Hỏi còn mấy con?",
    options: ["4", "2", "6", "Không con nào"],
    answer: "6 (vì 4 con còn sống, 2 con chết vẫn còn ở đó)",
  },
  {
    question: "15. Cái gì đi qua nước mà không ướt?",
    options: ["Bóng", "Thuyền", "Khói", "Tia sáng"],
    answer: "Bóng",
  },
  {
    question: "16. Cái gì có thể chứa được cả thế giới?",
    options: ["Bản đồ", "Trái tim", "Mắt", "Bầu trời"],
    answer: "Bản đồ",
  },
  {
    question: "17. Cái gì luôn đến nhưng không bao giờ tới?",
    options: ["Ngày mai", "Mưa", "Tàu", "Gió"],
    answer: "Ngày mai",
  },
  {
    question: "18. Thứ gì càng dùng càng ngắn?",
    options: ["Bút chì", "Nến", "Cả hai", "Dao"],
    answer: "Cả hai",
  },
  {
    question: "19. Con gì càng kêu càng mất tiếng?",
    options: ["Con dế", "Cái trống", "Con mèo", "Cái loa"],
    answer: "Cái trống",
  },
  {
    question: "20. Cái gì của bạn nhưng người khác dùng nhiều hơn?",
    options: ["Tên của bạn", "Áo", "Xe", "Tiền"],
    answer: "Tên của bạn",
  },
  {
    question: "21. Cái gì có thể viết nhưng không đọc được?",
    options: ["Bút", "Máy in", "Bàn phím", "Chữ ký"],
    answer: "Chữ ký",
  },
  {
    question: "22. Cái gì bạn càng lấy thì nó càng to?",
    options: ["Cái hố", "Đám mây", "Lửa", "Giấc mơ"],
    answer: "Cái hố",
  },
  {
    question: "23. Cái gì luôn ở phía trước bạn nhưng bạn không bao giờ thấy?",
    options: ["Tương lai", "Bóng", "Không khí", "Mặt trời"],
    answer: "Tương lai",
  },
  {
    question: "24. Cái gì có nhiều chân nhất?",
    options: ["Bàn ghế", "Nhện", "Công viên", "Trường học"],
    answer: "Trường học (nhiều học sinh có chân 😆)",
  },
  {
    question: "25. Cái gì càng nhiều càng dễ mất?",
    options: ["Tiền", "Ngủ", "Bí mật", "Bạn bè"],
    answer: "Bí mật",
  },
  {
    question: "26. Con gì không bao giờ uống nước?",
    options: ["Cá", "Rắn", "Ếch", "Cua"],
    answer: "Cá (sống trong nước rồi)",
  },
  {
    question: "27. Cái gì chỉ dùng được một lần trong đời?",
    options: ["Tuổi trẻ", "Diêm", "Giấy", "Bút"],
    answer: "Diêm",
  },
  {
    question: "28. Con gì vừa biết bay vừa biết bơi?",
    options: ["Vịt trời", "Cò", "Ngỗng", "Cá chuồn"],
    answer: "Vịt trời",
  },
  {
    question: "29. Cái gì luôn ướt khi làm khô người khác?",
    options: ["Khăn tắm", "Nước", "Giấy", "Bọt biển"],
    answer: "Khăn tắm",
  },
  {
    question: "30. Cái gì không có chân mà vẫn đi khắp nơi?",
    options: ["Âm thanh", "Ánh sáng", "Gió", "Cả ba"],
    answer: "Cả ba",
  },
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
