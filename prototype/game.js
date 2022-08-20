(() => {
    const oversInInnings = 1;
    const ballsInOver = 6;
    const inningsWickets = 2;
    const bowlingDice = [1,2,3,4,6,'Owzthat'];
    const umpireDice = ['Bowled', 'Stumped', 'Caught', 'L.B.W.', 'Not out', 'No ball'];
    
    const rollDice = (dice) => dice[Math.floor(Math.random() * dice.length)];
    
    const bowl = () => rollDice(bowlingDice);
    
    const appealDecision = () => rollDice(umpireDice);

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

            console.log(`${o}.${b} - ${bowlResult} - ${runs}/${wickets} ${decision}`);
            
            if (wickets === inningsWickets) break;
        }

        if (wickets === inningsWickets) break;
    }
})();