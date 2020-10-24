/* Manages adding/deleting costs */

/* Dictionary for each cost node */
let costs = {};
let maxId = 0;

/* Gets the next available cost ID */
function getNextId()
{
    let id = 0;
    for (id = 0; id <= maxId; id++)
    {
        // If this ID is not used, return it
        if (!(id in costs))
        {
            return id;
        }
    }
    return id;
}

function removeCost(id)
{
    if (id in costs)
    {
        // Remove from page, and then remove from dictionary
        costs[id].remove();
        delete costs[id];
    }
}

/* Adds a new cost that the user can configure */
function addNewCost()
{
    // Create a new div element
    let box = document.createElement("div");
    let boxId = getNextId();
    box.id = config.names.costDisplay + "-" + boxId;
    box.className = config.names.costDisplay;

    if (boxId > maxId)
        maxId = boxId;

    // Add a prompt for the name of the cost
    let namePrompt = document.createElement("p");
    namePrompt.innerHTML = "Name:";
    box.appendChild(namePrompt);

    let nameField = document.createElement("input");
    nameField.setAttribute("type", "text");
    nameField.id = config.names.costName + "-" + boxId;
    box.appendChild(nameField);

    // Add a prompt for the monthly amount
    let costPrompt = document.createElement("p");
    costPrompt.innerHTML = "Cost per month: ";
    box.appendChild(costPrompt);

    let costField = document.createElement("input");
    costField.setAttribute("type", "number");
    costField.setAttribute("min", "0");
    costField.setAttribute("oninput", "updatePage()");
    costField.className = config.names.costTag + "-" + config.names.monthlyTag;
    costField.id = config.names.costTag + "-" + boxId;
    box.appendChild(costField);

    // Add a 'remove' button
    let removeBtn = document.createElement("button");
    removeBtn.setAttribute("type", "button");
    removeBtn.setAttribute("name", config.names.removeCost + "-" + boxId);
    removeBtn.setAttribute("onclick", "removeCost(" + boxId + "); updatePage()");
    removeBtn.innerHTML = "Remove cost";
    box.appendChild(removeBtn);

    // Add it to the costs list
    costs[boxId] = box;

    // Add it to the HTMl page
    document.getElementById('costs-root').append(box);
}
