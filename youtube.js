function showComments(onResult, onError) {
    _showComments(onResult, onError);
}

function _showComments(onResult, onError) {
    try {
        var section = document.getElementsByTagName('ytm-comments-entry-point-header-renderer')[0];
        var button = section.getElementsByTagName('button')[0];
        
        if (button.getAttribute('aria-expanded') !== "true") {
            button.click();
        }

        setTimeout(function() {
            window.scrollTo(0, 0);
            onResult();
        }, 50);
    } catch(e) {
        setTimeout(function() {
            _showComments(onResult, onError);
        }, 200);
    }
}

function maximizeComments(onResult, onError) {
    _maximizeComments(onResult, onError);
}

function _maximizeComments(onResult, onError) {
    try {
        var panel = document.getElementsByTagName('ytm-engagement-panel')[0];

        panel.style.top = 0 + 'px';

        onResult();
    } catch(e) {
        setTimeout(function() {
            _maximizeComments(onResult, onError);
        }, 200);
    }
}

function pauseVideo(onResult, onError) {
    _pauseVideo(onResult, onError)
}

function _pauseVideo(onResult, onError) {
    try {
        var video = document.getElementsByTagName('video')[0]

        if (!video.paused) {
            video.pause();

            setTimeout(function() {
                _pauseVideo(onResult, onError);
            }, 10);
        } else {
            onResult();
        }
    } catch (e) {
        setTimeout(function() {
            _pauseVideo(onResult, onError);
        }, 10);
    }
}
