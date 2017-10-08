var events = $('#events');

function processRequest(data) {
    var event = $.deparam(decodeURIComponent(data));
    var jsonEle = renderjson.set_icons('+', '-')
        .set_show_to_level("all")(JSON.parse(decodeURIComponent(event.e)));

    document.getElementById("events").appendChild(jsonEle);
}

function clearView() {
    events.empty();
}

$('#clear').off().on('click', clearView);

function requestFinishedListener(netevent) {
    var request = netevent.request;
    if (/api.amplitude.com/.test(request.url)) {
        processRequest(request.postData.text);
    }
}

if (chrome.devtools) {
    chrome.devtools.network.onRequestFinished.addListener(requestFinishedListener);
} else {
    $.getJSON('test.json', function (data) {
        processRequest("e=" + encodeURIComponent(JSON.stringify(data)))
    })
}