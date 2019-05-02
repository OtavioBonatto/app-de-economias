const budgetController = () => {
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
        var data = JSON.parse(localStorage.getItem('data'))
        console.log(data)
    } else {
        var data = {
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
        console.log(data)
    }

    return {
        addItem: (type, description, value) => {
            let id = 0
            
            if(data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length -1].id + 1
            }
            
            if(type === 'exp') {
                var newItem = new Expense(id, description, value)
            } else if(type === 'inc') {
                var newItem = new Income(id, description, value)
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
}

export default budgetController()