const questions = [
    { question: "रूसी क्रांति कब हुई थी?", options: ["1917", "1905", "1924", "1939"], answer: "1917" },
    { question: "रूस में समाजवादी विचारधारा किसके प्रभाव में विकसित हुई?", options: ["कार्ल मार्क्स", "एडम स्मिथ", "मैक्स वेबर", "थॉमस हॉब्स"], answer: "कार्ल मार्क्स" },
    { question: "रूसी क्रांति के समय रूस का शासक कौन था?", options: ["जार निकोलस II", "व्लादिमीर लेनिन", "जोसेफ स्टालिन", "लियो ट्रॉट्स्की"], answer: "जार निकोलस II" },
    { question: "रूस में 1905 की क्रांति की शुरुआत किस घटना से हुई?", options: ["खूनी रविवार", "जार की हत्या", "फरवरी क्रांति", "अक्टूबर क्रांति"], answer: "खूनी रविवार" },
    { question: "रूस में फरवरी क्रांति कब हुई?", options: ["1917", "1905", "1924", "1939"], answer: "1917" },
    { question: "रूस में अक्टूबर क्रांति कब हुई?", options: ["1917", "1905", "1924", "1939"], answer: "1917" },
    { question: "रूसी क्रांति के बाद किसे सत्ता मिली?", options: ["बोल्शेविक", "जार", "राजतंत्रवादी", "नाजी"], answer: "बोल्शेविक" },
    { question: "बोल्शेविक पार्टी का नेतृत्व किसने किया?", options: ["व्लादिमीर लेनिन", "जार निकोलस II", "जोसेफ स्टालिन", "कार्ल मार्क्स"], answer: "व्लादिमीर लेनिन" },
    { question: "लेनिन की आर्थिक नीति क्या थी?", options: ["नयी आर्थिक नीति (NEP)", "पंचवर्षीय योजना", "पूंजीवाद", "सामंतवाद"], answer: "नयी आर्थिक नीति (NEP)" },
    { question: "रूस में समाजवादी सरकार स्थापित होने के बाद क्या हुआ?", options: ["राजशाही का अंत", "जमीन का पुनर्वितरण", "साम्यवाद की स्थापना", "सभी"], answer: "सभी" },
    { question: "लेनिन की मृत्यु कब हुई?", options: ["1924", "1917", "1939", "1945"], answer: "1924" },
    { question: "जोसेफ स्टालिन ने कौन-सी योजना लागू की?", options: ["पंचवर्षीय योजना", "नयी आर्थिक नीति", "मार्क्सवाद", "सामंतवाद"], answer: "पंचवर्षीय योजना" },
    { question: "रूसी क्रांति का सबसे महत्वपूर्ण नारा क्या था?", options: ["रोटी, शांति और भूमि", "स्वतंत्रता, समानता, बंधुत्व", "शक्ति का केंद्रीकरण", "सभी के लिए पूंजीवाद"], answer: "रोटी, शांति और भूमि" },
    { question: "रूस में नागरिक युद्ध कब हुआ?", options: ["1918-1921", "1914-1917", "1924-1928", "1939-1945"], answer: "1918-1921" },
    { question: "रूसी क्रांति का कौन-सा प्रभाव था?", options: ["साम्यवाद का प्रसार", "राजशाही का अंत", "रूस में भूमि सुधार", "सभी"], answer: "सभी" },
    { question: "रूस में बोल्शेविक और मेन्शेविक क्या थे?", options: ["समाजवादी समूह", "पूंजीवादी समूह", "सामंती वर्ग", "धार्मिक गुट"], answer: "समाजवादी समूह" },
    { question: "रूस में दुमाँ क्या था?", options: ["संसद", "सेना", "राजनीतिक दल", "कोर्ट"], answer: "संसद" },
    { question: "रूस में अक्टूबर क्रांति के बाद सरकार किसने बनाई?", options: ["बोल्शेविक", "जार", "पूंजीवादी", "धार्मिक नेता"], answer: "बोल्शेविक" },
    { question: "रूस में 1917 की क्रांति के समय मजदूरों के संगठन को क्या कहा जाता था?", options: ["सोवियत", "दुमाँ", "बोल्शेविक", "मेन्शेविक"], answer: "सोवियत" }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 20;

const startButton = document.getElementById("startButton");
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const lightElement = document.getElementById("light");

// **क्विज़ स्टार्ट करने का फ़ंक्शन**
startButton.addEventListener("click", startQuiz);

function startQuiz() {
    startButton.style.display = "none";  // स्टार्ट बटन हटाएं
    loadQuestion();
}

// **प्रश्न लोड करने का फ़ंक्शन (हर सवाल के लिए नया टाइमर)**
function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        let questionData = questions[currentQuestionIndex];
        questionElement.innerText = questionData.question;
        
        optionsContainer.innerHTML = "";

        questionData.options.forEach(option => {
            let button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option");
            button.addEventListener("click", () => checkAnswer(option));
            optionsContainer.appendChild(button);
        });

        // **हर नए सवाल के लिए टाइमर रीसेट करें**
        resetTimer();
    } else {
        endQuiz();
    }
}

// **उत्तर चेक करने का फ़ंक्शन**
function checkAnswer(selectedOption) {
    clearInterval(timer); // समय रोकें
    let correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
        score += 10;
        scoreElement.innerText = "स्कोर: " + score;
        lightElement.style.backgroundColor = "green"; // सही उत्तर पर लाइट हरी होगी
    } else {
        lightElement.style.backgroundColor = "red"; // गलत उत्तर पर लाइट लाल होगी
    }

    currentQuestionIndex++;
    loadQuestion();
}

// **हर सवाल के लिए नया 20 सेकंड का टाइमर**
function resetTimer() {
    clearInterval(timer);
    timeLeft = 20;
    timerElement.innerText = "समय: " + timeLeft + " सेकंड";

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = "समय: " + timeLeft + " सेकंड";

        if (timeLeft === 0) {
            clearInterval(timer);
            currentQuestionIndex++; // अगले सवाल पर जाएं
            loadQuestion();
        }
    }, 1000);
}

// **क्विज़ खत्म होने का फ़ंक्शन**
function endQuiz() {
    clearInterval(timer);
    questionElement.innerText = "क्विज़ समाप्त हुआ!";
    optionsContainer.innerHTML = "";
    timerElement.innerText = "";
    lightElement.style.backgroundColor = "#ccc"; // लाइट को सामान्य करें
}
