/**
 * Created by summer on 2017/5/31.
 */
var login = avalon.define({
    $id: 'dologin',
    name:'',
    password:'',
    deloginFunction:avalon.noop
});
/*
 * 点击登录按钮
 * */
var layer;
layui.use('layer', function(){
    layer= layui.layer;
});

login.deloginFunction = function(){
    //debugger;
    //var reg=/^[1-9]\d{10}$/;
    //if(qygl.name==""){
    //    alert("用戶名不能爲空");
    //    return false;
    //}
    ////税务人员代码必须为11位数字,不能以0开头
    //if(!reg.test(qygl.name)){
    //   alert("请输入11位税务人员代码");
    //   return false;
    // }
    $.ajax({
        url:"/webchat/doLogin",
        type:"post",
        dataType:"json",
        data:{"userName":login.name,"password": login.password},
        beforeSend: function(){
            $("#bottom").html('登录中...');
        },
        success:function(data){
            if(data.code==100){
                layui.data('test', {
                     key: 'corpId'
                    ,value: data.info.corp_id
                });
                layui.data('name', {
                    key: 'name'
                    ,value: login.name
                });
                layui.data('adminId', {
                    key: 'adminid'
                    ,value: data.info.admin_id
                });
                var localTest = layui.data('test');
                window.location.href='/#/txl';
            }else if(data.code==999) {//用户名错误
                $("#bottom").html('登录');
                layer.alert("用户名或密码错误");
            }
        },
        error:function(){
            $("#bottom").html('登录');
            layer.alert("登录异常");
        }
    });
    return false;
};
