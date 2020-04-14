 //BUDGET CONTROLLER 
 
 let budgetController = (function(){

    let Expense = function(id, description, value) {
        this.id = id
        this.description = description
        this.value = value 
    }

    let Income = function(id, description, value) {
        this.id = id
        this.description = description
        this.value = value 
    }

    let calculateTotal = function(type) {
        let sum = 0
        data.allItems[type].forEach(function(cur) {
            sum += cur.value
        })
        data.totals[type] = sum
    }

    let data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    }

    return {
        addItem: function(type, des, val){
            let newItem, ID

            //Create new ID
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length -1].id +1
            } else {
                ID = 0
            }
             
            //Create new Item based on type 'inc' or type'
            if(type === 'exp'){
                newItem = new Expense(ID, des, val)
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val)
            }

            //Push the new item into the data structure {}
            data.allItems[type].push(newItem)

            //Return the new element we pushed 
            return newItem
        },

        deleteItem: function(type, id) {
            let ids, index

             ids = data.allItems[type].map(function(curr) {
                return curr.id
            })

            index = ids.indexOf(id)

            if(index !== -1 ) {
                data.allItems[type].splice(index, 1)
            }
        },


        calculateBudget: function(){

            //caclualte total income and expenses
            calculateTotal('exp')
            calculateTotal('inc')

            //Caclualte the budget: income - expenses 

            data.budget = (data.totals.inc - data.totals.exp)
            //Calculate the percentage of income we spent
            if(data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
            } else {
                data.percentage = -1
            }
        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        testing: function(){
            console.log(data);
            
        }
        
    }
   
 })()



// UI CONTROLLER 
 let UIController = (function(){
     
    let DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'

        
    }

    return {
        getinput: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },

        addListItem: function(obj, type){
            let html, newHtml, element
        
            // Create HTML string with palceholder text 
            if(type === 'inc'){
                element = DOMStrings.incomeContainer

                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            } else if (type === 'exp') {
                element = DOMStrings.expensesContainer

                html = '<div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>'
            }
            //Replace the placeholder text with actual data
            newHtml = html.replace('%id%', obj.id)
            newHtml = newHtml.replace('%description%', obj.description)
            newHtml = newHtml.replace('%value%', obj.value)

            //Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

        },
        clearFields: function(){
            let fields, fieldsArr 

            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue)

            fieldsArr = Array.prototype.slice.call(fields)

            fieldsArr.forEach(function(current, index, array) {
                current.value = ""
            })

            fieldsArr[0].focus()

        },

        deleteListItem: function(selectorID) {
            let el = document.getElementById(selectorID)
            
            el.parentNode.removeChild(el)
        },

        displayBudget: function(obj){

            document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget
            document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc
            document.querySelector(DOMStrings.expensesLabel).textContent = obj.totalExp
           

            if(obj.percentage > 0) {
                 document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%'
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---'
            }
        },

        getDOMStrings: function(){
            return DOMStrings
        }
    }

 })()




//GLOBAL APP CONTROLLER
 let controller = (function(budgetCtrl, UICtrl){

    let setupEventListeners = function(){
        let DOM = UICtrl.getDOMStrings()

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)


        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13 || e.which === 13) {
                ctrlAddItem()
            }
        })

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem)
    }

    let updateBudget = function(){
        //1. Calculate the budget 
        budgetCtrl.calculateBudget()

        //2. Return the Budget 
        let budget = budgetCtrl.getBudget()
        //3. Display the budget on the UI 
        UICtrl.displayBudget(budget)
        
    }

    let ctrlAddItem = function() {
        let input, newItem
        // 1. Get field input data
        input = UICtrl.getinput()

        if(input.description !== "" && !isNaN(input.value) && input.value > 0) {
            //2. Add the item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value)
            //3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type)
    
            //4. Clear the fields
            UICtrl.clearFields()
            
            //5. Calculate and update budget 
            updateBudget()
        }
    }

    let ctrlDeleteItem = function(e) {
        let itemID, splitID, type, ID

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id

        if (itemID) {
            splitID = itemID.split('-')
            type = splitID[0]
            ID = parseInt(splitID[1])

            //1. Delete Item from array
            budgetCtrl.deleteItem(type, ID)
            //2. Delete Item from UI
            UICtrl.deleteListItem(itemID)
            //3. Update and show new budget
            updateBudget()
        }
        
    }

    return {
        init: function(){
            console.log("Application has started");
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            })
            setupEventListeners()
            
        }
    }

    

 })(budgetController,UIController)

 controller.init()