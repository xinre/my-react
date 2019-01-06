const React = {
    createElement
}
const ReactDOM={
    render: (cnode,container) => {
        container.innerHTML = '';
        return render(cnode,container);
    }
}
function createElement( tag, attrs, ...children ) {
    return {
        tag,
        attrs,
        children
    }
}
function render(cnode,container){
    if(typeof cnode === 'string'){
        const textNode = document.createTextNode(cnode);
        return container.appendChild(textNode);
    }
    const dom = document.createElement(cnode.tag);
    if(cnode.attrs ){
        Object.keys(cnode.attrs).forEach(key => {
            const value = cnode.attrs[key];
            setAttr(dom,key,value);
        })
    }
    cnode.children.forEach( child => render(child,dom));
    return container.appendChild(dom)
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




