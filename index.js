var module = (function() {
    const webjs = require("webjs-helper")

    var _id = "", _dir_path = "", _handlers = [];
    var _video_id = "";
    var _web_loaded = false;
    var _comments_visible = false;

    function _show_comments() {
        return new Promise(function(resolve, reject) {
            webjs.call("showComments")
                .then(function() {
                    return webjs.call("maximizeComments")
                })
                .then(function() {
                    resolve();
                })
                .catch(function() {
                    reject();
                });

            _comments_visible = true;
        });
    }

    function _on_web_loaded(data) {
        if (data["url"].startsWith("https://m.youtube.com/watch?")) {
            webjs.import(_dir_path + "/youtube.js");
            webjs.call("pauseVideo");

            if (_comments_visible) {
                _show_comments();
            }

            _handlers.forEach(function(handler) {
                handler();
            });

            _web_loaded = true, _handlers = [];
        }
    }

    return {
        initialize: function(id, video_id) {
            var web_prefix = id.replace(".", "_");
            var dir_path = this.__ENV__["dir-path"];

            global[web_prefix + "__on_web_loaded"] = function (data) {
                _on_web_loaded(data);
            }

            webjs.initialize(id + ".web", "__$_bridge");
            view.object(id).action("load", { 
                "filename": dir_path + "/web.sbml",
                "dir-path": dir_path,
                "web-id": id, 
                "web-prefix": web_prefix,
                "video-id": video_id
            });

            _id = id, _dir_path = dir_path;
            _video_id = video_id;

            return this;
        },

        get_video_id: function() {
            return _video_id;
        },

        show_comments: function() {
            return new Promise(function(resolve, reject) {
                var handler = function() {
                    _show_comments()
                        .then(function() {
                            resolve();
                        })
                        .catch(function() {
                            reject();
                        });
                }
                
                _web_loaded ? handler() : _handlers.push(handler);
            });
        },
    }
})();

__MODULE__ = module;
