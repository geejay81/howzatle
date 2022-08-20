(() => {
    const playButton = document.getElementById('playButton');
    const scoreCardList = document.getElementById('scoreCardList');
    const statistics = document.getElementById('statistics');
    const oversInInnings = 1;
    const ballsInOver = 6;
    const inningsWickets = 2;
    const bowlingDice = [1,2,3,4,6,'Owzthat'];
    const umpireDice = ['Bowled', 'Stumped', 'Caught', 'L.B.W.', 'Not out', 'No ball'];
    const gameHistory = [];
    
    const rollDice = (dice) => dice[Math.floor(Math.random() * dice.length)];
    
    const bowl = () => rollDice(bowlingDice);
    
    const appealDecision = () => rollDice(umpireDice);

    const playGame = () => {

        let runs = 0;
        let wickets = 0;

        for (let o = 0; o < oversInInnings; o++) {
            for (let b = 1; b <= ballsInOver; b++) {
    
                let runsThisBall = 0;
                let decision = ''
                
                const bowlResult = bowl();
    
                if (bowlResult === bowlingDice[bowlingDice.length - 1]) {
                    decision = appealDecision();
                    if (decision ===  umpireDice[umpireDice.length - 1]) {
                        b--;
                        runsThisBall++;
                    } else if (decision !== umpireDice[umpireDice.length - 2]) {
                        wickets++;
                    }
                } else if (!isNaN(bowlResult)) {
                    runsThisBall += bowlResult;
                }
    
                runs += runsThisBall;

                const scoreCardBall = document.createElement('li');
                scoreCardBall.innerHTML = `${o}.${b} - ${bowlResult} - ${runs}/${wickets} ${decision}`;
                scoreCardList.appendChild(scoreCardBall);
                
                if (wickets === inningsWickets) break;
            }
    
            if (wickets === inningsWickets) break;
        }

        gameHistory.push(runs);
    }

    const updateStatistics = () => {
        const formatElement = (inner, elementType) => {
            const element = document.createElement(elementType);
            element.innerHTML = inner;
            return element;
        }

        const calculateAverageScore = () => {
            if (gameHistory.length === 0) return 0;
            const totalOfScores = gameHistory.reduce((running, s) => running + s, 0);
            return totalOfScores / gameHistory.length;
        }

        statistics.innerHTML = '';
        statistics.appendChild(formatElement('Games played', 'dt'));
        statistics.appendChild(formatElement(gameHistory.length, 'dd'));

        if (gameHistory.length > 0) {
            statistics.appendChild(formatElement('Last score', 'dt'));
            statistics.appendChild(formatElement(gameHistory[gameHistory.length - 1], 'dd'));
            statistics.appendChild(formatElement('Highest score', 'dt'));
            statistics.appendChild(formatElement(Math.max(...gameHistory), 'dd'));
            statistics.appendChild(formatElement('Lowest score', 'dt'));
            statistics.appendChild(formatElement(Math.min(...gameHistory), 'dd'));
            statistics.appendChild(formatElement('Average score', 'dt'));
            statistics.appendChild(formatElement(calculateAverageScore(), 'dd'));
        }
    }

    playButton.addEventListener('click', () => {
        scoreCardList.innerHTML = '';
        playGame();
        updateStatistics();
    });
})();