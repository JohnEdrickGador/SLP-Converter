let state = 0;
const adder = document.getElementById('adder');
const number = document.getElementById('screen');

number.textContent = state;
adder.addEventListener("click",addOne = () => {state += 1;
    console.log(state);
    number.textContent = state;
    });
