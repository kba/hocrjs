(function(window) {
    document.hocrViewerInit = function hocrViewerInit() {
        window.hocrViewer = new window.HocrViewer({root: document.querySelector('body')});
        window.hocrViewer.init();
    }
    window.addEventListener('load', document.hocrViewerInit);
}());
