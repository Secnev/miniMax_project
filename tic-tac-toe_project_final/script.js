// Name: David Vences
// Student ID: 801045180
// Course: ITCS-6150
// Project: 3D Tic-Tac-Toe

const cellElements = document.querySelectorAll('[data-cell]')
const winningMesage = document.getElementById('winning-message')
const winningMesageText = document.getElementById('data-winning-message-text')
const loadingPage = document.getElementById('loading-page')

const board_0 = document.getElementById('board 0')
const board_1 = document.getElementById('board 1')
const board_2 = document.getElementById('board 2')
const board_3 = document.getElementById('board 3')

const X_CLASS= 'X'
const CIRCLE_CLASS = 'O'

const transpositionTable = new Map();

let xoBoard_0 = [['','','',''],['','','',''],['','','',''],['','','','']]
let xoBoard_1 = [['','','',''],['','','',''],['','','',''],['','','','']]
let xoBoard_2 = [['','','',''],['','','',''],['','','',''],['','','','']]
let xoBoard_3 = [['','','',''],['','','',''],['','','',''],['','','','']]

let difficulty =5;
let timeLimit = 20000; 
let numberOfBoards = 4; //For testing
let openSpots = 64;


startGame()
loadGame()

function startGame() {

    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true } )
    })

    

}

function loadGame(){

  //preload moves
  possibleMoves()


  loadingPage.classList.remove('flex');
  loadingPage.classList.add('hide');

  showStartScreen();
}

function showStartScreen(){
  winningMessage.classList.add('show')
}

function handleClick(e) {
    console.log('clicked') 

    //Place Mark
    const cell = e.target
    placeHumanMove(cell)
    openSpots -= 1;

    let all_xoBoards =[]

    all_xoBoards.push(xoBoard_0, xoBoard_1, xoBoard_2, xoBoard_3); 
  
    
    //Check for Win or Tie
    winner = checkWinner(all_xoBoards)
    if( winner !== null ){
        console.log(winner+' won')
        endGame(winner)
    } else {
      AIMove()
    }

    
  
}

function placeAImove(C1, C2, BNumber){


    let all_xoBoards =[]
    all_xoBoards.push(xoBoard_0, xoBoard_1, xoBoard_2, xoBoard_3); 
    console.log('LOCATION: '+BNumber+', '+C1+', '+C2)
    const chosenCell = document.getElementById('cell '+BNumber+C1+C2)
    chosenCell.classList.add(CIRCLE_CLASS)

    //all_xoBoards[BNumber][C1][C2] = CIRCLE_CLASS

    if(BNumber == 0){
      xoBoard_0[C1][C2] = CIRCLE_CLASS
    } else if(BNumber == 1){
      xoBoard_1[C1][C2] = CIRCLE_CLASS
    } else if(BNumber == 2){
      xoBoard_2[C1][C2] = CIRCLE_CLASS
    } else if(BNumber == 3){
      xoBoard_3[C1][C2] = CIRCLE_CLASS
    }
}

function placeHumanMove(cell) {
    cell.classList.add(X_CLASS)
    console.log(cell)
  
    let cellLocation = cell.getAttribute("data-cell")
    
    if(cellLocation[0]=='0'){
      xoBoard_0[parseInt(cellLocation[1])][parseInt(cellLocation[2])] = X_CLASS
    } else if(cellLocation[0]=='1'){
      xoBoard_1[parseInt(cellLocation[1])][parseInt(cellLocation[2])] = X_CLASS
    } else if(cellLocation[0]=='2'){
      xoBoard_2[parseInt(cellLocation[1])][parseInt(cellLocation[2])] = X_CLASS
    } else {
      xoBoard_3[parseInt(cellLocation[1])][parseInt(cellLocation[2])] = X_CLASS
    }
    
}

function endGame(winner){

    console.log('endGmae winner: '+winner)
  if(winner == X_CLASS || winner == CIRCLE_CLASS){
      winningMesageText.innerHTML += (winner +' wins')
      winningMessage.classList.add('show')
  } else if (winner == 'tie'){
      winningMesageText.innerHTML += 'Tie'
      winningMessage.classList.add('show')
  }

  
  
}

function removeDifficultyScreen(){

  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
})

winningMesageText.innerHTML = ("")
winningMessage.classList.remove('show')

xoBoard_0 = [['','','',''],['','','',''],['','','',''],['','','','']]
xoBoard_1 = [['','','',''],['','','',''],['','','',''],['','','','']]
xoBoard_2 = [['','','',''],['','','',''],['','','',''],['','','','']]
xoBoard_3 = [['','','',''],['','','',''],['','','',''],['','','','']]

  winningMesageText.innerHTML = ("")
  winningMessage.classList.remove('show')

  startGame();
}

