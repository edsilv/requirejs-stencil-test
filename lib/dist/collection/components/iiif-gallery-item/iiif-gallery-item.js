import classNames from 'classnames';
export class IIIFGalleryItem {
    constructor() {
        this.selected = false;
    }
    renderLabel() {
        let label = this.item.getDefaultLabel();
        if (label) {
            return (h("div", { class: "ph2 ph0-ns pb3 link" },
                h("h3", { class: "f5 f4-ns mb0 black-90" }, label)));
        }
    }
    render() {
        let thumbnail = this.item.getThumbnail();
        const classes = classNames({
            'collection': this.item.isCollection(),
            'manifest': this.item.isManifest(),
            'canvas': this.item.isCanvas(),
            'selected': this.selected,
            'aspect-ratio': true,
            'aspect-ratio--1x1': true
        });
        return (h("div", { onClick: () => this._itemSelectedHandler(), class: "fl w-100 w-50-m  w-25-ns pa2" },
            h("div", { class: classes },
                h("img", { src: thumbnail.id, class: "db bg-center cover aspect-ratio--object" })),
            this.renderLabel()));
    }
    _itemSelectedHandler() {
        this.onSelectItem.emit(this.item);
    }
    static get is() { return "iiif-gallery-item"; }
    static get properties() { return {
        "item": {
            "type": "Any",
            "attr": "item"
        },
        "selected": {
            "type": Boolean,
            "attr": "selected"
        }
    }; }
    static get events() { return [{
            "name": "onSelectItem",
            "method": "onSelectItem",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "/**style-placeholder:iiif-gallery-item:**/"; }
}
