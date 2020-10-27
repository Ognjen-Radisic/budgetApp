import {elements} from './base';

export const getInputValues = () =>{
    return {
        type: document.querySelector(elements.inputType).value,
        description: document.querySelector(elements.inputDescription).value,
        value: parseFloat(document.querySelector(elements.inputValue).value)
    }
}

export const clearInputValues = () =>{
    //clear description and value after submit button and after that, set focus to description
    document.querySelector(elements.inputDescription).value = '';
    document.querySelector(elements.inputValue).value ='';

    document.querySelector(elements.inputDescription).focus();
}

export const addItemUI =(obj, type) =>{
    let markup, element;

    //Create markup, to insert beforened, based on type, inc(Income) or exp(Expense)
    if(type === 'inc'){
        element = elements.incomeContainer;
        markup = `<div class="item clearfix" id="inc-${obj.id}">
        <div class="item__description">${obj.description}</div>
        <div class="right clearfix">
            <div class="item__value">${formatString(obj.value, type)}</div>
            <div class="item__delete">
            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
    </div>`;

    }
    else{
        element = elements.expenseContainer;
        markup = `<div class="item clearfix" id="exp-${obj.id}">
        <div class="item__description">${obj.description}</div>
        <div class="right clearfix">
            <div class="item__value">${formatString(obj.value, type)}</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
    </div>`;
    }
    //done it with string templating

    //Insert HTML string into DOM
    document.querySelector(element).insertAdjacentHTML('beforeend', markup);
}

export const deleteItemUI = (item)=>{
    document.getElementById(item).parentElement.removeChild(document.getElementById(item));
}


export const displayBudget =(obj) =>{
    const type = (obj.budget > 0) ? 'inc' : 'exp';

    //if I dont put abs there will be double minuse on display
    document.querySelector(elements.totalBudget).textContent = formatString(Math.abs(obj.budget), type);
    document.querySelector(elements.totalIncome).textContent = formatString(obj.totalIncome, 'inc');
    document.querySelector(elements.totalExpenses).textContent = formatString(obj.totalExpenses, 'exp');
}

export const displayDate = () =>{
    let date, year, month, months;

    months = ['January', 'February', 'March', 'April', 'May', 'June', 
              'July', 'August', 'September' , 'October', 'November', 'December'];
    
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth();

    document.querySelector(elements.dateLabel).textContent = months[month] + ' ' + year;
}

export const changeType = ()=>{
    let fields = document.querySelectorAll(`${elements.inputType},${elements.inputDescription},${elements.inputValue}`);

    nodeListForEach(fields, (cur)=>{
        cur.classList.toggle('red-focus');
    });

    document.querySelector(elements.inputBtn).classList.toggle('red');
}

const nodeListForEach = (nodeList, callback)=>{
    for(let i=0; i<nodeList.length; i++){
        callback(nodeList[i]);
    }
}

const formatString = (value, type) =>{
    let sign, splitValue, str, decimal;
    sign = (type === 'inc') ? '+' : '-';


    splitValue = parseFloat(value).toFixed(2).split('.');

    decimal = splitValue[1];
    // console.log(decimal);
    str = splitValue[0].toString();
    // console.log(str);
    if(str.length>6){
        str = `${str.slice(0, str.length-6)},${str.slice(str.length-6, str.length-3)},${str.slice(str.length-3)}`
    }
    else if(str.length> 3 && str.length < 7){
        str = `${str.slice(0, str.length-3)},${str.slice(str.length-3)}`;
    }

    return `${sign} ${str}.${decimal}`;
}