function resetGame(){

  cellElements.forEach(cell => {
      cell.classList.remove(X_CLASS)
      cell.classList.remove(CIRCLE_CLASS)
  })

  winningMesageText.innerHTML = ("")
  winningMessage.classList.remove('show')

  xoBoard_0 = [['','','',''],['','','',''],['','','',''],['','','','']]
  xoBoard_1 = [['','','',''],['','','',''],['','','',''],['','','','']]
  xoBoard_2 = [['','','',''],['','','',''],['','','',''],['','','','']]
  xoBoard_3 = [['','','',''],['','','',''],['','','',''],['','','','']]

  

  //setBoardHoverClass()
  startGame()

}

function checkWinner(board) {
  
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {

      // Check rows for X
      if (
        board[i][j][0] === X_CLASS &&
        board[i][j][1] === X_CLASS &&
        board[i][j][2] === X_CLASS &&
        board[i][j][3] === X_CLASS
      ) {
        console.log('X WON IN ROWS')
        return X_CLASS;
      }

      // Check columns for X
      if (
        board[j][0][i] === X_CLASS &&
        board[j][1][i] === X_CLASS &&
        board[j][2][i] === X_CLASS &&
        board[j][3][i] === X_CLASS
      ) {

        console.log('X WON IN COLUMN')
        return X_CLASS;
      }

      //Check rows for O
      if (
        board[i][j][0] === CIRCLE_CLASS &&
        board[i][j][1] === CIRCLE_CLASS &&
        board[i][j][2] === CIRCLE_CLASS &&
        board[i][j][3] === CIRCLE_CLASS
      ) {
        return CIRCLE_CLASS;
      }

      // Check columns for O
      if (
        board[j][0][i] === CIRCLE_CLASS &&
        board[j][1][i] === CIRCLE_CLASS &&
        board[j][2][i] === CIRCLE_CLASS &&
        board[j][3][i] === CIRCLE_CLASS
      ) {
        return CIRCLE_CLASS;
      }

      //3d Columns for X
      if (
        board[0][i][j] === X_CLASS &&
        board[1][i][j] === X_CLASS &&
        board[2][i][j] === X_CLASS &&
        board[3][i][j] === X_CLASS
      ) {
        return X_CLASS;
      }

      //3D columns for O
      if (
        board[0][i][j] === CIRCLE_CLASS &&
        board[1][i][j] === CIRCLE_CLASS &&
        board[2][i][j] === CIRCLE_CLASS &&
        board[3][i][j] === CIRCLE_CLASS
      ) {
        return CIRCLE_CLASS;
      }

    }



    // Check 2D diagonals for X
    if (
      board[i][0][0] === X_CLASS &&
      board[i][1][1] === X_CLASS &&
      board[i][2][2] === X_CLASS &&
      board[i][3][3] === X_CLASS
    ) {
      return X_CLASS;
    }

    if (
      board[i][0][3] === X_CLASS &&
      board[i][1][2] === X_CLASS &&
      board[i][2][1] === X_CLASS &&
      board[i][3][0] === X_CLASS
    ) {
      return X_CLASS;
    }

    // Check 3D diagonals for X
    if (
      board[0][0][i] === X_CLASS &&
      board[1][1][i] === X_CLASS &&
      board[2][2][i] === X_CLASS &&
      board[3][3][i] === X_CLASS
    ) {
      return X_CLASS;
    }

    if (
      board[0][3][i] === X_CLASS &&
      board[1][2][i] === X_CLASS &&
      board[2][1][i] === X_CLASS &&
      board[3][0][i] === X_CLASS
    ) {
      return X_CLASS;
    }

    //Check 2D Diagonals for O
    if (
      board[i][0][0] === CIRCLE_CLASS &&
      board[i][1][1] === CIRCLE_CLASS &&
      board[i][2][2] === CIRCLE_CLASS &&
      board[i][3][3] === CIRCLE_CLASS
    ) {
      return CIRCLE_CLASS;
    }

    if (
      board[i][0][3] === CIRCLE_CLASS &&
      board[i][1][2] === CIRCLE_CLASS &&
      board[i][2][1] === CIRCLE_CLASS &&
      board[i][3][0] === CIRCLE_CLASS
    ) {
      return CIRCLE_CLASS;
    }

    // Check 3D diagonals for O
    if (
      board[0][0][i] === CIRCLE_CLASS &&
      board[1][1][i] === CIRCLE_CLASS &&
      board[2][2][i] === CIRCLE_CLASS &&
      board[3][3][i] === CIRCLE_CLASS
    ) {
      return CIRCLE_CLASS;
    }

    if (
      board[0][3][i] === CIRCLE_CLASS &&
      board[1][2][i] === CIRCLE_CLASS &&
      board[2][1][i] === CIRCLE_CLASS &&
      board[3][0][i] === CIRCLE_CLASS
    ) {
      return CIRCLE_CLASS;
    }
  }

  // Check main diagonal in 3D for X
  if (
    board[0][0][0] === X_CLASS &&
    board[1][1][1] === X_CLASS &&
    board[2][2][2] === X_CLASS &&
    board[3][3][3] === X_CLASS
  ) {
    return X_CLASS;
  }

  // Check reverse diagonal in 3D for X
  if (
    board[0][3][3] === X_CLASS &&
    board[1][2][2] === X_CLASS &&
    board[2][1][1] === X_CLASS &&
    board[3][0][0] === X_CLASS
  ) {
    return X_CLASS;
  }

  //Check main diagonal in 3D for O
  if (
    board[0][0][0] === CIRCLE_CLASS &&
    board[1][1][1] === CIRCLE_CLASS &&
    board[2][2][2] === CIRCLE_CLASS &&
    board[3][3][3] === CIRCLE_CLASS
  ) {
    return CIRCLE_CLASS;
  }

  // Check reverse diagonal in 3D for O
  if (
    board[0][3][3] === CIRCLE_CLASS &&
    board[1][2][2] === CIRCLE_CLASS &&
    board[2][1][1] === CIRCLE_CLASS &&
    board[3][0][0] === CIRCLE_CLASS
  ) {
    return CIRCLE_CLASS;
  }


    //Check if game is tied
    /*let openSpots = 0;
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          for (let k = 0; k < 4; k++) {

            if (board[i][j][k] == '') {
                openSpots++;
            }
          }
        }
    }*/

    if(openSpots == 0){
        return 'tie';
    }

    return null;

}

