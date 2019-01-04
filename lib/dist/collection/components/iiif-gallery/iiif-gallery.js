export class IIIFGallery {
    constructor() {
        this.items = null;
    }
    manifestHandler() {
        this._reset();
    }
    ignoreHandler() {
        this._reset();
    }
    componentWillLoad() {
        this._reset();
    }
    _reset() {
        if (this.manifest) {
            manifesto.loadManifest(this.manifest).then((data) => {
                const manifest = manifesto.create(data);
                // if it's a collection, list either the child collections or child manifests.
                if (manifest.isCollection()) {
                    this.items = manifest.items;
                }
                else {
                    // if it's a manifest, list the child canvases.
                    const sequences = manifest.getSequences();
                    if (sequences.length) {
                        const sequence = sequences[0];
                        this.items = sequence.getCanvases();
                    }
                }
                if (this.ignore) {
                    // remove any whitespace in ignore csv
                    const ignore = this.ignore.split(',').map((item) => item.trim());
                    this.items = this.items.filter(resource => ignore.indexOf(resource.id) === -1);
                }
            }).catch(function (e) {
                console.error(e);
                console.error('failed to load manifest');
            });
        }
        else {
            this.items = null;
        }
    }
    reset() {
        this._reset();
    }
    render() {
        if (!this.items) {
            return (h("span", null));
        }
        else {
            return (h("section", { class: "cf w-100 pa2" }, this.items.map((item) => h("iiif-gallery-item", { item: item, selected: this._selectedItem === item }))));
        }
    }
    itemSelected(event) {
        const item = event.detail;
        this._selectedItem = item;
        if (item.isCollection()) {
            this.onSelectCollection.emit(item);
        }
        else if (item.isManifest()) {
            this.onSelectManifest.emit(item);
        }
        else {
            this.onSelectCanvas.emit(item);
        }
    }
    static get is() { return "iiif-gallery"; }
    static get properties() { return {
        "ignore": {
            "type": String,
            "attr": "ignore",
            "watchCallbacks": ["ignoreHandler"]
        },
        "items": {
            "state": true
        },
        "manifest": {
            "type": String,
            "attr": "manifest",
            "watchCallbacks": ["manifestHandler"]
        },
        "reset": {
            "method": true
        }
    }; }
    static get events() { return [{
            "name": "onSelectManifest",
            "method": "onSelectManifest",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "onSelectCollection",
            "method": "onSelectCollection",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "onSelectCanvas",
            "method": "onSelectCanvas",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "onSelectItem",
            "method": "itemSelected"
        }]; }
    static get style() { return "/**style-placeholder:iiif-gallery:**/"; }
}
