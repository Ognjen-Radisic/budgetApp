export const addItem =(type, des, val) =>{
    let newItem, ID;

    //Create a new ID one bigger then the last in our data structure below
    if(data.allItems[type].length > 0){
        ID = data.allItems[type][data.allItems[type].length-1].id +1;
    }else{
        ID = 0;
    }
        
    //Create newItem expense or income, based on type exp or incs
    newItem = new ValueEI(ID, des, val);

    //Push new item into our data structure
    data.allItems[type].push(newItem);

    //return our new element
    return newItem;
}

export const deleteItem = (id, type)=>{
    
    data.allItems[type].forEach((cur,index)=>{
        console.log(cur.id, index, id, type)
        if(cur.id === id){
            data.allItems[type].splice(index,1)
        };
    });
    console.log(data)
}

export const calculateBudget = ()=>{
    //We go to data-structure "data" and we calculate: total exp, total inc and total budget(difference between inc and exp)
    calculateTotal('inc');
    calculateTotal('exp');

    data.budget = data.totals.inc - data.totals.exp;

    // console.log(data.totals.inc, data.totals.exp, data.budget)
    return{
        totalIncome: data.totals.inc,
        totalExpenses: data.totals.exp,
        budget: data.budget,
    }
}

const calculateTotal = (type)=>{
    let sum = 0;

    data.allItems[type].forEach(cur =>{
        sum+=cur.value;
    });

    data.totals[type] = sum;
}
//ID-created in AddItem method, Description from input, Value from input
class ValueEI{
    constructor(id, des, val){
        this.id = id;
        this.description = des;
        this.value = val;
    }
}

//Data structure for storing expenses, incomes in arrays|||||| total exp and inc ||| total budget
const data ={
    allItems : {
        //sadrzi objekat sa id-em, description-nom i value; // i kasnije smo dodali percentage za exp
        exp : [],
        inc : []
    },
    totals : {
        exp : 0,
        inc : 0
    },
    budget : 0
}