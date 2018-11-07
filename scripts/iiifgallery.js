(function() {
	var componentName = 'iiifgallery';
    var scriptUri = 'node_modules/iiif-gallery/dist';  
    var t = document.createElement('script');
    t.type = 'text/javascript';
    t.src = scriptUri +'/' + componentName + '.js';
    document.body.appendChild(t);
})();