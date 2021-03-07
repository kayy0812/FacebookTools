const { FB, FacebookApiException } = require('fb');
const consolelog = require('./consolelog');
var post_id = [];

var __functions = {
    sendLog: function() {
        FB.api('me', { fields: 'name,id' }, function(res) {
            res_respone(res);
            consolelog.write('> Đã đăng nhập vơi tư cách ' + res.name + ' | UID: ' + res.id);
        });
    },
    LikeAllPostInID: function(uid, limit = 100) {
        FB.api('', 'post', {
            batch: [
                { method: 'get', relative_url: uid + '/posts?limit=' + (limit + 1)}
            ]
        }, function(res) {
            res_respone(res);
            var count_array = 0;
            var count_post = 0;
            var array_posts = JSON.parse(res[0].body).data;
            array_posts.forEach(function(item, index) {
                post_id.push(item);
                count_array = count_array + 1;
            });
            let addLike = setInterval(function() {
                if (count_post >= count_array) {
                    count_post = 0;
                    consolelog.write('✔ - Tổng cộng ' + count_array + ' bài viết');
                    clear(addLike);
                } else {
                    addLikeForPostId(post_id[count_post].id);
                    count_post = count_post + 1;
                }
            }, 1000);
        });
    }
}

module.exports = __functions;

function addLikeForPostId(post_id) {
    if (!post_id) return;
    FB.api('', 'post', {
        batch: [
            { method: 'post', relative_url: post_id + '/likes' },
            { method: 'get', relative_url: post_id.split('_')[0] }
        ]
    }, function(res) {
        res_respone(res);
        var liked = JSON.parse(res[0].body).success = 'true' ? 'Đã thích!' : 'Lỗi!';
        var name = JSON.parse(res[1].body).name;
        var id = JSON.parse(res[1].body).id;
        //console.log(JSON.parse(res[1].body));
        consolelog.write('@' + post_id + ' (' + name + ' [' + id + ']) - ' + liked);
    });
}

function addCommentForPostId(post_id, message = 'Hello!') {
    if (!post_id || !message) return;
    FB.api('', 'post', {
        batch: [
            { method: 'post', relative_url: post_id + '/comments?message=' + message },
            { method: 'get', relative_url: post_id.split('_')[0] },
        ]
    }, function(res) {
        res_respone(res);
        //var cmt_reponse = JSON.parse(res[0].body).success = 'true' ? 'Đã bình luận!' : 'Lỗi!';
        var name = JSON.parse(res[1].body).name;
        console.log(post_id, ' (', name, ') -  Đã bình luận');
    });
}

function res_respone(res) {
    if (!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
}

function clear(interval) {
    clearInterval(interval);

}