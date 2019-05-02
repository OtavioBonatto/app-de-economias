/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/public/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/public/UIController.js":
/*!************************************!*\
  !*** ./src/public/UIController.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst UIController = () => {\r\n    const type = document.querySelector('.add__type')\r\n    const description = document.querySelector('.add__description')\r\n    const value = document.querySelector('.add__value')\r\n    const button = document.querySelector('.ion-ios-checkmark-outline')\r\n    const incomeContainer = document.querySelector('.income__list')\r\n    const expenseContainer = document.querySelector('.expenses__list')\r\n    const budgetLabel = document.querySelector('.budget__value')\r\n    const incomeLabel = document.querySelector('.budget__income--value')\r\n    const expensesLabel = document.querySelector('.budget__expenses--value')\r\n    const percentageLabel = document.querySelector('.budget__expenses--percentage')\r\n    const monthLabel = document.querySelector('.budget__title--month')\r\n\r\n    const formatNumber = (num, type) => {\r\n        let number = Math.abs(num)\r\n        number = number.toFixed(2)\r\n\r\n        const numberSplit = number.split('.')\r\n\r\n        let int = numberSplit[0]\r\n        if(int.length > 3) {\r\n            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3)\r\n        }\r\n\r\n        const dec = numberSplit[1]\r\n\r\n        if(type == 'inc') {\r\n            return `+ ${int}.${dec}`\r\n        }\r\n\r\n        return `- ${int}.${dec}`\r\n    }\r\n    \r\n    return {\r\n        getInput: () => {\r\n            return {\r\n                type: type.value,\r\n                description: description.value,\r\n                value: parseFloat(value.value)\r\n            }\r\n        },\r\n\r\n        addListItem: (newItem, type) => {\r\n            if(type === 'inc') {\r\n\r\n                const html = `\r\n                <div class=\"item clearfix\" id=\"inc-${newItem.id}\">\r\n                    <div class=\"item__description\">${newItem.description}</div>\r\n                    <div class=\"right clearfix\">\r\n                        <div class=\"item__value\">${formatNumber(newItem.value, type)}</div>\r\n                        <div class=\"item__delete\">\r\n                            <button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                `\r\n\r\n                incomeContainer.insertAdjacentHTML('beforeend', html)\r\n            } else if(type === 'exp') {\r\n\r\n                const html = `\r\n                <div class=\"item clearfix\" id=\"exp-${newItem.id}\">\r\n                    <div class=\"item__description\">${newItem.description}</div>\r\n                    <div class=\"right clearfix\">\r\n                        <div class=\"item__value\">${formatNumber(newItem.value, type)}</div>\r\n                        <div class=\"item__percentage\"></div>\r\n                        <div class=\"item__delete\">\r\n                            <button class=\"item__delete--btn\"><i class=\"ion-ios-close-outline\"></i></button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                `\r\n\r\n                expenseContainer.insertAdjacentHTML('beforeend', html)\r\n            }\r\n        },\r\n\r\n        delListItem: (itemId) => {\r\n           const el = document.querySelector(`#${itemId}`)\r\n           el.remove()\r\n        },\r\n\r\n        clearFields: () => {\r\n            description.value = ''\r\n            value.value = ''\r\n            description.focus()\r\n        },\r\n\r\n        displayBudget: (item) => {\r\n            let type\r\n            item.budget > 0 ? type = 'inc' : type = 'exp'\r\n\r\n            budgetLabel.textContent = formatNumber(item.budget, type) + ' R$'\r\n            incomeLabel.textContent = formatNumber(item.totalInc, 'inc') + ' R$'\r\n            expensesLabel.textContent = formatNumber(item.totalExp, 'exp') + ' R$'\r\n\r\n            if(item.percentage > 0) {\r\n                return percentageLabel.textContent = item.percentage + ' %'\r\n            }\r\n\r\n                percentageLabel.textContent = '--'            \r\n        },\r\n\r\n        displayPercentages: (percentages) => {\r\n            const expensePercentages = document.querySelectorAll('.item__percentage') \r\n            \r\n            expensePercentages.forEach((expPerc, i) => {\r\n                expPerc.textContent = percentages[i] + '%'\r\n            })            \r\n        },\r\n\r\n        displayMonth: () => {            \r\n            const months = [\"Janeiro\", \"Fevereiro\", \"Março\", \"Abril\", \"Maio\", \"Junho\", \"Julho\", \"Agosto\", \"Setembro\", \"Outubro\", \"Novembro\", \"Dezembro\"];\r\n            const month = new Date().getMonth()\r\n\r\n            monthLabel.textContent = months[month]\r\n        },\r\n\r\n        changeType: () => {\r\n            const fields = [type, description, value]\r\n\r\n            fields.forEach((field) => {\r\n                field.classList.toggle('red-focus')\r\n            })\r\n\r\n            button.classList.toggle('red')\r\n        }\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (UIController());\n\n//# sourceURL=webpack:///./src/public/UIController.js?");

/***/ }),

