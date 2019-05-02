import budgetCtrl from './budgetController'
import UIController from './UIController';

const controller = ((budgetCtrl, UICtrl) => {
    const inputButton = document.querySelector('.add__btn')
    const container = document.querySelector('.container')
    const inputType = document.querySelector('.add__type')


    const setupEventListeners = () => {
        inputButton.addEventListener('click', ctrlAddItem) 

        document.addEventListener('keypress', (e) => {
            if(e.keyCode === 13) {
                ctrlAddItem()
            }
        })

        container.addEventListener('click', ctrlDelItem)

        inputType.addEventListener('change', UICtrl.changeType)
    }    

    const updateBudget = () => {
        budgetCtrl.calculateBudget()

        const budget = budgetCtrl.getBudget()

        UICtrl.displayBudget(budget)
    }

    const updatePercentages = () => {
        //calcula as porcentagens
        budgetCtrl.calculatePercentages()

        //le as porcentagens do budget controller
        const percentages = budgetCtrl.getPercentages()

        //atualiza a interface com as novas porcentagens
        UICtrl.displayPercentages(percentages)
    }

    const ctrlAddItem = () => {
        //recebe os inputs
        const input = UICtrl.getInput()

        if(input.description !== '' && !isNaN(input.value) && input.value > 0) {

            //adiciona o item no budgetController
            const newItem = budgetCtrl.addItem(input.type, input.description, input.value)

            //adiciona o item na interface
            UICtrl.addListItem(newItem, input.type)

            //limpa os campos
            UICtrl.clearFields()

            //atualiza e mostra as economias
            updateBudget()

            //atualiza e mostra as porcentagens
            updatePercentages()

            //salva no localStorage
            budgetCtrl.saveLocalStorage()


        }
    }

    const ctrlDelItem = (e) => {
        const itemId = e.target.parentNode.parentNode.parentNode.parentNode.id

        //separa no tipo e id
        const splitId = itemId.split('-')
        const type = splitId[0]
        const id = splitId[1]

        //deleta o item da estrutura de dados
        budgetCtrl.delItem(type, id)

        //remove o item da interface
        UICtrl.delListItem(itemId)

        //atualiza e mostra as economias
        updateBudget()

        //atualiza e mostra as porcentagens
        updatePercentages()

        //salva no localStorage
        budgetCtrl.saveLocalStorage()

    }

    const initialItens = () => {
        const dataObj = JSON.parse(localStorage.getItem('data'));
        if(dataObj) {
            const expArr = dataObj.allItems.exp
            const incArr = dataObj.allItems.inc
    
            incArr.forEach((inc) => {
                UICtrl.addListItem(inc, 'inc')
            })
            expArr.forEach((exp) => {
                UICtrl.addListItem(exp, 'exp')
            }) 

            const budget = budgetCtrl.getBudget()

            UICtrl.displayBudget(budget)

            updatePercentages()

        }
 
    }

    return {
        init: () => {
            UICtrl.displayMonth()
            setupEventListeners(),
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            })

            initialItens()
        }        
    }

})(budgetCtrl, UIController)

controller.init()