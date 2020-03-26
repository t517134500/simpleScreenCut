export class SimpleScreenCut {
    constructor(options) {
        // 注册回调
        this.beforeScreenCut = () => {};
        this.screenCut = () => {};
        this.beforeDestroy = () => {};
        this.destroyed = () => {};
        Object.assign(this, options);
    }

    // 传入div
    drawDom(dom, isClone, size) {
        if (!dom) {
            return;
        }
        if (isClone) dom = dom.cloneNode(true);
        // 设置image回调
        this.beforeScreenCut(dom, this);
        this.screenCut(`data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="${(size && size.width) || dom.offsetWidth}" height="${(size && size.height) || dom.offsetHeight}"><foreignObject x="0" y="0" width="100%" height="100%">${
            new XMLSerializer().serializeToString(dom).replace(/#/g, '%23').replace(/\n/g, '%0A')
        }</foreignObject></svg>`);
        this.beforeDestroy(dom, this);
        const { destroyed } = this;
        this.destroy();
        destroyed.call(this, dom, this);
    }

    // 销毁组件
    destroy() {
        Object.keys(this).forEach((i) => {
            delete this[i];
        });
    }
}
export function screenCut (dom, callback, size) {
    const simpleScreenCut = new SimpleScreenCut();
    simpleScreenCut.screenCut = callback;
    simpleScreenCut.destroyed = simpleScreenCut.destroy;
    return simpleScreenCut.drawDom(dom, false, size);
}
