// Contains the core functionality for calculations

let config = {
    currencySymbol: "&#163;", // pound symbol, not supported by ASCII

    // A dictionary of the strings to use
    strings: {
        incomeTax: "Income tax: ",
        studentLoan: "Student loan: ",
        nationalInsurance: "National insurance: "
    },

    /* Tax rates up to each bracket
    First element in brackets is the minimum amount to qualify for income
    tax, the largest value is the maximum amount considered. Each value
    in taxRates represents the rate between taxBrackets[i] and taxBrackets[i + 1] */
    taxBrackets: [
        12500, 50000, 150000, 2e9
    ],
    taxRates: [
        0.2, 0.4, 0.45
    ],

    /* National insurance brackets and rates, defined the same way as tax
    brackets */
    niBrackets: [
        9504.12, 50004, 2e9
    ],
    niRates: [
        0.12, 0.02
    ],

    /* Student loan brackets and rate, defined like tax & NI brackets */
    slBrackets: [
        24000, 2e9
    ],
    slRates: [
        0.09
    ]
};

/* Calculates the cost of something given a list of brackets and the rates
at which to deduct those brackets (eg tax, student loans) */
function getBracketDeductions(brackets, rates, salary)
{
    sum = 0;

    for (let i = 0; i < brackets.length - 1; i++)
    {
        // Check that the salary qualifies for this bracket
        let min = brackets[i];
        let max = brackets[i + 1];

        if (salary > min)
        {
            // Calculate the tax. If the salary surpasses the maximum, we just
            // calculate based on (max - min) * rate
            if (salary > max)
                sum += (max - min) * rates[i];
            else
                sum += (salary - min) * rates[i];
        }
    }

    return sum;
}

/* Calculates income tax using the brackets defined in config */
function getIncomeTax(salary)
{
    // Fetch the tax brackets
    brackets = config.taxBrackets;
    rates = config.taxRates;

    return getBracketDeductions(brackets, rates, salary);
}

/* Calculates national insurance rate */
function getNICost(salary)
{
    // Fetch brackets and rates, and calculate
    brackets = config.niBrackets;
    rates = config.niRates;

    return getBracketDeductions(brackets, rates, salary);
}

/* Calculates student loan cost */
function getStudentLoanCost(salary)
{
    // Fetch brackets and rates, and calculate
    brackets = config.slBrackets;
    rates = config.slRates;

    return getBracketDeductions(brackets, rates, salary);
}

/* Fetches all elements on the page which add or subtract from the total
available income, and returns their combined sum.

sumType: 'yearly' or 'monthly' */
function getMoneySum(sumType)
{
    // Fetch all 'pay' (positive increase) and 'cost' elements
    let pays = document.getElementsByClassName('pay-' + sumType);
    let costs = document.getElementsByClassName('cost-' + sumType);
    let sum = 0;

    // Sum up pays
    for (let i = 0; i < pays.length; i++)
    {
        // We can have both <input> values, as well as p elements which store
        // auto-calculated values
        if (pays[i].tagName == "INPUT")
        {
            if (pays[i].value == "")
                pays[i].value = 0;

            sum += parseInt(pays[i].value);
        }
        else
        {
            if (pays[i].value == "")
                pays[i].value = 0;

            sum += parseInt(pays[i].innerHTML);
        }
    }

    // Sum up costs
    for (let i = 0; i < costs.length; i++)
    {
        // We can have both <input> values, as well as p elements which store
        // auto-calculated values
        if (costs[i].tagName == "INPUT")
        {
            if (costs[i].value == "")
                costs[i].value = 0;

            sum -= parseInt(costs[i].value);
        }
        else
        {
            if (costs[i].innerHTML == "")
                costs[i].value = 0;

            sum -= parseInt(costs[i].innerHTML);
        }
    }

    return sum;
}

/* Updates elements on the page to show new values */
function updatePage()
{
    /* Fetch salary for use later */
    let salary = parseInt(document.getElementById('salary').value);

    /* Update the income tax display */
    let taxDisplay = document.getElementById('income-tax');
    taxDisplay.innerHTML = getIncomeTax(salary);

    /* Update NI display */
    let niDisplay = document.getElementById('national-insurance');
    niDisplay.innerHTML = getNICost(salary);

    /* Update student loan display */
    let slDisplay = document.getElementById('student-loan');
    slDisplay.innerHTML = getStudentLoanCost(salary);

    /* Get yearly + monthly costs, then add them up */
    yearly = getMoneySum('yearly');
    monthly = getMoneySum('monthly');

    total = yearly + monthly * 12;

    /* Fetch the element showing the gross income, and display the calculated
    income */
    let resultDisplay = document.getElementById('gross-income');
    resultDisplay.innerHTML = config.currencySymbol + total;
}
