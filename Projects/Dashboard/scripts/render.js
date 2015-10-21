function renderItems(items, parentElement) {
  for (var i = 0; i < items.length; i++) {
      renderItem(items[i], parentElement);
  }
}

function renderFileTypes(fileTypes, parentElement) {
  var fileTypesContainer = document.createElement("ul");
  var fileTypesHeader = createElement("lh", null, {}, {textContent: "File types"});
  fileTypesContainer.appendChild(fileTypesHeader);

  for (var i = 0; i < fileTypes.length; i++) {
      var ftContainer = document.createElement('li');
      renderFileType(fileTypes[i], ftContainer);
      fileTypesContainer.appendChild(ftContainer);
  }

  parentElement.appendChild(fileTypesContainer);
}

function renderDistributions(distributions, parentElement) {
  var distributionsContainer = document.createElement("ul");
  var distributionsHeader = createElement("lh", null, {}, {textContent: "Distributions"});
  distributionsContainer.appendChild(distributionsHeader);

  for (var i = 0; i < distributions.length; i++) {
      var dContainer = document.createElement("li");
      renderDistribution(distributions[i], dContainer);
      distributionsContainer.appendChild(dContainer);
  }

  parentElement.appendChild(distributionsContainer);
  return distributionsContainer;
}

function renderCollections(collections, parentElement, button) {
  var button = button || false;
  var collContainer = document.createElement("ul");
  var collHeader = createElement("lh", null, {}, {textContent: "Collections"});
  collContainer.appendChild(collHeader);

  for (var i = 0; i < collections.length; i++) {
    renderCollection(collections[i], collContainer);
  }

  if (button) {
    var buttonElement = createElement("button", "li", {}, {textContent: "Add to another collection"});
    collContainer.appendChild(buttonElement);
  }

  parentElement.appendChild(collContainer);
}

function renderTags(tags, parentElement, button) {
  var button = button || false;
  var tagsContainer = document.createElement("ul");
  var tagsHeader = createElement("lh", null, {}, {textContent: "Tags"});
  tagsContainer.appendChild(tagsHeader);

  for (var i = 0; i < tags.length; i++) {
    renderTag(tags[i], tagsContainer);
  }

  if (button) {
    var buttonElement = createElement("button", "li", {}, {textContent: "Add another tag"});
    var button = buttonElement.firstChild;
    var inputElement = createElement("input", null, {type: 'text', name: 'Tag', style: "display: none"});
    var submitInput = createElement("input", null, {type: 'submit', value: 'Save', style: "display: none"});


    // on button click hide add button and show input
    addEventListener(button, 'click', function(){
      this.style.display = 'none';
      inputElement.removeAttribute('style');
      submitInput.removeAttribute('style');
    });

    // on "save" click, save tag
    addEventListener(submitInput, 'click', function() {
      if(inputElement.value == '') {
        inputElement.style.borderColor = 'red';
        return;
      } else {
        inputElement.removeAttribute('style');
      }

      // find tag matching current value; if doesn't exist add new object to tags
      for (var i = 0; i < getTags().length; i++) {
        var tag = getTags()[i];
        var found = false;
        if (tag.name == inputElement.value) {
          var tagElement = createElement("li", null, {'data-tag-id': tag.id}, {textContent: tag.name});
          tagsContainer.appendChild(tagElement);
          found = true;
          console.log(tag);
        }
      }

      if (!found) {
        var tagElement = createElement("li", null, {}, {textContent: inputElement.value});
        tagsContainer.insertBefore(tagElement, buttonElement);
        addToTags({id: getTags().length+1, name: inputElement.value})
        console.log(getTags());
      }

      button.removeAttribute('style');
      inputElement.value = '';
      inputElement.style.display = 'none';
      submitInput.style.display = 'none';
    });

    tagsContainer.appendChild(buttonElement);
    buttonElement.appendChild(inputElement);
    buttonElement.appendChild(submitInput);
  }

  parentElement.appendChild(tagsContainer);
}

