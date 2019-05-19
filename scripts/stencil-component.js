(function() {
	var componentName = 'mycomponent';
    var scriptUri = 'node_modules/@edsilv/stencil-one-test/dist/' + componentName;  
    var t = document.createElement('script');
    t.type = 'text/javascript';
    t.src = scriptUri +'/' + componentName + '.js';
    document.body.appendChild(t);
})();