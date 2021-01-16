const elementResizeDetectorMaker = require('element-resize-detector');
const erd = elementResizeDetectorMaker({
    strategy: 'scroll' //<- For ultra performance.
});

function beforeUpdate(el, binding, vnode) {
    let options = {};
    if (binding.value) {
        options = binding.value;
    }
    erd.listenTo(options, el, element => {
        let width = element.offsetWidth;
        let height = element.offsetHeight;
        if (vnode.componentInstance) {
            vnode.componentInstance.$emit('resize', { detail: { width, height } });
        } else {
            vnode.el.dispatchEvent(
                new CustomEvent('resize', { detail: { width, height } })
            );
        }
    });
}
function beforeUnmount(el) {
    erd.uninstall(el);
}

export { beforeUpdate, beforeUnmount };