function renderParts(parts, parentElement) {
    var partsContainer = document.createElement("ul");
    var partsHeader = createElement("lh", null, {}, {textContent: "Parts"});
    partsContainer.appendChild(partsHeader);

    for (var i = 0; i < parts.length; i++) {
      renderPart(parts[i], partsContainer);
    }

    parentElement.appendChild(partsContainer);
}

function renderSelectAllCheckbox(parentElement, selector) {
  selector = selector || ".checkbox_item";

  var mainCheckbox = createElement("input", null, {
      "type": "checkbox"
  }, {}, {
      'change': function() {
          var checkboxes = document.querySelectorAll(selector);
          for (var i = 0; i < checkboxes.length; i++) {
              // add check for checkbox
              checkboxes[i].checked = mainCheckbox.checked;
          }
      }
  });

  parentElement.appendChild(mainCheckbox);
}

function renderItem(item, parentElement) {
  var itemContainer = document.createElement("li");
  var itemDataContainer = document.createElement("ul");

  var nameElement = createElement("lh", null, {}, {textContent: item.name});
  itemDataContainer.appendChild(nameElement);

  var descriptionElement = createElement("li", null, {}, {textContent: item.details.description});
  itemDataContainer.appendChild(descriptionElement);

  var fileTypesContainer = document.createElement("li");
  renderFileTypes(item.filesTypes, fileTypesContainer);
  itemDataContainer.appendChild(fileTypesContainer);

  var collectionsContainer = document.createElement("li");
  renderCollections(item.collections, collectionsContainer, true);
  itemDataContainer.appendChild(collectionsContainer);

  var tagsContainer = document.createElement("li");
  renderTags(item.tags, tagsContainer, true);
  itemDataContainer.appendChild(tagsContainer);

  var partsContainer = document.createElement("li");
  renderParts(item.parts, partsContainer);
  itemDataContainer.appendChild(partsContainer);

  var checkbox = createElement("input", "li", {"type": "checkbox", "class": "checkbox_item"});
  itemDataContainer.appendChild(checkbox);

  itemContainer.appendChild(itemDataContainer);
  parentElement.appendChild(itemContainer);
}

function renderFileType(fileType, parentElement) {
  var fileTypeContainer = document.createElement("ul");

  var fileTypeFileName = createElement("lh", null, {}, {"textContent": fileType.filename});
  fileTypeContainer.appendChild(fileTypeFileName);

  var fileTypeExtension = createElement("li", null, {}, {"textContent": fileType.extension});
  fileTypeContainer.appendChild(fileTypeExtension);

  var fileTypeDistributionContainer = document.createElement("li");
  renderDistributions(fileType.distributions, fileTypeDistributionContainer);
  fileTypeContainer.appendChild(fileTypeDistributionContainer);

  parentElement.appendChild(fileTypeContainer);
}

function renderDistribution(distribution, parentElement) {
  var distributionList = document.createElement("ul");

  var distributionName = createElement("lh", null, {}, {"textContent": distribution.name});
  var distributionPrice = createElement("li", null, {}, {"textContent": distribution.price});

  distributionList.appendChild(distributionName);
  distributionList.appendChild(distributionPrice);
  parentElement.appendChild(distributionList);
}

function renderCollection(id, parentElement) {
  var collection = getCollection(id);
  var collectionElement = createElement("li", null, {'data-col-id': collection.id}, {textContent: collection.name});

  parentElement.appendChild(collectionElement);
}

function renderTag(id, parentElement) {
  var tag = getTag(id);
  var tagElement = createElement("li", null, {'data-tag-id': tag.id}, {textContent: tag.name});

  parentElement.appendChild(tagElement);
}

function renderPart(id, parentElement) {
  var part = getPart(id);
  var partElement = createElement("li", null, {'data-part-id': part.id}, {textContent: part.name});

  parentElement.appendChild(partElement)
}