/***/ "./src/public/budgetController.js":
/*!****************************************!*\
  !*** ./src/public/budgetController.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst budgetController = () => {\r\n    class Expense {\r\n        constructor(id, description, value) {\r\n            this.id = id,\r\n                this.description = description,\r\n                this.value = value;\r\n        }\r\n    }\r\n\r\n    class Income {\r\n        constructor(id, description, value) {\r\n            this.id = id,\r\n                this.description = description,\r\n                this.value = value;\r\n        }\r\n    }\r\n\r\n    const calculateTotal = (type) => {\r\n        let sum = 0\r\n\r\n        data.allItems[type].forEach((item) => {\r\n            sum += item.value\r\n        })\r\n\r\n        data.totals[type] = sum\r\n    }\r\n\r\n    \r\n    const calcPercentage = (expense, totalIncome) => {\r\n        if(totalIncome > 0) {\r\n            return expense.percentage = Math.round((expense.value / totalIncome) * 100)\r\n        }\r\n\r\n        expense.percentage = -1\r\n    }\r\n\r\n    const getPercentage = (expense) => {\r\n        return expense.percentage\r\n    }\r\n\r\n    if(localStorage.getItem('data')) {\r\n        var data = JSON.parse(localStorage.getItem('data'))\r\n        console.log(data)\r\n    } else {\r\n        var data = {\r\n            allItems: {\r\n                exp: [],\r\n                inc: []\r\n            },\r\n            totals: {\r\n                exp: 0,\r\n                inc: 0\r\n            },\r\n            budget: 0,\r\n            percentage: -1\r\n        };\r\n        console.log(data)\r\n    }\r\n\r\n    return {\r\n        addItem: (type, description, value) => {\r\n            let id = 0\r\n            if(data.allItems[type].length > 0) {\r\n                id = data.allItems[type][data.allItems[type].length -1].id + 1\r\n            }\r\n            \r\n            if(type === 'exp') {\r\n                var newItem = new Expense(id, description, value)\r\n            } else if(type === 'inc') {\r\n                var newItem = new Income(id, description, value)\r\n            }          \r\n\r\n\r\n            data.allItems[type].push(newItem)\r\n\r\n            return newItem\r\n        },\r\n\r\n        delItem: (type, id) => {\r\n            data.allItems[type] = data.allItems[type].filter((item) => {\r\n                return item.id != id                \r\n            })\r\n        },\r\n\r\n        calculateBudget: () => {\r\n            calculateTotal('inc')\r\n            calculateTotal('exp')\r\n\r\n            data.budget = data.totals.inc - data.totals.exp\r\n\r\n            if(data.totals.inc > 0) {\r\n                return data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)\r\n            }\r\n            \r\n        },\r\n\r\n        calculatePercentages: () => {\r\n            data.allItems.exp.forEach((expense) => {\r\n                calcPercentage(expense, data.totals.inc)\r\n            })\r\n            \r\n        },\r\n\r\n        getPercentages: () => {\r\n            const allPerc = data.allItems.exp.map((expense) => {\r\n                return getPercentage(expense)\r\n            })\r\n\r\n            return allPerc\r\n        },\r\n\r\n        getBudget: () => {\r\n\r\n            return {\r\n                budget: data.budget,\r\n                totalInc: data.totals.inc,\r\n                totalExp: data.totals.exp,\r\n                percentage: data.percentage\r\n            }            \r\n        },\r\n\r\n        saveLocalStorage: () => {            \r\n            localStorage.setItem('data', JSON.stringify(data));\r\n        },\r\n\r\n        testing: () => {\r\n            console.log(data)\r\n        }\r\n       \r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (budgetController());\n\n//# sourceURL=webpack:///./src/public/budgetController.js?");

/***/ }),

