function copy_text(node){
    if(document.body.createTextRange){
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
        document.execCommand('copy');
    }
    else if(window.getSelection){
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
    }
    else {
        console.warn("Could not select text in node");
    }
}
// This copy_text function ensures cross-browser compatibility
// What it does is select the text within the range of the node holding the text
// Then executes the "copy" command on that selected text

function clear_selection(){
    if(window.getSelection){
        window.getSelection().removeAllRanges();
    }
    else if(document.selection){
        document.selection.empty();
    }
}
// This clear_selection function clears any selection from the document

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("clipboard-exec").onclick = function(){
        copy_text(document.getElementById("clipboard-text"));
        // Copy the text on clicking the button
        setTimeout(() => { clear_selection() }, 500);
        // Clear the selection after 0.5s
    }
});
