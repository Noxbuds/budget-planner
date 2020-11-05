/* Maintains the configuration for all the scripts in this planner, and also
handles saving/loading things */

let config = {
    currencySymbol: "&#163;", // pound symbol, not supported by ASCII

    /* IDs and class names to be used. These should match the classes used in
    the HTML file, and should be used instead of manually entering them in
    any JS code that runs in this budget planner */
    names: {
        costDisplay: 'cost-display',

        costName: 'cost-name',
        costTag: 'cost',
        removeCost: 'remove-cost',
        yearlyTag: 'yearly',
        monthlyTag: 'monthly',

        payTag: 'pay'
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

/* Gets the current budget plan as a dictionary containing salary and a list of
each cost as a JSON string */
function getBudgetData()
{
    /* First fetch salary */
    salary = parseInt(document.getElementById('salary').value);

    /* Loop through each cost in costsManager.js */
    let sCosts = [];

    for (let key in costs)
    {
        curBox = {name: '', cost: 0};

        // Fetch this box's name
        curBox.name = document.getElementById(config.names.costName + '-' + key).value;

        // And its cost
        curBox.cost = parseInt(document.getElementById(config.names.costTag + '-' + key).value);

        sCosts.push(curBox);
    }

    // Format it and return
    data = {salary: salary, costs: sCosts};
    return JSON.stringify(data);
}

/* Saves the budget data to the user's local machine */
function save()
{
    // Create JSON file blob
    let file = new Blob([getBudgetData()], {type: 'application/json'});

    // Create a hyperlink to download this file
    let link = document.createElement('a');
    let url = URL.createObjectURL(file);

    link.href = url;
    link.download = "budget_data.json";

    // Add the hyperlink to the HTML page and click it
    document.body.appendChild(link);
    link.click();

    // Remove the hyperlink and URL
    link.remove();
    URL.revokeObjectURL(file);
}

/* Prompts the user to select a file to load */
function load(input)
{
    removeAllCosts();

    // Fetch the file
    let file = input.files[0];

    // Fetch the text data from the file and load it
    file.text().then(text => loadData(text));
}

/* Loads budget data into the web page */
function loadData(data)
{
    // Convert the JSON data to a table
    data = JSON.parse(data);

    // Insert the salary (requires costsManager.js to be loaded)
    document.getElementById('salary').value = data.salary;

    console.log(data);

    // Add each cost
    for (i in data.costs)
    {
        // Add the cost div
        let costId = addNewCost();
        let cost = data.costs[i];

        // Update its data
        document.getElementById(config.names.costTag + '-' + costId).value = cost.cost;
        document.getElementById(config.names.costName + '-' + costId).value = cost.name;
    }

    // Update the page
    updatePage();
}
