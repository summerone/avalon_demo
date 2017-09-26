/**
 * Created by summer on 2017/8/3.
 */
var messageList =avalon.define({
    $id:'messageList',
    webchatList:avalon.noop,
    menulist:'',
    listmeau:avalon.noop,
    meunclick:avalon.noop,
    objtrue:false,
    objtrueList:true,
    objWidth:{width:'62%'},
    clcose:avalon.noop,
    menulistchat:'',
    onlyOneList:'',
    contacts_id:'',
    agentId:""
});
var corpId = layui.data('test').corpId;
messageList.$watch('onReady',function(){
    messageList.webchatList();
    messageList.listmeau('',1,true);
});
/*查询那些企业*/
messageList.webchatList = function(){
    $.ajax({
        type:'post',
        url:'/webchat/app/queryList',
        dataType:'json',
        data:{corp_id:corpId},
        success:function(data){
            if(data.code == 100){
                messageList.menulist = data.list;
            }else{
                layer.alert('获取菜单失败！',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
}
/*获取单个聊天记录下的全部记录*/
messageList.listmeau = function(agentId,currentPage, flg){
    messageList.clcose();
   messageList.agentId = agentId;
    if(!agentId){
        $('#allList').addClass('color_blue backfff').parent('li').siblings('li').children('p').removeClass('color_blue backfff');
    }else{
        $('#'+agentId).addClass('color_blue backfff').parent('li').siblings('li').children('p').removeClass('color_blue backfff');
    }
    $.ajax({
        type:'post',
        url:'/webchat/robot/queryRobotRecordByTime',
        dataType:'json',
        data:{agent_id:agentId,status:2,rows:20,page:currentPage},
        success:function(data){
            if(data.code == 100){
                messageList.menulistchat = data.list;
                if(messageList.menulistchat.length == 0){
                    layer.msg('暂无聊天记录');
                }
                if(flg){//分页只初始化一次
                    messageList.paging(data.total);
                }
            }else{
                layer.alert('获取聊天记录失败！',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
}
/*查看单个人的聊天记录*/
messageList.meunclick = function(chatId,contacts_id){
   messageList.objtrue = true; messageList.objtrueList = false;messageList.contacts_id = contacts_id;
    $.ajax({
        type:'post',
        url:'/webchat/robot/queryRobotByChat_id',
        dataType:'json',
        data:{chat_id:chatId},
        success:function(data){
            if(data.code == 100){
                messageList.onlyOneList = data.list;
            }else{
                layer.alert('获取信息失败！',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
};
/*关闭单个聊天记录*/
messageList.clcose = function(){
    messageList.objtrue = false; messageList.objtrueList = true;
};
messageList.paging = function(total){
    layui.use(['laypage', 'layer'], function(){
        var laypage = layui.laypage
            ,layer = layui.layer;
        laypage({
            cont: $("#pageList")
            ,pages : total % 20 > 0 ? (total / 20) + 1 : total / 20
            ,skin: '#1E9FFF'
            ,skip : true
            ,groups : 3,
            jump:function(obj,first){
                if(!first){
                    messageList.listmeau(messageList.agentId,obj.curr,false);
                }
            }
        });
    });
}
