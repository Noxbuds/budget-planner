/* Maintains the configuration for all the scripts in this planner */

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
