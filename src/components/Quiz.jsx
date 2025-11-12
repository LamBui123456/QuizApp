import { useEffect, useState } from "react";
import Results from "./Results";
import confetti from "canvas-confetti"; // 🎆 thêm thư viện pháo giấy

const quizData = [
  // ——— 1. Hàm số ———
  {
    question: "1. Đạo hàm của hàm số y = x³ là:",
    options: ["3x²", "x²", "2x", "3x"],
    answer: "3x²",
  },
  {
    question: "2. Hàm số y = x² - 2x + 1 đạt giá trị nhỏ nhất tại:",
    options: ["x = 0", "x = 1", "x = 2", "x = -1"],
    answer: "x = 1",
  },
  {
    question: "3. Tập xác định của hàm y = √(x - 3) là:",
    options: ["x ≥ 3", "x > 3", "x ≤ 3", "x < 3"],
    answer: "x ≥ 3",
  },
  {
    question: "4. Hàm số y = 1/x có tiệm cận đứng là:",
    options: ["x = 0", "y = 0", "x = 1", "y = 1"],
    answer: "x = 0",
  },
  {
    question: "5. Hàm số y = -x² + 2x + 3 đạt cực đại tại:",
    options: ["x = 1", "x = 2", "x = 3", "x = -1"],
    answer: "x = 1",
  },
  {
    question: "6. Đồ thị hàm y = ax² (a > 0) có dạng:",
    options: ["Parabol úp", "Parabol ngửa", "Đường thẳng", "Elip"],
    answer: "Parabol ngửa",
  },

  // ——— 2. Mũ - Logarit ———
  { question: "7. log₂(8) bằng:", options: ["2", "3", "4", "1"], answer: "3" },
  {
    question: "8. log₃(1/9) = ?",
    options: ["2", "-2", "1/2", "-1/2"],
    answer: "-2",
  },
  {
    question: "9. Phương trình 2ˣ = 8 có nghiệm:",
    options: ["x = 2", "x = 3", "x = 4", "x = 8"],
    answer: "x = 3",
  },
  {
    question: "10. logₐ(bc) = ?",
    options: ["logₐb + logₐc", "logₐb - logₐc", "logₐ(b+c)", "logₐb/logₐc"],
    answer: "logₐb + logₐc",
  },

  // ——— 3. Đạo hàm - Tích phân ———
  {
    question: "11. (sinx)' = ?",
    options: ["cosx", "-cosx", "sinx", "-sinx"],
    answer: "cosx",
  },
  {
    question: "12. (eˣ)' = ?",
    options: ["eˣ", "x·eˣ", "1/eˣ", "lnx"],
    answer: "eˣ",
  },
  {
    question: "13. ∫x dx = ?",
    options: ["x²/2 + C", "2x + C", "lnx + C", "x² + C"],
    answer: "x²/2 + C",
  },
  {
    question: "14. Đạo hàm của y = ln(x) là:",
    options: ["1/x", "x", "lnx", "x²"],
    answer: "1/x",
  },
  {
    question: "15. ∫(2x)dx từ 0 đến 3 bằng:",
    options: ["9", "6", "3", "12"],
    answer: "9",
  },
  {
    question: "16. Đạo hàm của y = cosx là:",
    options: ["-sinx", "sinx", "cosx", "-cosx"],
    answer: "-sinx",
  },

  // ——— 4. Giới hạn & Số phức ———
  {
    question: "17. lim(x→∞) (2x² + 1)/(x² + 3) =",
    options: ["2", "1", "0", "∞"],
    answer: "2",
  },
  {
    question: "18. Số phức z = 3 + 4i có mô-đun là:",
    options: ["5", "7", "25", "1"],
    answer: "5",
  },
  {
    question: "19. Phần thực của z = 5 - 2i là:",
    options: ["5", "-2", "2", "0"],
    answer: "5",
  },
  {
    question: "20. Tổng hai số phức 2 + 3i và 1 - 2i là:",
    options: ["3 + i", "1 + 5i", "3 + 5i", "2 - i"],
    answer: "3 + i",
  },

  // ——— 5. Hình học không gian ———
  {
    question: "21. Vectơ pháp tuyến của mặt phẳng (P): 2x - y + 3z - 5 = 0 là:",
    options: ["(2; -1; 3)", "(1; 2; 3)", "(2; 1; -3)", "(-2; 1; -3)"],
    answer: "(2; -1; 3)",
  },
  {
    question: "22. Hai mặt phẳng song song có:",
    options: [
      "Vectơ pháp tuyến cùng phương",
      "Vectơ pháp tuyến vuông góc",
      "Vectơ pháp tuyến bất kỳ",
      "Không có vectơ pháp tuyến",
    ],
    answer: "Vectơ pháp tuyến cùng phương",
  },
  {
    question:
      "23. Thể tích khối chóp S.ABC có diện tích đáy B và chiều cao h là:",
    options: ["(1/3)Bh", "(1/2)Bh", "Bh", "2Bh"],
    answer: "(1/3)Bh",
  },
  {
    question: "24. Trong không gian, hai đường thẳng song song thì:",
    options: [
      "Không có điểm chung",
      "Có 1 điểm chung",
      "Cắt nhau",
      "Vuông góc",
    ],
    answer: "Không có điểm chung",
  },
  {
    question: "25. Độ dài đường chéo hình lập phương cạnh a là:",
    options: ["a√3", "a√2", "2a", "3a"],
    answer: "a√3",
  },
  {
    question: "26. Mặt cầu có bán kính r có diện tích xung quanh là:",
    options: ["4πr²", "2πr", "πr²", "4/3πr³"],
    answer: "4πr²",
  },

  // ——— 6. Xác suất - Tổ hợp ———
  {
    question: "27. Số cách chọn 2 phần tử từ tập có 5 phần tử là:",
    options: ["5", "10", "20", "25"],
    answer: "10",
  },
  {
    question: "28. Xác suất xuất hiện mặt 6 khi tung một con xúc xắc là:",
    options: ["1/6", "1/2", "1/3", "1/5"],
    answer: "1/6",
  },
  {
    question: "29. Có bao nhiêu số tự nhiên có 3 chữ số khác nhau?",
    options: ["648", "504", "720", "900"],
    answer: "648",
  },

  // ——— 7. Cấp số cộng - nhân ———
  {
    question: "30. Cấp số cộng có a₁ = 2, d = 3. Số hạng thứ 5 là:",
    options: ["11", "12", "14", "8"],
    answer: "14",
  },
  {
    question: "31. Cấp số nhân có a₁ = 2, q = 2. Số hạng thứ 4 là:",
    options: ["8", "10", "12", "16"],
    answer: "16",
  },
  {
    question: "32. Tổng 5 số hạng đầu của cấp số cộng a₁ = 1, d = 2 là:",
    options: ["25", "20", "15", "30"],
    answer: "25",
  },

  // ——— 8. Lượng giác ———
  {
    question: "33. sin(π/6) =",
    options: ["1/2", "√3/2", "0", "1"],
    answer: "1/2",
  },
  {
    question: "34. cos(π/3) =",
    options: ["1/2", "√3/2", "0", "1"],
    answer: "1/2",
  },
  {
    question: "35. Phương trình sinx = 1/2 có nghiệm là:",
    options: [
      "x = π/6 + k2π hoặc 5π/6 + k2π",
      "x = π/6 + kπ",
      "x = π/3 + kπ",
      "x = kπ",
    ],
    answer: "x = π/6 + k2π hoặc 5π/6 + k2π",
  },
  {
    question: "36. sin²x + cos²x = ?",
    options: ["1", "0", "2", "sinx"],
    answer: "1",
  },

  // ——— 9. Tổng hợp nâng cao ———
  {
    question: "37. Tìm đạo hàm của y = e^(2x):",
    options: ["2e^(2x)", "e^(2x)", "2x·e^(2x)", "x²e^(x)"],
    answer: "2e^(2x)",
  },
  {
    question: "38. Tích phân ∫cosx dx =",
    options: ["sinx + C", "-sinx + C", "cosx + C", "x + C"],
    answer: "sinx + C",
  },
  {
    question: "39. Giới hạn lim(x→0) (sinx)/x =",
    options: ["1", "0", "∞", "-1"],
    answer: "1",
  },
  {
    question: "40. Phương trình 3ˣ = 27 có nghiệm là:",
    options: ["x = 3", "x = 9", "x = 27", "x = 4"],
    answer: "x = 3",
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
