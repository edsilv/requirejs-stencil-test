import '../../stencil.core';
/// <reference types="manifesto.js" />
import { EventEmitter } from '../../stencil.core';
export declare class IIIFGalleryItem {
    item: Manifesto.IManifestResource;
    selected: boolean;
    onSelectItem: EventEmitter;
    renderLabel(): JSX.Element;
    render(): JSX.Element;
    private _itemSelectedHandler;
}
