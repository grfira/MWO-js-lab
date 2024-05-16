 let numberOfAttempts = 5;
 let currentAttempt = 0;
 let fastestResponse = 0;
 let slowestResponse = 0;
 let averageResponse = 0;
 let fastestResponseEver = 0;
 let responseTable = [];
 let waitForClick = false;
 let numberOfFalseStarts = 0;

 let startTime;
 let stopTime;


 function changeGameState() {
     document.getElementById('results').style.visibility = "visible";
     let button = document.getElementById('game_button');
     if (button.getAttribute('class') == "buttonGameStopped") {
         button.setAttribute('class', 'buttonGameStarted');
         button.innerText = "STOP";
         resetResults();
         printResults();
         numberOfFalseStarts = 0;
         printFalseStarts();
         currentAttempt = 0;
         waitForClick = false;
     } else {
         button.setAttribute('class', 'buttonGameStopped');
         button.innerText = "START";
     }

 }

 function activateGameArea() {
     if (document.getElementById('game_button').getAttribute('class') == "buttonGameStarted") {
         console.log("Jesteś na GameArea")
         let gameArea = document.getElementById('gameArea');
         if(waitForClick==false){
            setTimeout(startGameClock, Math.random() * 1000);
         }
     }
 }

 function startGameClock() {
     gameArea.style.backgroundColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
     startTime = new Date().getTime();
     waitForClick = true;
     console.log(new Date(startTime));
 }

 function stopGameClock() {
     if (document.getElementById('game_button').getAttribute('class') == "buttonGameStarted") {
         if (waitForClick == false) {
             numberOfFalseStarts++;
             printFalseStarts();
         } else {
             stopTime = new Date().getTime();
             currentAttempt++;
             updateResults(stopTime - startTime);
             printResults();
             console.log("response time: " + (stopTime - startTime));
             console.log("currentAttempt: " + currentAttempt);

             if (currentAttempt < numberOfAttempts) {
                 waitForClick = false;
                 setTimeout(startGameClock, Math.random() * 1000);
             } else {
                 document.getElementById('game_button').setAttribute('class', 'buttonGameStopped');
                 document.getElementById('game_button').innerText = "START";
                 printResults();
                 printFalseStarts();
                 currentAttempt = 0;
                 numberOfFalseStarts = 0;
                 resetResults();
             }
         }
     }
 }

 function updateResults(responseTime) {
     responseTable.push(responseTime);
     if (currentAttempt == 1) {
         fastestResponse = responseTime;
         slowestResponse = responseTime;
         averageResponse = responseTime;
         if (fastestResponseEver == 0) {
             fastestResponseEver = responseTime;
         } else if (responseTime < fastestResponseEver) fastestResponseEver = responseTime;
     } else {
         if (responseTime < fastestResponse) fastestResponse = responseTime;
         if (responseTime < fastestResponseEver) fastestResponseEver = responseTime;
         if (responseTime > slowestResponse) slowestResponse = responseTime;
         averageResponse = Math.round(responseTable.reduce((x, y) => x + y, 0) * 100 / responseTable.length) / 100;
     }
 }

 function resetResults() {
     fastestResponse = 0;
     slowestResponse = 0;
     averageResponse = 0;
     responseTable = [];
 }

 function printResults() {
     document.getElementById("fastestResponse").innerText = "Najkrótszy czas reakcji: " + fastestResponse + " ms";
     document.getElementById("slowestResponse").innerText = "Najdłuższy czas reakcji: " + slowestResponse + " ms";
     document.getElementById("averageResponse").innerText = "Średni czas reakcji: " + averageResponse + " ms";
     document.getElementById("responseTable").innerText = "Czasy reakcji w milisekundach: " + responseTable + " ";
     document.getElementById("fastestResponseEver").innerText = "Najkrótszy czas reakcji - najlepszy wynik: " + fastestResponseEver + " ms";
 }

 function printFalseStarts() {
     document.getElementById("numberOfFalseStarts").innerText = "Klikniecia przed zmianą koloru: " + numberOfFalseStarts + " ";
 }

 function readValues() {
     const textField = document.getElementById('myTextField')
     const checkbox = document.getElementById('myCheckbox')
     if (checkbox.checked) {
         alert(textField.value)
     }
 }