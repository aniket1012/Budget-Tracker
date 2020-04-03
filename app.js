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

    let data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0
        }
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
                newItem = new Income(ID, des, value)
            }

            //Push the new item into the data structure {}
            data.allItems[type].push(newItem)

            //Return the new element we pushed 
            return newItem
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
        inputBtn: '.add__btn'
    }

    return {
        getinput: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
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
    }

    

    let ctrlAddItem = function() {
        let input, newItem
        // 1. Get field input data
        input = UICtrl.getinput()

        //2. Add the item to budget controller
        newItem = budgetCtrl.addItem(input.type, input.description, input.value)
        //3. Add the item to the UI

        //4. Calculate the budget 

        //5. Display the budget on the UI 
    }

    return {
        init: function(){
            console.log("app has started");
            setupEventListeners()
            
        }
    }

    

 })(budgetController,UIController)

 controller.init()