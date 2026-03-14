const htmlCode = document.getElementById("inputHtml");
const previewTextBtn = document.getElementById("previewTextBtn");
const previewFrame = document.getElementById("previewFrame");

previewTextBtn.addEventListener("click", function(){
    const htmlToPreview = htmlCode.value;
    previewFrame.srcdoc = htmlToPreview;
});