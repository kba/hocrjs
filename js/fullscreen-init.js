window.addEventListener('load', function() {
    window.hocrViewer = new HocrViewer({root: document.querySelector('body')});
    window.hocrViewer.init();
});
