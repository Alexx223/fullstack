let total = 0;
let buffer = "0";
let prevOperator;

const screen = document.querySelector(".screen");

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'AC':
            buffer = "0";
            total = 0;
            break;
        case "=":
            if(prevOperator === null){
                return
            }    
            flushOperation(parseFloat(buffer));
            prevOperator = null;
            buffer = total;
            total = 0;
            
            break;

        case '±':
            prevOperator = null;
            buffer = -buffer;
            total = buffer;
            break;

        case '%':    
            prevOperator = 'null';
            buffer /= 100;
            total = buffer;
            break;

        case '+':
        case '÷':
        case '×':
        case ',':
        case '−':
            handleMath(symbol);
            break;


    }
}
function handleMath(symbol){
    if(buffer === '0'){
        return
    }

    const floatBuffer = parseFloat(buffer);

    if(total === 0){
        total = floatBuffer
    }else{
        flushOperation(floatBuffer);
    }
    prevOperator = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(prevOperator === '+'){
        total += intBuffer;
    }else if(prevOperator === '−'){
        total -= intBuffer;
    }else if(prevOperator === '×'){
        total *= intBuffer;
        total = total.toFixed(14);
    }else if(prevOperator === '±'){
        total = -total;
    }else if(prevOperator === '÷'){
        total /= intBuffer;
        
        const match = total.toString().match(/\.(\d+)$/);
        const nr = match ? match[1].length : 0;

        if(nr>14){
            total = total.toFixed(14);
            console.log(total)
        }
    }
}

function handleNumber(nr){
    if(buffer === '0'){
        buffer = nr;
    }else{
        buffer += nr;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    });
}



init()