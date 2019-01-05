const React = {
    createElement
}
function createElement( tag, attrs, ...children ) {
    return {
        tag,
        attrs,
        children
    }
}
const element = <div>123</div>;
const element1 = React.createElement(
    'div',
    null,
    '12456'
)

let dom = document.getElementById('root');

console.log(dom);
console.log(element);
console.log(element1);