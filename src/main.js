/**
 * Created by summer on 2017/4/7.
 */
require('./static/font/iconfont.css');
require('./static/css/console.css')
require('bootstrap/css/bootstrap.css');
require('./static/css/style.css');
require('bootstrap/js/bootstrap.js');
require('avalonbootstrap/avalonbootstrap.js');
require('avalon2');
require('mmRouter');
require('reAjax');
require('./static/js/glylb.js');
require('./static/js/qygl.js');
require('./static/js/txl.js');
require('./static/js/ggfb.js');
require('./static/js/yygl.js');
require('./static/js/webChat.js');
require('./static/js/jqrltjl.js');
require('./static/js/swrytxl.js');
require('./static/js/auth_index.js');
require('./static/lib/vui-avalon/autocomplete/vui.autocomplete');

var a = require("./tpl/qygl/qygl.html");
var b = require("./tpl/glylb/glylb.html");
var c = require("./tpl/txl/txl.html");
var d = require("./tpl/ggfb/ggfb.html");
var e = require("./tpl/yygl/yygl.html");
var g = require("./tpl/webChat/webChat.html");
var h = require("./tpl/jqrltjl/jqrltjl.html");
var i = require("./tpl/swrytxl/swrytxl.html");
var f = require("./tpl/auth/auth_index.html");
var map = {
    'qygl' :a,
    'glylb' : b,
    'txl' :c,
    'ggfb' :d,
    'yygl' :e,
    'webChat':g,
    'jqrltjl':h,
    'swrytxl':i,
    'qxgl':f
};
window.router = avalon.define({
    $id: 'test',
    main:''
});
avalon.router.add("/:tab", function (param) {
    // setTimeout(function(){
        router.main = map[param];
    // },200)
        if(param == 'qygl'){avalon.vmodels['tjqyh'].cxqyhFunction(1, true);}else if(param == 'glylb'){avalon.vmodels['glylb'].list();
        }else if(param == 'yygl'){avalon.vmodels['yygl'].queryYyglList(1, true);
        }else if(param == 'txl'){
            avalon.vmodels['txl'].onload();
            avalon.vmodels['txl'].listxiang('',1,true);
        }else if(param == 'ggfb'){
            avalon.vmodels['ggfb'].listxiang(1,true);
            avalon.vmodels['ggfb'].listmeau('',1,true);
            UE.delEditor('editor123');
            UE.getEditor('editor123',{
                isShow: true,
                focus: false,
                enableAutoSave: false,
                autoSyncData: false,
                autoFloatEnabled:false,
                wordCount: true,
                sourceEditor: null,
                scaleEnabled:true,
                initialFrameWidth:'99%',
                initialFrameHeight:225,
                toolbars: [
                    ['source','|', 'bold',  'italic', 'underline','fontfamily','fontsize','forecolor','backcolor','|','insertorderedlist', 'insertunorderedlist','justifyleft', 'justifyright',
                        'justifycenter', 'justifyjustify','|','link', 'unlink','|', 'simpleupload','insertimage','imagecenter','edittip ', 'wordimage','attachment',  'insertvideo','|','help']
                ]
            });
        }else if(param == 'webChat'){
            avalon.vmodels['chat'].chatList();
        }else if(param == 'messageList'){
            avalon.vmodels['messageList'].webchatList();
            avalon.vmodels['messageList'].listmeau('',1,true);
        }
});
avalon.history.start({
    root: "/mmRouter",
    hashPrefix: ""
});
var hash = location.hash.replace(/#!?/, '');
//avalon.router.navigate(hash || '/qygl', 2)//默认打开
avalon.scan(document.body);
/*
* index左边菜单的获取
* */
var layer;
layui.use(['layer','laydate'], function(){
    layer= layui.layer;
    var laydate = layui.laydate;
});
var indexMeun = avalon.define({
    $id:'menu',
    caidan:'',
    cursor:'hand',
    objWidth:{width:'15%'},
    objWidthtwo:{width:'85%',left:'15%'},
    objWidthtree:{fontSize:'35px'},
    objWidthback:{background:'#263240'},
    objWidthborder0:{borderTop:'2px solid #3A4451'},
    toggle:true,
    hoverClass:"loginbutton",
    loginname:'',
    chasl:avalon.noop,
    loginOut:avalon.noop,
    indexchangepwd:avalon.noop,
    dj:avalon.noop,
    new_psw:'',
    old_psw:'',
    reload:avalon.noop,
    caidanfunction:function(){//获取菜单
            $.ajax({
                type:'get',
                url:'/webchat/menu/getMenuList',
                dataType:'json',
                success:function(data){
                    indexMeun.caidan = data.list;
                    if(data.code == 999 || data.code == 888){
                        window.location.href = '/login.html';
                    }
                },
                error:function(){
                    layer.alert('请求出错！')
                }
            })
    }
});
indexMeun.$watch('onReady',function(){
    indexMeun.caidanfunction();
})
indexMeun.chasl = function(){
    indexMeun.toggle = ! indexMeun.toggle;
}
var localName = layui.data('name');
indexMeun.loginname= localName.name;
var adminid_ = layui.data('adminId').adminid;
/*退出登录*/
indexMeun.loginOut = function(){
    $.ajax({
        type:'get',
        url:'/webchat/logout',
        dataType:'json',
        success:function(data){
           if(data.code == 100){
               window.location.href='/login.html';
           }
        },
        error:function(){
            layer.alert('请求出错！')
        }
    })
}
indexMeun.indexchangepwd = function(){
    //管理员列表-修改密码
    var reg = /^([A-Za-z0-9_-]{6,14})$/;
    if(indexMeun.old_psw==""){
        layer.tips("密码不能为空","#old_psw",{
            tips:[1,'#c00']
        });
        return false;
    }
    if(indexMeun.new_psw==""){
        layer.tips("新密码不能为空","#new_psw",{
            tips:[1,'#c00']
        });
        return false;
    }
    if(!reg.test(indexMeun.new_psw)){
        layer.tips("密码由6到14位字母数字下划线","#new_psw",{
            tips:[1,'#c00']
        });
        return false;
    }
    $.ajax({
        type:'post',
        url:'/webchat/admin/update',
        dataType:'json',
        data:{admin_id:adminid_,pwd:indexMeun.old_psw,newPwd:indexMeun.new_psw},
        success:function(data){
            if(data.code == 100){
                layer.msg('修改成功',function(){
                    $('#indextjqyh_').modal('hide');
                    indexMeun.old_psw ='';indexMeun.new_psw='';
                });
            }else if(data.code == 777){
                layer.tips("旧密码与原密码不一致","#old_psw",{
                    tips:[1,'#c00']
                });
                return false;
            }else{
                layer.alert('修改失败！')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
}
indexMeun.reload = function(){
    location.reload();
}
