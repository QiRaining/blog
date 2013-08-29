/**
 * Created with JetBrains WebStorm.
 * User: youxiachai
 * Date: 13-4-6
 * Time: ����11:04
 * @param {Object} opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 * To change this template use File | Settings | File Templates.
 */


jQuery.fn.menuIndex = function (opts) {

    opts = jQuery.extend({
        content: "#post",
        ulClass: "nav nav-list affix",
        h1Class: "",
        h2Class: "",
        h3Class: "offset1",
        h4Class: "offset2"
    }, opts || {});

    var h2 = [], h3 = [], h4 = [] ,tmpl = '<ul class="'+ opts.ulClass+ '">', h2index = 0,h3index = 0;
    $.each($('h2,h3,h4', $(opts.content)), function (index, item) {
        if (item.tagName.toLowerCase() == 'h2') {
            var h2item = {};
            h2item.name = $(item).text();
            h2item.id =  'menuIndex'+index;
            h2.push(h2item);
            h2index++;
            console.log("h2-->" + index);
        } else if  (item.tagName.toLowerCase() == 'h3'){
            var h3item = {};
            h3item.name = $(item).text();
            h3item.id = 'menuIndex'+index;
            if (!h3[h2index - 1]) {
                h3[h2index - 1] = [];
            }
            h3[h2index - 1].push(h3item);
            h3index ++ ;
            console.log("h3-->" + index);
        }
        else if (item.tagName.toLowerCase() == 'h4') 
        {
            var h4item = {};
            h4item.name = $(item).text();
            h4item.id =  'menuIndex'+index;
           if (!h4[h3index - 1]) {
                h4[h3index - 1] = [];
            }
            h4[h3index - 1].push(h4item);
        }

        item.id = 'menuIndex'+index;
    });

    //���h1 ����ӱ���
  //  tmpl += '<li class="active"><a href="#" data-top="0">' + $('h1').text() + '</a></li>';
    for (var i = 0; i < h2.length; i++) {
        tmpl += '<li class="'+opts.h2Class+'"><a href="'+'#' + h2[i].id + '"   >' + h2[i].name + '</a></li>';
        if (h3[i]) {
            for (var j = 0; j < h3[i].length; j++) {
                tmpl += '<li class="'+opts.h3Class+'"><a href="'+'#' + h3[i][j].id + '"   >' + h3[i][j].name + '</a></li>';
                if (h4[j]) {
                    for (var z = 0; z < h3[j].length; z++) {
                     tmpl += '<li class="'+opts.h3Class+'"><a href="'+'#' + h4[j][z].id + '"   >' + h4[j][z].name + '</a></li>';
                    };
                };
            }
        }
    }

    tmpl += '</ul>';
    jQuery(this).append(tmpl);
//
    return this;
}

