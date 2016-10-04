(function() {
    window.hocrViewerInit = function hocrViewerInit() {
        window.hocrViewer = new window.HocrViewer({root: document.querySelector('body')});
        window.hocrViewer.init();
    }
    window.addEventListener('load', window.hocrViewerInit);
    console.log(window);
}());
