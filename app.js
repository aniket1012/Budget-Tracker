 //BUDGET CONTROLLER 
 
 let budgetController = (function(){


 })()


// UI CONTROLLER 
 let UIController = (function(){

 })()




//GLOBAL APP CONTROLLER
 let controller = (function(budgetCtrl, UICtrl){

    let ctrlAddItem = function() {
        // 1. Get field input data
        

        //2. Add the item to budget controller

        //3. Add the item to the UI

        //4. Calculate the budget 

        //5. Display the budget on the UI 

        console.log('it Works ');
        
    }


    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem)

    document.addEventListener('keypress', function(e){
        if(e.keyCode === 13 || e.which === 13){
            ctrlAddItem()
        }
        
    })

 })(budgetController,UIController)