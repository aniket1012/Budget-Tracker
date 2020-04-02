 //BUDGET CONTROLLER 
 
 let budgetController = (function(){


 })()


// UI CONTROLLER 
 let UIController = (function(){
     
    let DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value'
    }

    return {
        getinput: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        }
    }

 })()




//GLOBAL APP CONTROLLER
 let controller = (function(budgetCtrl, UICtrl){

    let ctrlAddItem = function() {
        // 1. Get field input data
        let input = UICtrl.getinput()
        console.log(input);
        


        //2. Add the item to budget controller

        //3. Add the item to the UI

        //4. Calculate the budget 

        //5. Display the budget on the UI 

        
    }


    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function(e){
        if(e.keyCode === 13 || e.which === 13){
            ctrlAddItem()
        }
        
    })

 })(budgetController,UIController)