/***/ "./src/public/index.js":
/*!*****************************!*\
  !*** ./src/public/index.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _budgetController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./budgetController */ \"./src/public/budgetController.js\");\n/* harmony import */ var _UIController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UIController */ \"./src/public/UIController.js\");\n\r\n\r\n\r\nconst controller = ((budgetCtrl, UICtrl) => {\r\n    const inputButton = document.querySelector('.add__btn')\r\n    const container = document.querySelector('.container')\r\n    const inputType = document.querySelector('.add__type')\r\n\r\n\r\n    const setupEventListeners = () => {\r\n        inputButton.addEventListener('click', ctrlAddItem) \r\n\r\n        document.addEventListener('keypress', (e) => {\r\n            if(e.keyCode === 13) {\r\n                ctrlAddItem()\r\n            }\r\n        })\r\n\r\n        container.addEventListener('click', ctrlDelItem)\r\n\r\n        inputType.addEventListener('change', UICtrl.changeType)\r\n    }    \r\n\r\n    const updateBudget = () => {\r\n        budgetCtrl.calculateBudget()\r\n\r\n        const budget = budgetCtrl.getBudget()\r\n\r\n        UICtrl.displayBudget(budget)\r\n    }\r\n\r\n    const updatePercentages = () => {\r\n        //calcula as porcentagens\r\n        budgetCtrl.calculatePercentages()\r\n\r\n        //le as porcentagens do budget controller\r\n        const percentages = budgetCtrl.getPercentages()\r\n\r\n        //atualiza a interface com as novas porcentagens\r\n        UICtrl.displayPercentages(percentages)\r\n    }\r\n\r\n    const ctrlAddItem = () => {\r\n        //recebe os inputs\r\n        const input = UICtrl.getInput()\r\n\r\n        if(input.description !== '' && !isNaN(input.value) && input.value > 0) {\r\n\r\n            //adiciona o item no budgetController\r\n            const newItem = budgetCtrl.addItem(input.type, input.description, input.value)\r\n\r\n            //adiciona o item na interface\r\n            UICtrl.addListItem(newItem, input.type)\r\n\r\n            //limpa os campos\r\n            UICtrl.clearFields()\r\n\r\n            //atualiza e mostra as economias\r\n            updateBudget()\r\n\r\n            //atualiza e mostra as porcentagens\r\n            updatePercentages()\r\n\r\n            //salva no localStorage\r\n            budgetCtrl.saveLocalStorage()\r\n\r\n\r\n        }\r\n    }\r\n\r\n    const ctrlDelItem = (e) => {\r\n        const itemId = e.target.parentNode.parentNode.parentNode.parentNode.id\r\n\r\n        //separa no tipo e id\r\n        const splitId = itemId.split('-')\r\n        const type = splitId[0]\r\n        const id = splitId[1]\r\n\r\n        //deleta o item da estrutura de dados\r\n        budgetCtrl.delItem(type, id)\r\n\r\n        //remove o item da interface\r\n        UICtrl.delListItem(itemId)\r\n\r\n        //atualiza e mostra as economias\r\n        updateBudget()\r\n\r\n        //atualiza e mostra as porcentagens\r\n        updatePercentages()\r\n\r\n        //salva no localStorage\r\n        budgetCtrl.saveLocalStorage()\r\n\r\n    }\r\n\r\n    const initialItens = () => {\r\n        const dataObj = JSON.parse(localStorage.getItem('data'));\r\n        if(dataObj) {\r\n            const expArr = dataObj.allItems.exp\r\n            const incArr = dataObj.allItems.inc\r\n    \r\n            incArr.forEach((inc) => {\r\n                UICtrl.addListItem(inc, 'inc')\r\n            })\r\n            expArr.forEach((exp) => {\r\n                UICtrl.addListItem(exp, 'exp')\r\n            }) \r\n\r\n            const budget = budgetCtrl.getBudget()\r\n\r\n            UICtrl.displayBudget(budget)\r\n\r\n            updatePercentages()\r\n\r\n        }\r\n \r\n    }\r\n\r\n    return {\r\n        init: () => {\r\n            UICtrl.displayMonth()\r\n            setupEventListeners(),\r\n            UICtrl.displayBudget({\r\n                budget: 0,\r\n                totalInc: 0,\r\n                totalExp: 0,\r\n                percentage: -1\r\n            })\r\n\r\n            initialItens()\r\n        }        \r\n    }\r\n\r\n})(_budgetController__WEBPACK_IMPORTED_MODULE_0__[\"default\"], _UIController__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\r\n\r\ncontroller.init()\n\n//# sourceURL=webpack:///./src/public/index.js?");

/***/ })

/******/ });