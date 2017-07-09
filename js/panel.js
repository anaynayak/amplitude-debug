var events = $('#events');

function processRequest(request) {
    var div = $('<div>');
    var event = $.deparam(decodeURIComponent(request.postData.text));
    div.JSONView(decodeURIComponent(event.e));
    events.append(div);
}

function clearView() {
    events.empty();
}

$('#clear').off().on('click', clearView);

chrome.devtools.network.onRequestFinished.addListener(function (netevent) {
    var request = netevent.request;
    if (/api.amplitude.com/.test(request.url)) {
        processRequest(request);
    }
});