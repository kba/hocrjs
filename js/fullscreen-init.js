(function(window) {
    window.hocrViewerInit = function hocrViewerInit() {
        window.hocrViewer = new window.HocrViewer({root: document.querySelector('body')});
        window.hocrViewer.init();
    }
    document.addEventListener('load', window.hocrViewerInit);
}(this));
