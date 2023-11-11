var list1 = function() {}
var list2 = function() {}
var list3_2012 = function() {}
var list3_2012_wz = function() {}
var content1 = function() {
    var a = '<script type="text/javascript" src="//wa.beiyueda.com/site/id/common/v/a/production/l-mslm.js"></script>';
    document.write(a);
}
var PUB = {
    tipHtml: function(contTxt) {
        var tip = document.querySelector('.TipLayer')
        // remove history tip
        if (tip != null) {
            document.body.removeChild(tip)
        }

        var div = document.createElement('div')
        div.className = 'TipLayer'
        div.innerText = contTxt
        document.body.appendChild(div)
        var dWidth = div.clientWidth
        div.style.left = window.innerWidth / 2 - dWidth / 2 + 'px'

        div.classList.add('tip-move')
    },
    Ajax: function(options) {
        var defaults = {
            type: 'post',
            data: '',
            dataType: 'json',
            before: function() {}
        }
        var opts = Object.assign({}, defaults, options)
        var rndstr =
            (opts.url.indexOf('?') == -1 ? '?' : '&') + '_rnd=' + Math.random()
        PUB.rename(opts.url + rndstr, {
            data: options.data,
            success: options.success,
            error: options.error
        })
    },
    rename: function(url, obj) {
        var xhr
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest()
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP')
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    obj.success(xhr.responseText)
                } else {
                    if (obj.error) obj.error('请求失败！')
                }
            }
        }

        xhr.open('POST', url, true)
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
        xhr.send(obj.data)
    }
}

function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)))
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)))
}


$(function() {
    // head nav
    $('.u-hdnav').click(function() {
        $('.m-chd').toggleClass('f-hide')
    })
    // footer nav
    $('.u-serch-side').click(function() {
        $('.u-class-list').toggle()
    })

    // search selected
    $('.u-class-list li').click(function() {
        $('.u-serch-class').text($(this).text())
        $(".u-nsid").val($(this).data('uclassid'))
    })

    // tx tab
    $('.m-page-tx-tabmenu span').click(function() {
        $(this)
            .addClass('active')
            .siblings()
            .removeClass('active')
        var dom = $(
            $(this)
            .parent()
            .attr('bind-to')
        )
        var class1 = $(this)
            .parent()
            .attr('tab1')
        var class2 = $(this)
            .parent()
            .attr('tab2')
        dom.toggleClass(class1).toggleClass(class2)
    })

    // qm wm index
    $('.u-list-button').click(function() {
        $(this)
            .toggleClass('on')
            .siblings()
            .toggleClass('on')
        $('.m-jx-list').toggleClass('f-hide')
        $('.m-class-list').toggleClass('f-hide')
    })

    // index toggle
    $('.navButton li').click(function() {
        $(this)
            .addClass('on')
            .siblings()
            .removeClass('on')
        $($(this).data('id'))
            .removeClass('f-hide')
            .siblings()
            .addClass('f-hide')
    })

    var item = $('.u-cont-num')
    var u = 'https://www.woyaogexing.com'
    if (item.length) {
        // 内容页数据初始化
        var id = item.data('id')
        var classid = item.data('classid')
        var num = 0
        if (id && classid) {
            $.post(u + '/ajax/infoDetail/', {
                token: utf8_to_b64(classid + ':' + id)
            }).done(function(res) {
                var res = JSON.parse(res)
                if (res.code) {
                    var data = res.data
                    var o = 'id' + id
                    num = data[o]['likeNum']
                    item.find('label')[0].innerHTML = data[o]['likeNum']
                    item.find('label')[1].innerHTML = data[o]['favoriteNum']
                }
            })
        }
