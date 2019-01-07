const React = {
    createElement,
    Component
}
const ReactDOM={
    render:(cnode,container) => {
        container.innerHTML = '';
        return render( cnode,container );
    }
}
//react
function createElement( tag, attrs, ...children ) {
    return {
        tag,
        attrs,
        children
    }
}
class Component{
    constructor( props = {} ){
        this.state={};
        this.props=props;
    }
    setState(stateChange){
        Object.assign(this.state,stateChange);
        renderComponent(this);
    }
}
//reactDOM
// const  render = (cnode,container) => {
//     container.innerHTML = '';
//     return container.appendChild( _render( cnode ) );
// }
function render(cnode,container){
    if ( cnode === undefined || cnode === null || typeof cnode === 'boolean' ) cnode = '';
    if ( typeof cnode === 'number' ) cnode = String( cnode );
    if(typeof cnode === 'string'){
        const textNode = document.createTextNode(cnode);
        return container.appendChild(textNode);
    }
    
    const dom = document.createElement(cnode.tag);
    if(cnode.attrs){
        Object.keys(cnode.attrs).forEach(key => {
            const value = cnode.attrs[key];
            setAttr(dom,key,value);
        })
    }
    cnode.children.forEach( child => render(child,dom));
    return container.appendChild(dom);
}
function setAttr(dom,name,value){
    if(name === 'className'){
        name = 'class';
    }
    if( /on\w+/.test( name )){
        name = name.toLowerCase();
        dom[name] = value || '';
    }else if(name==='style'){
        if ( !value || typeof value === 'string' ) {
            dom.style.cssText = value || '';
        } else if( value && typeof value === 'object' ){
            for ( let name in value ) {
                dom.style[ name ] = typeof value[ name ] === 'number' ? value[ name ] + 'px' : value[ name ];
            }
        }
    }else{
        if ( name in dom ) {
            dom[ name ] = value || '';
        }
        if ( value ) {
            dom.setAttribute( name, value );
        } else {
            dom.removeAttribute( name );
        }
    }
}


//测试
function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
      );
    ReactDOM.render(
        element,
        document.getElementById( 'root' )
    );
}

setInterval( tick, 1000 );

// 测试
// let _this = this;
// const akk = {
//     a:'6',
//     test2:function(){
//         console.log(_this,111);
//         function test4(){
//             console.log(this,555);
//         }
//         test4();
//     }
// };
// class aff{
//     test9(){
//         console.log(this);
//         (function(){
//             console.log(this,66)
//         })()
//         const jiantou = () => {
//             console.log(this,86)
//         };
//         jiantou()
//     }
// }
// function test(){
//     console.log(this,66666666666);
// }
// let a3 = new aff();
// test.call(aff);
// akk.test2();
// a3.test9();



