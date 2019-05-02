const UIController = () => {
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
}

export default UIController()