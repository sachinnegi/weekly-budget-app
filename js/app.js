//classes
class Budget{
    constructor(budget){
        this.budget=Number(budget);
        this.budgetLeft=this.budget;
    }
    subtractFromBudget(amount){
        return this.budgetLeft-=amount;
    }
}

//everything related to html
class HTML{
    // insert the budget when the user submits it
    insertBudget(amount){
        //insert into html
        budgetTotal.innerHTML=`${amount}`;
        budgetLeft.innerHTML=`${amount}`;
    }
    
    //displays a mesagge for valid and invalid
    printMessage(message,className){
        const messageWrapper=document.createElement('div');
        messageWrapper.classList.add('text-center','alert',className);
        messageWrapper.appendChild(document.createTextNode(message));
        
        //insert into html
        document.querySelector('.primary').insertBefore(messageWrapper,addExpenseForm);
        
        //clear the error
        setTimeout(function(){
            document.querySelector('.primary .alert').remove();
            //addExpenseForm.reset();
        },3000)
    }

    //------ displays the expanses from the form into the list
    addExpenseToList(name,amount){
        const expenseList=document.querySelector('#expenses ul');
        //----create a li
        const li =document.createElement('li');
        li.className='list-group-item d-flex justify-content-between align-items-center'
        //----create template
        li.innerHTML=`${name}
                    <span class='badge badge-primary badge-pill'> ₹ ${amount}</span>`;
        
        //---insert into html
        expenseList.appendChild(li);            
    }

    // ---subtract the amount from budget
    trackBudget(amount){
        const budgetLeftRupees=budget.subtractFromBudget(amount);
        budgetLeft.innerHTML=`${budgetLeftRupees}`;
        
        //check when 25 is left
        if(budget.budget/4>budgetLeftRupees){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success','alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');

        }
        else if (budget.budget/2>budgetLeftRupees){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }
    }
}



//variales
const addExpenseForm=document.querySelector('#add-expense'),
      budgetTotal=document.querySelector("#total"),
      budgetLeft=document.querySelector("span#left");
let budget,userBudget;


//instantiate the html class
const html=new HTML();
//event listeners
eventListener();
function eventListener(){
    document.addEventListener('DOMContentLoaded',function(){
        // ---ask the users weekly budget
        userBudget=prompt("What\'s your weekly budget");
        if(userBudget===null || userBudget==='' || userBudget==='0'){
            window.location.reload();
        }
        else{
            //----budget is valid then instantiate budget class
            budget=new Budget(userBudget);
            //console.log(budget);
            // instantiate new class
            html.insertBudget(budget.budget);
            }
        
    })
    addExpenseForm.addEventListener('submit',function(e){
        //read the values from the budget form
        const expenseName=document.querySelector('#expense').value;
        const amount=document.querySelector('#amount').value;
        if(expenseName===''|| amount===''){
            html.printMessage('there was an error,all fields are mandatory',
            'alert-danger');
        }
        else{
            html.addExpenseToList(expenseName,amount);
            addExpenseForm.reset();
            html.trackBudget(amount);
            html.printMessage("added....",'alert-success');
        }
    
    });
}
