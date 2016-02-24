document.getElementById("rightbottom").addEventListener("click", function () {
    var mousePro = ["downloadData", "ToRightToBottom"];
    chrome.runtime.sendMessage(mousePro);
});
/*/
document.getElementById("rightbottom").addEventListener("click", function () {
    var mousePro = ["savetab", "rightbottom"];
    chrome.runtime.sendMessage(mousePro);
});

document.getElementById("leftup").addEventListener("click", function () {
    var mousePro = ["savetab", "leftup"];
    chrome.runtime.sendMessage(mousePro);
});
*/
document.getElementById("leftup").addEventListener("click", function () {
    var mousePro = ["downloadData", "ToLeftToUP"];
    chrome.runtime.sendMessage(mousePro);
});

document.getElementById("ABCMove").addEventListener("click", function () {
    var optionsUrl = chrome.extension.getURL('ABCMove.html');
    chrome.tabs.query({ url: optionsUrl }, function (tabs) {
        if (tabs.length) {
            chrome.tabs.update(tabs[0].id, { active: true });
        } else {
            chrome.tabs.create({ url: optionsUrl });
        }
    });
});

