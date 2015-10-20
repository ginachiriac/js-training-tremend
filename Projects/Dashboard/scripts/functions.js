
function createElement(element, container, attributes, properties, events) {
    var container = container || null;
    var attributes = attributes || {};
    var properties = properties || {};
    var events = events || {};

    if (container != null) {
        var elementContainer = (typeof container == 'object') ? container : document.createElement(container);
    }

    var el = document.createElement(element);

    for (var attr in attributes) {
        el.setAttribute(attr, attributes[attr]);
    }

    for (var property in properties) {
        el[property] = properties[property];
    }

    for (var event in events) {
        el.addEventListener(event, events[event]);
    }

    if (container != null) {
        elementContainer.appendChild(el);
        return elementContainer;
    }

    return el;
}

function getCollection(id) {
    return extractObjectFromArrayByProperty(collections, 'id', id);
}

function getTag(id) {
    return extractObjectFromArrayByProperty(tags, 'id', id);
}

function getPart(id) {
    return extractObjectFromArrayByProperty(items, 'id', id);
}

function extractObjectFromArrayByProperty(arr, property, value) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][property] == value) {
            return arr[i];
        }
    }

    return null;
}

function addEventListener(el, eventName, handler) {
    if (el.addEventListener) {
        el.addEventListener(eventName, handler);
    } else {
        el.attachEvent('on' + eventName, function(){
            handler.call(el);
        });
    }
}

