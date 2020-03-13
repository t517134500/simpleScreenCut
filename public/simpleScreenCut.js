class SimpleScreenCut {
    constructor() {
        // 注册canvas
        this.canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
        this.context = this.canvas.getContext('2d');
        // 注册图片
        this.image = new Image();
        this.onLoad = () => {};
        // 注册回调
        this.beforeScreenCut = () => {};
        this.screenCut = () => {};
        this.beforeDestroy = () => {};
        this.destroyed = () => {};
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

    // 绘制图片
    drawImg(img) {
        const { width } = img;
        const { height } = img;
        // canvas绘制
        this.canvas.width = width;
        this.canvas.height = height;
        // 画布清除
        this.context.clearRect(0, 0, width, height);
        // 绘制图片到canvas
        this.context.drawImage(img, 0, 0);
        this.beforeScreenCut(img, this);
        this.screenCut(this.canvas.toDataURL('image/png'), this);
        this.beforeDestroy(img, this);
        const { destroyed } = this;
        this.destroy();
        destroyed.call(this, img, this);
    }

    // 销毁组件
    destroy() {
        delete this.image.onload;
        Object.keys(this).forEach((i) => {
            delete this[i];
        });
    }
}
export default function (dom, callback, size) {
    const simpleScreenCut = new SimpleScreenCut();
    simpleScreenCut.screenCut = callback;
    return simpleScreenCut.drawDom(dom, false, size);
}
