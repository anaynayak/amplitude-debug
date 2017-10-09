var events = $('#events');
var contentElement = $(".context");
var keywordElement = $("#keyword");

function processRequest(data) {
    var event = $.deparam(decodeURIComponent(data));
    var jsonEle = renderjson.set_icons('+', '-')
        .set_show_to_level("all")(JSON.parse(decodeURIComponent(event.e)));
    events.append(jsonEle);
    $(jsonEle).find("span.key:contains('event_type')").addClass('event_type');
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

function jumpTo(element) {
    var position = element.offset().top - 50;
    window.scrollTo(0, position);
}

var mark = function () {
    var key = keywordElement.val();
    var options = {
        wildcards: "enabled",
        debug: true,
        diacritics: false,
        done: function () {
            jumpTo(contentElement.find("mark"));
        }
    };
    contentElement.unmark({
        done: function () {
            contentElement.mark(key, options);

        }
    });
};

keywordElement.on("input", mark);
