// create an html element
function createElement(element, container, attributes, properties) {
    if (container != null) {
        var elementContainer = document.createElement(container);
    }

    var el = document.createElement(element);

    for (var attr in attributes) {
        el.setAttribute(attr, attributes[attr]);
    }

    for (var property in properties) {
        el[property] = properties[property];
    }

    if (container != null) {
        elementContainer.appendChild(el);
        return elementContainer;
    }

    return el;
}

// create collections, tags, parts
function createParts (item, parts, buttonText) {
    var partsContainer = document.createElement("li");

    // iterate through parts, show parts name, set parts id
    var partContainer = document.createElement("ul");
    for (var j = 0; j < item.length; j++) {
        for (var k = 0; k < parts.length; k++) {
            if (item[j] == parts[k].id) {
                var partName = createElement("li", null, {}, {"textContent": parts[k].name});
                partName.setAttribute("data-part-id", parts[k].id);
                partContainer.appendChild(partName);
            }
        }
    }
    partsContainer.appendChild(partContainer);

    // generate button
    if (typeof buttonText !== 'undefined') {
        partsContainer.appendChild(createButton(buttonText));
    }

    return partsContainer;
}

// create button for parts
function createButton(text) {
    var tagButton = document.createElement("Button");
    var tagButtonText = document.createTextNode(text);
    tagButton.appendChild(tagButtonText);

    return tagButton;
}

var dataContainer = document.querySelector("#data");

var itemsContainer = document.createElement("ul");

var mainCheckbox = document.createElement("input");
mainCheckbox.setAttribute("type", "checkbox");
mainCheckbox.addEventListener("change", function() {
    var checkboxes = document.querySelectorAll(".checkbox_item");
    console.log(mainCheckbox.checked);
    for (var i = 0; i < checkboxes.length; i++) {
        // add check for checkbox
        checkboxes[i].checked = mainCheckbox.checked;
    }
});

dataContainer.appendChild(mainCheckbox);

for (var i = 0; i < items.length; i++) {
    var item = items[i];

    var itemContainer = document.createElement("li");
    var itemDataContainer = document.createElement("ul");
    var idContainer = document.createElement("li");
    var nameContainer = document.createElement("li");
    var descriptionContainer = document.createElement("li");
    var fileTypesContainer = document.createElement("li");

    nameContainer.setAttribute("style", "color: red;");

    /**
     * innerHtml - only for html content
     * innerText - not supported by firefox
     * textContent - purrrfect
     */

 //   idContainer.textContent = item.id;
    nameContainer.textContent = item.name;
    descriptionContainer.textContent = item.details.description;
    var fileTypes = item.filesTypes;

    //iterate through fileTypes
    for (var j= 0; j< fileTypes.length; j++) {
        var fileType = fileTypes[j];
        var fileTypeContainer = document.createElement("ul");

        var fileTypeFileName = createElement("li", null, {}, {"textContent": fileType.filename});
        fileTypeContainer.appendChild(fileTypeFileName);

        var fileTypeExtension = createElement("li", null, {}, {"textContent": fileType.extension});
        fileTypeContainer.appendChild(fileTypeExtension);

        var fileTypeDistributionContainer = document.createElement("li");
        for(var k=0; k<fileType.distributions.length;k++) {
            var distribution = fileType.distributions[k];
            var distributionList = document.createElement("ul");

            var distributionName = createElement("li", null, {}, {"textContent": distribution.name});
            var distributionPrice = createElement("li", null, {}, {"textContent": distribution.price});

            distributionList.appendChild(distributionName);
            distributionList.appendChild(distributionPrice);
            fileTypeDistributionContainer.appendChild(distributionList);
        }

        fileTypeContainer.appendChild(fileTypeDistributionContainer);
        fileTypesContainer.appendChild(fileTypeContainer);
    }

    //append data to item
 //   itemDataContainer.appendChild(idContainer);
    itemDataContainer.appendChild(nameContainer);
    itemDataContainer.appendChild(descriptionContainer);
    itemDataContainer.appendChild(fileTypesContainer);
    itemDataContainer.appendChild(createParts(item.collections, collections, "Add to a new collection"));
    itemDataContainer.appendChild(createParts(item.tags, tags, "Add a new tag"));
    itemDataContainer.appendChild(createParts(item.parts, items));


    var checkboxContainer = document.createElement("li");
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("class", "checkbox_item");
    checkboxContainer.appendChild(checkbox);
    itemDataContainer.appendChild(checkboxContainer);

    itemContainer.appendChild(itemDataContainer);
    itemsContainer.appendChild(itemContainer);
}

dataContainer.appendChild(itemsContainer);
