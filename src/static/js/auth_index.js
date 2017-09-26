/**
 * Created by summer on 2017/6/7.
 */
var auth_index = avalon.define({
    $id:'auth_index',
    queryOneAuth:avalon.noop,
    queryOneAuthList:[]
});
auth_index.$watch('onReady',function(){
    auth_index.queryOneAuth();
});
auth_index.queryOneAuth = function(){
    $.ajax({
        type:'post',
        url:'/webchat/auth/queryOneAuth',
        dataType:'json',
        success:function(data){
            if(data.code == 100){
                debugger;
                auth_index.queryOneAuthList=data.rows;
            }else{
                layer.alert('查询失败',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
};