function AIMove(){

  const startTime = Date.now();
  console.log("Start time: "+startTime)

  let all_xoBoards =[]

  all_xoBoards.push(xoBoard_0, xoBoard_1, xoBoard_2, xoBoard_3); 

  let bestScore = -Infinity;
  let bestMove = {b:0, x:0, y:0}
  
  
  for (let i = 0; i < numberOfBoards; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {

        

        if (all_xoBoards[i][j][k] == '') { 
          all_xoBoards[i][j][k] = CIRCLE_CLASS;
          let score = miniMax(all_xoBoards, 1, false, -Infinity, Infinity, startTime);
          //console.log("SCORE AI Move: "+score)
          all_xoBoards[i][j][k] = '';
          if (score > bestScore) {
            //console.log("BEST SCORE BEFORE: "+ bestScore)
            //console.log("UPDATING BEST SCORE AND BEST MOVE")
              bestScore = score;
              bestMove.b = i
              bestMove.x = j;
              bestMove.y = k;
              //console.log("BEST SCORE AFTER: "+bestScore)

          }

          if (Date.now() - startTime > timeLimit) { 
            //console.log("End time time: "+Date.now())
            //console.log("Time taken: "+(Date.now() - startTime))
            break;
          }
        }
      }
    }
  }

    placeAImove(bestMove.x, bestMove.y, bestMove.b)
    openSpots -= 1;

     winner = checkWinner(all_xoBoards)
     if( winner !== null ){
         //console.log(winner+' won')
       endGame(winner)
     } else {
      //console.log('CHECKED MOVE: '+ winner)
     }
} 

function possibleMoves(){

  const startTime = Date.now();

  let all_xoBoards =[]

  all_xoBoards.push(xoBoard_0, xoBoard_1, xoBoard_2, xoBoard_3); 
  
  
  for (let i = numberOfBoards-1; i > 0; i--) {
    for (let j = 3; j >= 0; j--) {
      for (let k = 3; k >= 0; k--) {

        

        if (all_xoBoards[i][j][k] == '') { 
          all_xoBoards[i][j][k] = CIRCLE_CLASS;
          possibleMoveMiniMax(all_xoBoards, 0, false, -Infinity, Infinity);
          //console.log("SCORE AI Move: "+score)
          all_xoBoards[i][j][k] = '';
          
          /*if (Date.now() - startTime > timeLimit) { // Adjust the time limit as needed (in milliseconds)
            //console.log("End time time: "+Date.now())
            //console.log("Time taken: "+(Date.now() - startTime))
            break;
          }*/
        }
      }
    }
  }
}

