function bbox(el) {
    return el.getAttribute('title')
        .match(/bbox\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/)
        .slice(1)
        .map(function(coord) { return parseInt(coord); });
}

function absolutize() {
    for (var el of document.querySelectorAll("*[title]")) {
        var coords = bbox(el);
        el.style.left = coords[0] + "px";
        el.style.top = coords[1] + "px";
        el.style.width = coords[2] - coords[0] + "px";
        el.style.height = coords[3] - coords[1] + "px";
    }
}

function addTooltipStyles() {
    var ocrClasses = {};
    for (var el of document.querySelectorAll("*[class^='ocr']")) {
        ocrClasses[el.getAttribute('class')] = true;
    }
    var style = document.createElement('style');
    style.appendChild(document.createTextNode(
        Object.keys(ocrClasses).map(function(cls) {
            return '.' + cls + ':hover:before { content: "' + cls + '"; }';
        }).join("\n")
    ));
    document.querySelector('head').appendChild(style);
}

document.addEventListener('DOMContentLoaded', function() {
    addTooltipStyles();
    absolutize();
    document.querySelector('body').setAttribute('class', 'hocrjs');
});
