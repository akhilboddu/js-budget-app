/**
 * Akhil Boddu 
 * Zaio Investsoc workshop
 * JS File
 */
class UI { //class
  constructor() { //constructor
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = []; //array
    this.itemID = 0; //variable
  }

  //functions

  submitBudgetForm() {
    const value = this.budgetInput.value;
    if(value < 0 || value == ''){
      this.budgetFeedback.classList.add("showItem");
      this.budgetFeedback.innerHTML = `<p>value cannot be empty or negative</p>`;

      const self = this;
      setTimeout(function(){
        self.budgetFeedback.classList.remove("showItem");
      }, 4000);
    }
    else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance();
      this.balanceAmount.textContent = value;
    }
  }



  showBalance() {
    const totalExpeses = this.totalExpenses();
    const balance = parseInt(this.budgetAmount.textContent) - totalExpeses; 
    this.balanceAmount.textContent = balance;
    if (totalExpeses < 0) {
      this.balance.classList.remove("showGreen", "showBlack");
      this.balance.classList.add("showRed");
    }
    else if (totalExpeses > 0) {
      this.balance.classList.remove("showRed", "showBlack");
      this.balance.classList.add("showGreen");
    }
    else if (totalExpeses === 0) {
      this.balance.classList.remove("showGreen", "showRed");
      this.balance.classList.add("showBlack");
    }
  }

  totalExpenses() {
    let total = 0;
    const expensesArray = this.itemList;
    if(expensesArray.length > 0){
      for (let index = 0; index < expensesArray.length; index++) {
        const expense = expensesArray[index];
        total += expense.amount;
      }
    }
    this.expenseAmount.textContent = total;
    return total;
  }



  submitExpenseForm() {
    const expenseName = this.expenseInput.value;
    const expenseAmount = this.amountInput.value;

    if(expenseName === '' || expenseAmount === '' || expenseAmount < 0 ) {
      this.expenseFeedback.classList.add("showItem");
      this.expenseFeedback.innerHTML = `<p>values cannot be empty or negative</p>`

      const self = this;
      setTimeout(function(){
        self.expenseFeedback.classList.remove("showItem");
      }, 4000);
    }
    else {
      let amount = parseInt(expenseAmount);
      this.expenseInput.value = "";
      this.amountInput.value = "";

      //object
      let expense = {
        id: this.itemID,
        title: expenseName,
        amount: amount
      }

      this.itemID++;
      this.itemList.push(expense); //array function
      this.addExpense(expense);
      this.showBalance();
    }
  }

/**CRUD FUNCTIONS */

  addExpense(expense) {
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `
      <div class="expense-item d-flex justify-content-between align-items-baseline">
        <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
        <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

        <div class="expense-icons list-item">
          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
            <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
            <i class="fas fa-trash"></i>
          </a>
        </div>
      </div>
    `;
    this.expenseList.appendChild(div);
  }


  editExpense(element) {
    console.log('edit icon clicked!',element);
    let id = parseInt(element.dataset.id); console.log(id); //can also write code like this (not recommended)
    let parent = element.parentElement.parentElement.parentElement;

    //removing from dom
    this.expenseList.removeChild(parent);

    //Grab the edit element (using filter - like loops)
    let expense = this.itemList.filter(function(item){
      return item.id === id;
    })

    //populate expense form
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;
    
    // Remove edit element from list
    this.itemList = this.itemList.filter(function(item) {
      return item.id !== id;
    })
    this.showBalance();
  }


  deleteExpense(element) {
    console.log('delete icon clicked!',element);
    let id = parseInt(element.dataset.id); console.log(id); //can also write code like this (not recommended)
    let parent = element.parentElement.parentElement.parentElement;

    //removing from dom
    this.expenseList.removeChild(parent);

    //remove from array (itemList) to grab the removed element (using filter - like loops)
    let expense = this.itemList.filter(function(item){
      return item.id === id;
    })

    // Remove delete element from list
    this.itemList = this.itemList.filter(function(item) {
      return item.id !== id;
    })
    this.showBalance();
  }
}



function eventListeners() {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  //second thing
  const ui = new UI();

  budgetForm.addEventListener("submit", function(event) {
    event.preventDefault();
    ui.submitBudgetForm()
  })

  expenseForm.addEventListener("submit", function(event) {
    event.preventDefault();
    ui.submitExpenseForm();
  })

  expenseList.addEventListener("click", function(event) {
    if(event.target.parentElement.classList.contains('edit-icon')){
      ui.editExpense(event.target.parentElement);
    }
    else if(event.target.parentElement.classList.contains('delete-icon')){
      ui.deleteExpense(event.target.parentElement);
    }
  })
}

//first thing
document.addEventListener("DOMContentLoaded", function() {
  eventListeners();
})