function possibleMoveMiniMax(boards, depth, isMaximizing, alpha, beta) {

  const hash = calculateHash(boards); // function to calculate a unique hash for the current board state
  
  if (transpositionTable.has(hash) && transpositionTable.get(hash).depth >= depth) {
    //console.log('USED TRANSPOSITION TABLE: MATCH FOUND')
    const cachedEntry = transpositionTable.get(hash);
    if (cachedEntry.type === 'exact') {
      //console.log('USED TRANSPOSITION TABLE: EXACT')
      return cachedEntry.score;
    } else if (cachedEntry.type === 'lower' && cachedEntry.score > alpha) {
      alpha = cachedEntry.score;
      //console.log('USED TRANSPOSITION TABLE: lower')
    } else if (cachedEntry.type === 'upper' && cachedEntry.score < beta) {
      beta = cachedEntry.score;
      //console.log('USED TRANSPOSITION TABLE: upper')
    }

    if (alpha >= beta) {
      //console.log('USED TRANSPOSITION TABLE: new score')
      return cachedEntry.score;
    }

  }

  //console.log('TRANSPOSITION TABLE: NO MATCH FOUND')

 

  //console.log("is Maximizing: "+isMaximizing)

    let result = checkWinner(boards);
    //console.log("result: "+result)

    

    if(result == X_CLASS ||result == CIRCLE_CLASS){
        return getScore(result, depth)
    } else if((depth) == (difficulty)){
      //console.log("Depth: " +depth)
      return getScore(result, depth);
    } 

    
  
    if(isMaximizing) {

      //console.log("MAXIMIZINGGGGGGGGGGGGGG")
      let bestScore = -Infinity;
      for (let i = numberOfBoards-1; i > 0; i--) {
        for (let j = 3; j >= 0; j--) {
          for (let k = 3; k >= 0; k--) {
            if (boards[i][j][k] == '') {
              boards[i][j][k] = CIRCLE_CLASS;
              let score = possibleMoveMiniMax(boards, depth + 1, false, alpha, beta);
              //console.log("Maximizing scoe: "+score)
              boards[i][j][k] = '';
              bestScore = Math.max(score, bestScore);
              alpha = Math.max(alpha, score)
              //console.log("MAXIMIZING alpha: "+alpha+" Beta: "+beta)

              //Add board to transpositionalTable
              const entry = {
                  depth: depth,
                  type: 'exact',
                  score: bestScore,
              };
              if (bestScore <= alpha) {
                entry.type = 'upper';
              } else if (bestScore >= beta) {
                entry.type = 'lower';
              }
              //console.log("new transpositionTable entry")
              transpositionTable.set(hash, entry);
              
              if(beta <= alpha){
                //console.log("PRUNED")
                return bestScore; //Prune
              }

            }
          }
        }
      }
      return bestScore;
    } else {
      //console.log("ELSEEEEEEEEEEEEEE")
      let bestScore = Infinity;
      for (let i = numberOfBoards-1; i > 0; i--) {
        for (let j = 3; j >- 0; j--) {
          for (let k = 3; k >= 0; k--) {
            if (boards[i][j][k] == '') {
              boards[i][j][k] = X_CLASS;
              let score = possibleMoveMiniMax(boards, depth + 1, true, alpha, beta);
              //console.log("Minimizing score: "+score)
              boards[i][j][k]= '';
              bestScore = Math.min(score, bestScore);
              beta = Math.min(beta, score)
              //console.log(" ELSE alpha: "+alpha+" Beta: "+beta)

              //Add board to transpositionalTable
              const entry = {
                  depth: depth,
                  type: 'exact',
                  score: bestScore,
              };

              if (bestScore <= alpha) {
                entry.type = 'upper';
              } else if (bestScore >= beta) {
                entry.type = 'lower';
              }
              //console.log("new transpositionTable entry")
              transpositionTable.set(hash, entry);

              if(beta <= alpha ){
                //console.log("PRUNED")
                return bestScore; //Prune
              }
            }
          }
        }
      }
      return bestScore;
    }
}

