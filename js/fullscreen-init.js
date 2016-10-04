(function(window) {
    var document = window.document;
    document.hocrViewerInit = function hocrViewerInit() {
        window.hocrViewer = new window.HocrViewer({root: document.querySelector('body')});
        window.hocrViewer.init();
    }
    document.addEventListener('load', document.hocrViewerInit);
}());
