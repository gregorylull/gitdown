$(function () {
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");

    // setting values: setValue completely replaces
    // editor.setValue("am i replacing?");

    // getting values and is just adding to the next. PERFECT!
    // console.log(editor.getValue());
    // var text = editor.getValue();
    // text += "\n var test = 'the next line?';";

    // addCommand completely prevents the default
    editor.commands.addCommand({
        name: 'unbindP',
        bindKey: {mac: 'Command-Enter'},
        exec: function (editor) {
          console.log(editor.getValue());
        },
        readOnly: true
    });

    // $(document).keypress(function(event){
    //     var keycode = (event.keyCode ? event.keyCode : event.which);
    //     if (keycode == '13') {
    //         console.log('enter key was pressed');
    //         editor.insert('something after enter?');
    //     }
    // });

    // new scroll bar?
    window.$editor = $(editor);

    // editor event binding
    // on change will trigger for both user AND editor, so maybe use keyup/keydown/press, etc.
    // on testing, change will not trigger if i inserted
    editor.getSession().on('change', function(event) {
        console.log('event: ', event);
        if (event.data.text === '\n') {
            console.log('enter key was pressed');
            console.log('enter key: ', event.data.text.charCodeAt(0));
        }
    });

    // test shows editor cannot handle multiple inputs
    editor.moveCursorTo(2, 2);

    editor.insert('a');
    editor.insert('\n');

// end of document.ready
});