function miniMax(boards, depth, isMaximizing, alpha, beta, time) {

  const hash = calculateHash(boards); // function to calculate a unique hash for the current board state
  
  if (transpositionTable.has(hash) && transpositionTable.get(hash).depth >= depth) {
    //console.log('USED TRANSPOSITION TABLE: MATCH FOUND')
    const cachedEntry = transpositionTable.get(hash);
    if (cachedEntry.type === 'exact') {
      //console.log('USED TRANSPOSITION TABLE: EXACT')
      return cachedEntry.score;
    } else if (cachedEntry.type === 'lower' && cachedEntry.score > alpha) {
      alpha = cachedEntry.score;
      //console.log('USED TRANSPOSITION TABLE: lower')
    } else if (cachedEntry.type === 'upper' && cachedEntry.score < beta) {
      beta = cachedEntry.score;
      //console.log('USED TRANSPOSITION TABLE: upper')
    }

    if (alpha >= beta) {
      //console.log('USED TRANSPOSITION TABLE: new score')
      return cachedEntry.score;
    }

  }

  //console.log('TRANSPOSITION TABLE: NO MATCH FOUND')

 

  //console.log("is Maximizing: "+isMaximizing)

    let result = checkWinner(boards);
    //console.log("result: "+result)

    

    if(result == X_CLASS ||result == CIRCLE_CLASS){
        return getScore(result, depth)
    } else if((depth) == (difficulty)){
      //console.log("Depth: " +depth)
      return getScore(result, depth);
    } 

    
  
    if(isMaximizing) {

      //console.log("MAXIMIZINGGGGGGGGGGGGGG")
      let bestScore = -Infinity;
      for (let i = 0; i < numberOfBoards; i++) {
        for (let j = 0; j < 4; j++) {
          for (let k = 0; k < 4; k++) {
            if (boards[i][j][k] == '') {
              boards[i][j][k] = CIRCLE_CLASS;
              let score = miniMax(boards, depth + 1, false, alpha, beta, time);
              //console.log("Maximizing scoe: "+score)
              boards[i][j][k] = '';
              bestScore = Math.max(score, bestScore);
              alpha = Math.max(alpha, score)
              //console.log("MAXIMIZING alpha: "+alpha+" Beta: "+beta)

              //Add board to transpositionalTable
              const entry = {
                  depth: depth,
                  type: 'exact',
                  score: bestScore,
              };
              if (bestScore <= alpha) {
                entry.type = 'upper';
              } else if (bestScore >= beta) {
                entry.type = 'lower';
              }
              //console.log("new transpositionTable entry")
              transpositionTable.set(hash, entry);
              
              if(beta <= alpha){
                //console.log("PRUNED")
                return bestScore; //Prune
              }

            }
          }
        }
      }
      return bestScore;
    } else {
      //console.log("ELSEEEEEEEEEEEEEE")
      let bestScore = Infinity;
      for (let i = 0; i < numberOfBoards; i++) {
        for (let j = 0; j < 4; j++) {
          for (let k = 0; k < 4; k++) {
            if (boards[i][j][k] == '') {
              boards[i][j][k] = X_CLASS;
              let score = miniMax(boards, depth + 1, true, alpha, beta, time);
              //console.log("Minimizing score: "+score)
              boards[i][j][k]= '';
              bestScore = Math.min(score, bestScore);
              beta = Math.min(beta, score)
              //console.log(" ELSE alpha: "+alpha+" Beta: "+beta)

              //Add board to transpositionalTable
              const entry = {
                  depth: depth,
                  type: 'exact',
                  score: bestScore,
              };

              if (bestScore <= alpha) {
                entry.type = 'upper';
              } else if (bestScore >= beta) {
                entry.type = 'lower';
              }
              //console.log("new transpositionTable entry")
              transpositionTable.set(hash, entry);

              if(beta <= alpha ){
                //console.log("PRUNED")
                return bestScore; //Prune
              }
            }
          }
        }
      }
      return bestScore;
    }
}
// Function to calculate a unique hash for the current board state
function calculateHash(boards) {
  let hash = '';

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      for (let k = 0; k < 4; k++) {
        hash += boards[i][j][k] || ' '; // Use ' ' for empty cells
      }
    }
  }

  return hash;
}

function getScore(result, depth){

  if(result == X_CLASS){
    return -100 -(63+depth)
  } else if (result == CIRCLE_CLASS){
      return 100 + (63-depth)
  } else {
      return 0 - depth
  }
}

function easyLevel(){
  difficulty = 6;
  timeLimit = 500;
  removeDifficultyScreen();
}

function mediumLevel(){
  difficulty = 4;
  timeLimit = 1000;
  removeDifficultyScreen();
}

function insaneLevel(){
  //Best settings: difficulty: 4, timeLimit: 20000
  difficulty = 2;
  timeLimit = 20000;
  removeDifficultyScreen();
}
