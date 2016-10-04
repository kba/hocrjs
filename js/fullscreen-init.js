window.hocrViewerInit = function() {
    window.hocrViewer = new window.HocrViewer({root: document.querySelector('body')});
    window.hocrViewer.init();
}
window.addEventListener('load', window.hocrViewerInit);
