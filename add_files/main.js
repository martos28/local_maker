
//  Load modal form and show it
// Pressed button must have 2 attributes :
// modal_form_id & modal_content_url
function main_show_modal(button) 
{
    var modal_form_id = button.attr("modal_form_id");
    var modal_form_url = button.attr("modal_form_url");
 
    $(modal_form_id).find("modal-body").load(modal_form_url);
    $(modal_form_id).modal("show");
}

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}


$(window).load(function() {
    $('<div id="ajax-loader"></div>').appendTo($('body'));
    $("#ajax-loader").hide().css({
        "width": "50px",
        "height": "50px",
        "background-image": "url(/img/ajax-loader.gif)",
        "background-repeat": "no-repeat",
        "background-size": "contain"
    });
    $(document).ajaxStart(function () {
        $("#ajax-loader").center().show();
    });
    $(document).ajaxStop(function () {
        $("#ajax-loader").hide();
    });
});

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //              OTHER  FUNCTIONS
    function find_in_array(array, value) {
        for(var i=0; i<array.length; i++)
            if (array[i] == value) {return i;}

        return -1;
    }


    function basename(path) {
        if(path.indexOf('\\') != -1)
            parts = path.split( '\\' );
        else
            parts = path.split( '/' );

        return parts[parts.length-1];
    }


    function formatDate(formatDate, formatString) {
        var yyyy = formatDate.getFullYear();
        var yy = yyyy.toString().substring(2);
        var m = formatDate.getMonth() + 1;
        var mm = m < 10 ? "0" + m : m;
        var d = formatDate.getDate();
        var dd = d < 10 ? "0" + d : d;

        var h = formatDate.getHours();
        var hh = h < 10 ? "0" + h : h;
        var n = formatDate.getMinutes();
        var nn = n < 10 ? "0" + n : n;
        var s = formatDate.getSeconds();
        var ss = s < 10 ? "0" + s : s;

        formatString = formatString.replace(/yyyy/i, yyyy);
        formatString = formatString.replace(/yy/i, yy);
        formatString = formatString.replace(/mm/i, mm);
        formatString = formatString.replace(/m/i, m);
        formatString = formatString.replace(/dd/i, dd);
        formatString = formatString.replace(/d/i, d);
        formatString = formatString.replace(/hh/i, hh);
        formatString = formatString.replace(/h/i, h);
        formatString = formatString.replace(/nn/i, nn);
        formatString = formatString.replace(/n/i, n);
        formatString = formatString.replace(/ss/i, ss);
        formatString = formatString.replace(/s/i, s);

        return formatString;
    }


    function number_format(number) {
        if(number==undefined || isNaN(number))
            return '';

        return number.replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g,"\$1" +" ");
    }



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //              COMMON  FUNCTIONS
    function addBookmark(params) {
        var url = params.url;
        var link = params.link;
        var user_id = params.user_id;
        var trans_id = params.trans_id;
        var message = params.message;

        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            data: "model_name=Bookmark&Bookmark[user_id]=" +user_id + "&Bookmark[trans_id]=" +trans_id,
            error: function(a,b,c) { alert(b); },
            success: function(data) {
                if (data.result == "ok" || data == "ok") {
                    link.hide();
                    refreshTopLink($("#bm_count_link"));
                    alert(message);
                }
                else {
                    alert(data.message);
                }
            }
        });
    }

    function deleteBookmark(params) {
        var url = params.url;
        var user_id = params.user_id;
        var trans_id = params.trans_id;
        var pjax_selector = (params.pjax_selector === undefined) ? false : params.pjax_selector;

        $.ajax({
            url: url,
            type: "post",
            dataType: "html",
            data: {user_id: user_id, trans_id: trans_id},
            error: function(a,b,c) { alert(b); },
            success: function(response) {
                if (response == "ok") {
                    refreshTopLink($("#bm_count_link"), -1);
                    if (pjax_selector)
                        $.pjax.reload(pjax_selector);
                }
                else {
                    alert(response);
                }
            }
        });
    }

    // Обновляем ссылки Закладки (12) или Список (8) в Топ-меню
    function refreshTopLink(link, step) {
        if (step == undefined)
            step = 1;

        var count = link.attr("data-count");
        var new_count = parseInt(count) +step;
        var new_text = link.text().replace("(" +count +")", "(" +new_count +")");
        link.text(new_text);
        link.attr("data-count", new_count);
        return true;
    }