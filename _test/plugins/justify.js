module( "plugins.justify" );

test( '闭合在段落中设置对齐方式', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    var body = editor.body;
    editor.setContent( '<p><em>hello1</em></p>' );
    setTimeout(function(){
        range.setStart( body.firstChild.firstChild.firstChild, 3 ).collapse( true ).select();
        editor.execCommand( 'justify', 'center' );
        equal( body.firstChild.style['textAlign'], 'center', 'p对齐方式为居中对齐' );
        start();
    },50);
    stop();
} );

test( '不闭合在段落中设置对齐方式', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    var body = editor.body;
    editor.setContent( '<p><em>hello1</em></p><p><span style="color:red">hello2</span>hello3</p>' );
    setTimeout(function(){
        range.selectNode( body.firstChild.firstChild.firstChild ).select();
        editor.execCommand( 'justify', 'center' );
        equal( body.firstChild.style['textAlign'], 'center', 'p对齐方式为居中对齐' );

        range.setStart( body.firstChild, 0 ).setEnd( body.lastChild, 1 ).select();
        editor.execCommand( 'justify', 'right' );
        equal( body.firstChild.style['textAlign'], 'right', 'p对齐方式为居中对齐' );
        equal( body.lastChild.style['textAlign'], 'right', 'p对齐方式为居中对齐' );

        range.setStart( body.firstChild.firstChild.firstChild, 3 ).collapse( true ).select();
        editor.execCommand( 'justify', 'center' );
        equal( body.firstChild.style['textAlign'], 'center', 'p对齐方式为居中对齐' );
        start();
    },50);
    stop();
} );

test( '连续2次设置对齐方式', function() {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent( '<p ><em>tell</em></p>' );
    setTimeout(function(){
        range.setStart( editor.body.firstChild.firstChild, 0 ).collapse( 1 ).select();
        editor.execCommand( 'justify', 'right' );
        equal( editor.queryCommandValue( 'justify' ), 'right', 'querycommand value' );
        range.setStart( editor.body.firstChild.firstChild, 0 ).collapse( 1 ).select();
        editor.execCommand( 'justify', 'center' );
        equal( editor.queryCommandValue( 'justify' ), 'center', 'querycommand value' );
        start();
    },50);
    stop();
} );
