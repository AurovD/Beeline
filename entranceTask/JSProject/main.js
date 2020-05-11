let group = document.querySelector(".group");
let box = document.querySelectorAll(".box");
let text = document.getElementById("text");
let button = document.querySelector("button");
let header = document.querySelector(".header");
let typebox = document.querySelector(".type_box");
let questionNum = 0;
let numbers = [];
let num = [];
let one;
let two;
let userChat = ["/start", "/name:", "/number:", ""];
let botChat = ["", "", "", ""];

text.addEventListener("keydown", function () {
    typebox.style.display = "block";
    time();
});
function time() {
    setTimeout(function () {
        typebox.style.display = "none";
    }, 4000);
}

function check() {
    let answer;
    for (let i = 0; i < userChat.length; i++) {
        let oper = ["-", "+", "*", "/"];
        for (let i = 0; i < oper.length; i++) {
            if (text.value === oper[i]) {
                answer = oper[i];
                userChat[3] = answer;
            } else if (text.value === userChat[i]) {
                answer = text.value;
            }
        }
        if (text.value.substr(0, 6) === userChat[i]) {
            answer = text.value.substr(0, 6);
        }
        if (text.value.substr(0, 8) === userChat[i]) {
            answer = text.value.substr(0, 8);
        }
    }
    return answer;

}


function buttonCheck() {
    if (text.value !== "") {
        button.disabled = false;
        button.style.backgroundImage = "url(Images/Path-1.svg)";
    } else if (text.value === "") {
        button.disabled = true;
        button.style.backgroundImage = "url(Images/Path.svg)";
    }
}

function getNum(textValue) {
    let number = textValue.split(" ");
    let numOne = number[number.length - 1];
    numOne = +(numOne);
    numbers.push(numOne);

    let numTwo;
    if (number.length !== 2) {
        numTwo = number[number.length - 2];
    } else {
        number.pop();
        number = number.join(".");
        number = number.split(":");
        numTwo = number[number.length - 1];
    }
    numTwo = +(numTwo);
    numbers.push(numTwo);
    return numbers;
}


function getCalc(numOne, numTwo, answer) {
    let result;

    if (answer === "-") {
        result = numOne - numTwo;
    } else if (answer === "+") {
        result = numOne + numTwo;
    } else if (answer === "*") {
        result = numOne * numTwo;
    } else if (answer === "/") {
        result = numOne / numTwo;
    }
    return result;
}
function chat(textValue, answer) {
    let bot_image = "bot_image";
    let name;
    if (textValue === "/stop" || textValue === "/weather") {
        if ("/stop" === textValue) {
            let message = `Всего доброго, если хочешь поговорить пиши /start`;
            createMessage(message, bot_image, "");
            questionNum = 0;
        }
        if ("/weather" === textValue) {
            let script = document.createElement("div");
            script.className = "box";
            script.innerHTML = `<div class="image bot_image"></div><div class="weather"><a href="https://clck.yandex.ru/redir/dtype=stred/pid=7/cid=1228/*https://yandex.ru/pogoda/213" target="_blank"><img src="https://info.weather.yandex.net/213/2_white.ru.png?domain=ru" border="0" alt="Яндекс.Погода"/><img width="1" height="1" src="https://clck.yandex.ru/click/dtype=stred/pid=7/cid=1227/*https://img.yandex.ru/i/pix.gif" alt="" border="0"/></a></div>`
            group.appendChild(script);
        }

    } else if (userChat[questionNum] === answer) {
        let botChat = ["", "", "", ""];
        name = textValue.substr(7);
        if (questionNum === 2) {
            num = getNum(textValue);
            one = num[1];
            two = num[0];
        }
        botChat[0] = "Привет, меня зовут Чат-бот, а как зовут тебя?(/name: имя)";
        botChat[1] = `Привет, ${name}, приятно познакомится. Я умею считать, введи числа которые надо посчитать(/number: число число)`;
        botChat[2] = `Вы ввели ${num[1]} и ${num[0]}. Выберите действие: -, +, *, /`;
        botChat[3] = `Результат вычисления: ${getCalc(one, two, answer)}. Можешь ввести другие числа.`;
        createMessage(botChat[questionNum], bot_image);
        questionNum++;
        if (questionNum === 4) {
            questionNum = 2;
        }
    } else if (!textValue.includes("/start") && questionNum === 0) {
        let error = "Введите команду /start, для начала общения";
        createMessage(error, bot_image, "");
    } else if (questionNum > 0) {
        let error = "Я не понимаю, введите другую команду!";
        createMessage(error, bot_image, "");
    }
}
function getText() {
    let textValue = text.value;
    let childs = group.children;
    createMessage(textValue, "user_image", "user_message");
    let answer = check();
    setTimeout(function run() {
        chat(textValue, answer);
    }, 2000);
    text.value = "";
    if (childs.length >= 7) {
        childs[2].remove();
        childs[3].remove();
        childs[4].remove();
    }
    buttonCheck();
}
function createMessage(text, image, user) {
    setTimeout(function run() {
        let message = document.createElement("div");
        message.className = "box";
        message.innerHTML = `<div class=" image ${image}"></div>
    <div class="message ${user}">${text}</div>`;
        group.appendChild(message);
    }, 1000);
}


