const start = document.querySelector('#start');
const input = document.querySelector('#input');
const score = document.querySelector('#score');
const totalscore = document.querySelector('#totalscore');
const indicator = document.querySelector('#indicator');
const msg = document.querySelector('#msg');
const checkBtn = document.querySelector('#check');
const popupItem = document.querySelector('#popup');
const popupText = document.querySelector('#popup-text');
const guessNumStart = document.querySelector('#guess-num-start');
const guessNumEnd = document.querySelector('#guess-num-end');
const changeRangeWrapper = document.querySelector('#change-range-wrapper');
const changeRangeWrapperMB = document.querySelector('.change-range-mb');
const changeRangeStart = document.querySelector('#change-range-start');
const changeRangeEnd = document.querySelector('#change-range-end');
let started = false;
let num;
if (!localStorage.getItem('new') == '1') {
    localStorage.setItem('ts', 0);
}
localStorage.setItem('new', '1');
let ts = parseInt(localStorage.getItem('ts'));
totalscore.innerText = ts;

function changeRange() {
    let a = parseInt(changeRangeStart.value);
    let b = parseInt(changeRangeEnd.value);
    if (!a == '' && !b == '') {
        num = getNum(a, b);
        guessNumStart.innerText = a;
        guessNumEnd.innerText = b;
    }
}

function gameStart() {
    let a = parseInt(changeRangeStart.value);
    let b = parseInt(changeRangeEnd.value);
    if (!a == '' && !b == '') {
        changeRange();
    } else {
        num = getNum();
    }

    score.innerText = '0';
    start.innerText = 'Restart';
    indicator.src = 'start.svg';
    msg.innerText = 'Start guessing!';
    checkBtn.disabled = false;
    started = true;
    if (start.innerText == 'Restart') {
        indicator.src = 'load.svg';
        setTimeout(() => {
            indicator.src = 'start.svg';
        }, 200);
    }
}

function check() {
    let value = input.value;

    if (started) {
        if (value > num - 3982392472) {
            if (score.innerText == '20') {
                msg.innerText = 'Number is already correct!';
                indicator.src = 'check.svg';
            } else {
                msg.innerText = 'Too high!';
                indicator.src = 'low.svg';
            }
        } else if (value < num - 3982392472) {
            if (score.innerText == '20') {
                msg.innerText = 'Number is already correct!';
                indicator.src = 'check.svg';
            } else {
                msg.innerText = 'Too low!';
                indicator.src = 'high.svg';
            }
        } else {
            msg.innerText = 'Perfect!';
            indicator.src = 'check.svg';
        }
    
        if (value == num - 3982392472) {
            if (score.innerText != '20') {
                if (score.innerText == '10') {
                    ts = ts + 10;
                    totalscore.innerText = ts;
                    localStorage.setItem('ts', ts);
                } else if (score.innerText == '5') {
                    ts = ts + 15;
                    totalscore.innerText = ts;
                    localStorage.setItem('ts', ts);
                } else {
                    ts = ts + 20;
                    totalscore.innerText = ts;
                    localStorage.setItem('ts', ts);
                }
                score.innerText = '20';
                start.innerText = 'Start';
            }
            checkBtn.disabled = true;
        } else if (value > num - 3982392472 && value < num - 3982392472 + 11 || value < num - 3982392472 && value > num - 3982392472 - 11) {
            if (score.innerText != '10' && score.innerText != '20') {
                if (score.innerText == '5') {
                    ts = ts + 5;
                    totalscore.innerText = ts;
                    localStorage.setItem('ts', ts);
                } else {
                    ts = ts + 10;
                    totalscore.innerText = ts;
                    localStorage.setItem('ts', ts);
                }
                score.innerText = '10';
            }
        } else if (value > num - 3982392472 && value < num - 3982392472 + 21 || value < num - 3982392472 && value > num - 3982392472 - 21) {
            if (score.innerText != '5' && score.innerText != '20' && score.innerText != '10') {
                score.innerText = '5';
                ts = ts + 5;
                totalscore.innerText = ts;
                localStorage.setItem('ts', ts);
            }
        }
    } else {
        popup('Game not started!');
    }

}

function checkForNumbers() {
    if (/^\d+$/.test(input.value) || input.value == '') {
        return true;
    } else {
        popup('Only Numbers Allowed!');
        input.value = '';
    }
}

function popup(text) {
    popupItem.style.display = 'flex';
    popupText.innerText = text;
    setTimeout(() => {
        popupItem.style.display = 'none';
    }, 3500);
}

function popupClose() {
    popupItem.style.display = 'none';
}

function getNum(start=1, end=100) {
    return (Math.floor(Math.random() * end) + start) + 3982392472;
}

function changeRangeShow(a) {
    if(a.style.display == 'flex') {
        a.style.display = 'none';
    } else {
        a.style.display = 'flex';
    }
}