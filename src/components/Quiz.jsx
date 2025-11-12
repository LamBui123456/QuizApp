import { useEffect, useState } from "react";
import Results from "./Results";
import confetti from "canvas-confetti"; // 🎆 thêm thư viện pháo giấy

const quizData = [
  {
    question: "1. Cây gì không trồng mà mọc?",
    options: ["Cây nến", "Cây kim", "Cây gậy", "Cây cầu"],
    answer: "Cây nến",
  },
  {
    question: "2. Cái gì càng đầy càng nhẹ?",
    options: ["Bóng bay", "Ly nước", "Túi khí", "Gối bông"],
    answer: "Bóng bay",
  },
  {
    question: "3. Con gì đẻ trứng mà không ấp?",
    options: ["Con rùa", "Con cá", "Con ếch", "Con gà"],
    answer: "Con cá",
  },
  {
    question: "4. Cái gì có chân mà không đi được?",
    options: ["Bàn", "Ghế", "Cả hai", "Giường"],
    answer: "Cả hai",
  },
  {
    question: "5. Con gì không bao giờ ngủ?",
    options: ["Con sông", "Con người", "Con mèo", "Con chim"],
    answer: "Con sông",
  },
  {
    question: "6. Cái gì có mặt mà không có mũi miệng?",
    options: ["Đồng hồ", "Trăng", "Mặt trời", "Gương"],
    answer: "Đồng hồ",
  },
  {
    question: "7. Cái gì có thể nghe mà không có tai?",
    options: ["Điện thoại", "Tivi", "Đài", "Cái trống"],
    answer: "Điện thoại",
  },
  {
    question: "8. Cái gì không có cánh mà vẫn bay?",
    options: ["Thời gian", "Gió", "Âm thanh", "Khói"],
    answer: "Thời gian",
  },
  {
    question:
      "9. Con gì có 4 chân buổi sáng, 2 chân buổi trưa và 3 chân buổi tối?",
    options: ["Con người", "Con chó", "Con mèo", "Con khỉ"],
    answer: "Con người",
  },
  {
    question: "10. Cái gì càng kéo càng ngắn?",
    options: ["Thuốc lá", "Cái thước", "Nến", "Dây chun"],
    answer: "Thuốc lá",
  },
  {
    question: "11. Con gì chỉ có một sừng?",
    options: ["Con tê giác", "Con bò", "Con nai", "Con ngựa"],
    answer: "Con tê giác",
  },
  {
    question: "12. Cái gì càng giặt càng bẩn?",
    options: ["Giẻ lau", "Áo trắng", "Nước", "Xà phòng"],
    answer: "Giẻ lau",
  },
  {
    question: "13. Con gì đi thì nằm, đứng thì ngồi?",
    options: ["Con mèo", "Con chó", "Con rắn", "Con người"],
    answer: "Con rắn",
  },
  {
    question: "14. Cái gì luôn đến nhưng không bao giờ tới?",
    options: ["Ngày mai", "Gió", "Sóng", "Xe buýt"],
    answer: "Ngày mai",
  },
  {
    question: "15. Con gì mang cả nhà đi khắp nơi?",
    options: ["Con ốc sên", "Con rùa", "Con cua", "Con dã tràng"],
    answer: "Con ốc sên",
  },
  {
    question: "16. Cái gì càng đánh càng nhỏ?",
    options: ["Cái trống", "Bóng bay", "Cục đất", "Cái gối"],
    answer: "Cục đất",
  },
  {
    question: "17. Cái gì có cổ mà không có đầu?",
    options: ["Chai", "Áo", "Ghế", "Đèn"],
    answer: "Chai",
  },
  {
    question: "18. Cái gì đi qua nước mà không ướt?",
    options: ["Bóng", "Ánh sáng", "Thuyền", "Gió"],
    answer: "Bóng",
  },
  {
    question: "19. Con gì càng kêu càng mất tiếng?",
    options: ["Cái trống", "Con dế", "Cái loa", "Con mèo"],
    answer: "Cái trống",
  },
  {
    question: "20. Cái gì của bạn nhưng người khác lại dùng nhiều hơn?",
    options: ["Tên của bạn", "Áo", "Xe", "Lời nói"],
    answer: "Tên của bạn",
  },
  {
    question: "21. Cái gì càng lấy càng to?",
    options: ["Cái hố", "Giấc mơ", "Ngọn lửa", "Đám mây"],
    answer: "Cái hố",
  },
  {
    question: "22. Con gì không bao giờ uống nước?",
    options: ["Cá", "Ếch", "Rắn", "Rùa"],
    answer: "Cá",
  },
  {
    question: "23. Cái gì chỉ dùng được một lần?",
    options: ["Diêm", "Bút", "Giấy", "Dao cạo"],
    answer: "Diêm",
  },
  {
    question: "24. Con gì vừa biết bay vừa biết bơi?",
    options: ["Vịt trời", "Ngỗng", "Cò", "Cá chuồn"],
    answer: "Vịt trời",
  },
  {
    question: "25. Cái gì không có chân mà vẫn đi?",
    options: ["Thời gian", "Âm thanh", "Gió", "Cả ba"],
    answer: "Cả ba",
  },
  {
    question: "26. Cái gì luôn ướt khi làm khô người khác?",
    options: ["Khăn tắm", "Giấy", "Mưa", "Bọt biển"],
    answer: "Khăn tắm",
  },
  {
    question: "27. Con gì chỉ có một mắt mà vẫn nhìn được?",
    options: ["Cái kim", "Cơn bão", "Mặt trời", "Đèn"],
    answer: "Cái kim",
  },
  {
    question: "28. Con gì sống trên trời mà lại đẻ dưới đất?",
    options: ["Mưa", "Chim", "Sấm sét", "Mây"],
    answer: "Mưa",
  },
  {
    question: "29. Cái gì không bao giờ nói mà ai cũng hiểu?",
    options: ["Ánh mắt", "Tiền", "Trái tim", "Nụ cười"],
    answer: "Ánh mắt",
  },
  {
    question: "30. Con gì đi bằng bụng?",
    options: ["Con rắn", "Con sâu", "Con cá", "Con lươn"],
    answer: "Con rắn",
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
