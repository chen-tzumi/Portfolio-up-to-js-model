let userPoints = 0;
let numTr = 0;
let isMessageDisplayed = false;

let userTable = [
    {
        currentExercise : "currentExercise",
        correctAnswer : "correctAnswer",
        userAnswer : "userAnswer",
        userPoints : "userPoints"
    }
]

const check = localStorage.getItem("userTableKey");

if (check){
    console.log("full table")
}
else{
    console.log("ampty");
    localStorage.setItem("userTableKey",JSON.stringify(userTable));
}

const currentOperatorFun = () => {
    const operator = document.getElementById("select-operator").value;
    let currentOperator;
    switch(operator){
        case "+":
            currentOperator = "+";
            break;
            case "-":
                currentOperator = "-";
                break; 
                case "*":
                    currentOperator = "*";
                    break; 
                    case "/":
                        currentOperator = "/";
                        break;      
                        default:
                            alert("problem");
      
    }
    return currentOperator;
}

const DubbleNumToRangeFun = () => {
    const range = document.getElementById("select-range").value;
    let DubbleNumToRange;
    switch(range){
        case "1-10":
            DubbleNumToRange = "10";
            break;
            case "1-100":
                DubbleNumToRange = "100";
                break; 
                case "1-1000":
                    DubbleNumToRange = "1000";
                    break;     
                        default:
                            alert("problem");
      
    }
    return DubbleNumToRange;
}

const creatExerciseFun = (currentOperator, DubbleNumToRange) => {

    let randomNum1 = Math.ceil(Math.random() * Number(DubbleNumToRange));
    let randomNum2 = Math.ceil(Math.random() * Number(DubbleNumToRange));

    let exerciseArr=[];

    switch(currentOperator){
        case "+":
            exerciseArr = [` ${randomNum1} ${currentOperator} ${randomNum2}`, randomNum1 + randomNum2];
            break;
            case "-":
                exerciseArr = [` ${randomNum1} ${currentOperator} ${randomNum2}`, randomNum1 - randomNum2];
                break; 
                case "*":
                    exerciseArr = [` ${randomNum1} ${currentOperator} ${randomNum2}`, randomNum1 * randomNum2];
                    break;     
                    case "/":
                        exerciseArr = [` ${randomNum1} ${currentOperator} ${randomNum2}`, Math.ceil(randomNum1 / randomNum2)];
                        break;
                        default:
                            alert("problem");
      
    }
    return exerciseArr;
}

const pointsFun = (correctAnswer) => {
    let userAnswer = document.getElementById("answer").value;
    if(correctAnswer == userAnswer){
        return userPoints = userPoints + 10;
    }
    else{ 
        return userPoints = userPoints - 10;
    }
}

const trCreator = (currentExercise, correctAnswer, userAnswer, userPoints) => {
    const table = document.getElementById("table");

    const trOfTd = document.createElement("tr");

    const currentExerciseTd = document.createElement("td");
    currentExerciseTd.innerText = currentExercise;
    const correctAnswerTd = document.createElement("td");
    correctAnswerTd.innerText = correctAnswer;
    const userAnswerTd = document.createElement("td");
    userAnswerTd.innerText = userAnswer;
    const userPointsTd = document.createElement("td");
    userPointsTd.innerText = userPoints;

    trOfTd.appendChild(currentExerciseTd);
    trOfTd.appendChild(correctAnswerTd);
    trOfTd.appendChild(userAnswerTd);
    trOfTd.appendChild(userPointsTd);

    table.appendChild(trOfTd);
    numTr++;

    const row = {
        currentExercisePar : currentExercise,
        correctAnswerPar : correctAnswer,
        userAnswerPar : userAnswer,
        userPointsPar : userPoints
    }

    let newUserTable = JSON.parse(localStorage.getItem("userTableKey"));
    newUserTable.push(row);

    localStorage.setItem("userTableKey", JSON.stringify(newUserTable));
}

const parameters = () => {
    document.getElementById("submitParameters").addEventListener("click", (event) => {
        event.preventDefault();

        let exerciseDiv = document.getElementById("exercise");
        let temporaryMessageDiv = document.getElementById("temporaryMessageDiv");

        const DubbleNumToRange = DubbleNumToRangeFun();
        const currentOperator = currentOperatorFun();
        const ParametersArr = creatExerciseFun(currentOperator, DubbleNumToRange);
        correctAnswer = ParametersArr[1];
        currentExercise = ParametersArr[0];

        if (isNaN(correctAnswer)){
            if (isMessageDisplayed) return;
            isMessageDisplayed = true;
            const p = document.createElement('p');
            p.id = 'temporaryMessage';
            p.innerText = "Choose a range and operator to start the game";
            p.style.backgroundColor = "#618a89";
            p.style.borderRadius = "1.5em";
            p.style.lineHeight = "2em";
            temporaryMessageDiv.appendChild(p);

            p.style.display = 'block';
            setTimeout(() => {
                p.style.display = 'none';
                temporaryMessageDiv.removeChild(p);
                isMessageDisplayed = false;
            }, 2100);
        }
        else{
            exerciseDiv.innerText = currentExercise;
        }
    })
}

const game = () => {
    document.getElementById("submitAnswer").addEventListener("click", (event) => {

        event.preventDefault();
        let userAnswer = document.getElementById("answer").value;
        let userPoints = pointsFun(correctAnswer);
        trCreator(currentExercise, correctAnswer, userAnswer, userPoints);
    })
}

const startOver = () => {
    document.getElementById("starOver").addEventListener("click", (event) => {
        event.preventDefault();
        userPoints = 0;

        const table = document.getElementById("table");
        const rows = table.getElementsByTagName("tr");
        
        while(rows.length > 1) { 
            table.deleteRow(1); 
        }
    })
}

parameters();
game();
startOver();
