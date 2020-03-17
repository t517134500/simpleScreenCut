export default function(canvas, options) {
    const {
        width,
        height,
        top,
        left
    } = options;
    return `<img src="${canvas.toDataURL('image/png')}" width="${width}" height="${height}" style="position: absolute;top: ${top}px;left: ${left}px;" />`;
}