const budgetController = (() => {
    class Expense {
        constructor(id, description, value) {
            this.id = id,
                this.description = description,
                this.value = value;
        }
    }

    class Income {
        constructor(id, description, value) {
            this.id = id,
                this.description = description,
                this.value = value;
        }
    }

    const calculateTotal = (type) => {
        let sum = 0

        data.allItems[type].forEach((item) => {
            sum += item.value
        })

        data.totals[type] = sum
    }

    
    const calcPercentage = (expense, totalIncome) => {
        if(totalIncome > 0) {
            return expense.percentage = Math.round((expense.value / totalIncome) * 100)
        }

        expense.percentage = -1
    }

    const getPercentage = (expense) => {
        return expense.percentage
    }

    if(localStorage.getItem('data')) {
        data = JSON.parse(localStorage.getItem('data'))
    } else {
        data = {
            allItems: {
                exp: [],
                inc: []
            },
            totals: {
                exp: 0,
                inc: 0
            },
            budget: 0,
            percentage: -1
        };
    }

    return {
        addItem: (type, description, value) => {
            if(data.allItems[type].length > 0) {
               id = data.allItems[type][data.allItems[type].length -1].id + 1

            } else {
                id = 0
            }
            
            if(type === 'exp') {
                newItem = new Expense(id, description, value)
            } else if(type === 'inc') {
                newItem = new Income(id, description, value)
            }          


            data.allItems[type].push(newItem)

            return newItem
        },

        delItem: (type, id) => {
            data.allItems[type] = data.allItems[type].filter((item) => {
                return item.id != id                
            })
        },

        calculateBudget: () => {
            calculateTotal('inc')
            calculateTotal('exp')

            data.budget = data.totals.inc - data.totals.exp

            if(data.totals.inc > 0) {
                return data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
            }
            
        },

        calculatePercentages: () => {
            data.allItems.exp.forEach((expense) => {
                calcPercentage(expense, data.totals.inc)
            })
            
        },

        getPercentages: () => {
            const allPerc = data.allItems.exp.map((expense) => {
                return getPercentage(expense)
            })

            return allPerc
        },

        getBudget: () => {

            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }            
        },

        saveLocalStorage: () => {            
            localStorage.setItem('data', JSON.stringify(data));
        },

        testing: () => {
            console.log(data)
        }
       
    }
})()

const UIController = (() => {
    const type = document.querySelector('.add__type')
    const description = document.querySelector('.add__description')
    const value = document.querySelector('.add__value')
    const button = document.querySelector('.ion-ios-checkmark-outline')
    const incomeContainer = document.querySelector('.income__list')
    const expenseContainer = document.querySelector('.expenses__list')
    const budgetLabel = document.querySelector('.budget__value')
    const incomeLabel = document.querySelector('.budget__income--value')
    const expensesLabel = document.querySelector('.budget__expenses--value')
    const percentageLabel = document.querySelector('.budget__expenses--percentage')
    const monthLabel = document.querySelector('.budget__title--month')

    const formatNumber = (num, type) => {
        let number = Math.abs(num)
        number = number.toFixed(2)

        const numberSplit = number.split('.')

        let int = numberSplit[0]
        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3)
        }

        const dec = numberSplit[1]

        if(type == 'inc') {
            return `+ ${int}.${dec}`
        }

        return `- ${int}.${dec}`
    }
    
    return {
        getInput: () => {
            return {
                type: type.value,
                description: description.value,
                value: parseFloat(value.value)
            }
        },

        addListItem: (newItem, type) => {
            if(type === 'inc') {

                const html = `
                <div class="item clearfix" id="inc-${newItem.id}">
                    <div class="item__description">${newItem.description}</div>
                    <div class="right clearfix">
                        <div class="item__value">${formatNumber(newItem.value, type)}</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>
                `

                incomeContainer.insertAdjacentHTML('beforeend', html)
            } else if(type === 'exp') {

                const html = `
                <div class="item clearfix" id="exp-${newItem.id}">
                    <div class="item__description">${newItem.description}</div>
                    <div class="right clearfix">
                        <div class="item__value">${formatNumber(newItem.value, type)}</div>
                        <div class="item__percentage"></div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>
                `

                expenseContainer.insertAdjacentHTML('beforeend', html)
            }
        },

        delListItem: (itemId) => {
           const el = document.querySelector(`#${itemId}`)
           el.remove()
        },

        clearFields: () => {
            description.value = ''
            value.value = ''
            description.focus()
        },

        displayBudget: (item) => {
            let type
            item.budget > 0 ? type = 'inc' : type = 'exp'

            budgetLabel.textContent = formatNumber(item.budget, type) + ' R$'
            incomeLabel.textContent = formatNumber(item.totalInc, 'inc') + ' R$'
            expensesLabel.textContent = formatNumber(item.totalExp, 'exp') + ' R$'

            if(item.percentage > 0) {
                return percentageLabel.textContent = item.percentage + ' %'
            }

                percentageLabel.textContent = '--'            
        },

        displayPercentages: (percentages) => {
            const expensePercentages = document.querySelectorAll('.item__percentage') 
            
            expensePercentages.forEach((expPerc, i) => {
                expPerc.textContent = percentages[i] + '%'
            })            
        },

        displayMonth: () => {            
            const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
            const month = new Date().getMonth()

            monthLabel.textContent = months[month]
        },

        changeType: () => {
            const fields = [type, description, value]

            fields.forEach((field) => {
                field.classList.toggle('red-focus')
            })

            button.classList.toggle('red')
        }
    }


})()

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

})(budgetController, UIController)

controller.init()