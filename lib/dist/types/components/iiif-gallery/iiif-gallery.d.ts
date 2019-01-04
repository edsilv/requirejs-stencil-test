import '../../stencil.core';
/// <reference types="manifesto.js" />
import { EventEmitter } from '../../stencil.core';
export declare class IIIFGallery {
    private _selectedItem;
    items: Manifesto.IManifestResource[];
    manifest: string;
    manifestHandler(): void;
    ignore: string;
    ignoreHandler(): void;
    onSelectManifest: EventEmitter;
    onSelectCollection: EventEmitter;
    onSelectCanvas: EventEmitter;
    componentWillLoad(): void;
    private _reset;
    reset(): void;
    render(): JSX.Element;
    itemSelected(event: CustomEvent): void;
}
