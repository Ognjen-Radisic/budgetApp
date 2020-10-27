import * as budgetCtrl from './models/Budget';
import * as budgetView from './views/budgetView';
import {elements} from './views/base';


const mainAddItem = ()=>{
    let input, newItem, budgetObj;

    //1. get data from input fields (type, description and value)
    input = budgetView.getInputValues();
    // console.log(input);
    
    // check to see if description is empty and value is valid
    if(input.description !== "" && !isNaN(input.value) && input.value > 0){
        //2.Add item to BudgetCtrl datastructure
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
        //2.1 Clear input values
        budgetView.clearInputValues();

        //3. Add item to UI
        budgetView.addItemUI(newItem, input.type);

        //4. Calculate budget, method from BudgetCtrl
        budgetObj = budgetCtrl.calculateBudget();

        //5. Display new budget on the UI
        budgetView.displayBudget(budgetObj)
    }
    
}

const mainDeleteItem = (event) =>{
    let itemID, splitID, ID, type, budgetObj;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if(itemID){
        splitID = itemID.split('-');
        type = splitID[0];
        ID = parseInt(splitID[1]);

        //1. delete item from data structure
        budgetCtrl.deleteItem(ID, type);

        //2. delete item from UI
        budgetView.deleteItemUI(itemID);

        //3. update budget in data structure
        budgetObj = budgetCtrl.calculateBudget();

        //4. display new budget on the UI
        budgetView.displayBudget(budgetObj)
    }
}
//Event listener when Submit button is clicked
document.querySelector(elements.inputBtn).addEventListener('click', mainAddItem);

//Event listener when enter is pressed
document.addEventListener('keydown', (e)=>{
    if(e.key === 13 || e.keyCode === 13){
        mainAddItem();
    }
});

//When page loads, make all values 0 (ZERO), display correct date or something else if you are a magician
window.addEventListener('load',()=>{
    //1. Calculate budget, method from BudgetCtrl
    const budgetObj = budgetCtrl.calculateBudget();

    //2. Display new budget on the UI
    budgetView.displayBudget(budgetObj);

    //3. Display date
    budgetView.displayDate();
});

//Event listener when we delete items from incomes and expenses, with click on X button
document.querySelector(elements.container).addEventListener('click', mainDeleteItem);

//Event listener when we change type ('+' or '-'), it chages colour green or red respectivly
document.querySelector(elements.inputType).addEventListener('change', budgetView.changeType);
