/**
 * Created by summer on 2017/7/19.
 */
var webChat =avalon.define({
    $id:'chat',
    listchat:[],
    sendmsg:avalon.noop,
    changeSure:avalon.noop,
    contacts_id:'',
    status:'',
    chatid:'',
    listparsen:[],
    listcontent:[],
    mainchat:false,
    mainlist:true,
    listActive:[],
    idObj:{},
    spanchange:avalon.noop,
    chatList:avalon.noop,
    checklist:avalon.noop,
    admin_:'',
    ChatLogHistorical:'',
    deleteList:avalon.noop,
    linebutton:avalon.noop,
    linebuttonmessage:avalon.noop,
    sendmessage:avalon.noop,
    changeStatus:avalon.noop,
    chatListchange:avalon.noop,
    commonProblems:'',
    commonMsg:avalon.noop,
    common:true,
    bodyclose:avalon.noop,
    chatListjl:true,
    ChatLog:avalon.noop,
    ChatLogHistoricalParent:'',
    checklistchat:avalon.noop,
    timeList:{startTime:'',endTime:''},
    deleteTime:{startTime:'',endTime:''},
    BatchDelete:avalon.noop,
    deleteHistory:avalon.noop,
    deleteHistoryArray:[],
    webchatStutas:true,
    statusFunction:avalon.noop,
    stutasClass:false
});
webChat.admin_ = layui.data('adminId').adminid;
webChat.$watch('onReady',function(){
    webChat.chatList();
});
var etiger = {};
etiger.socket = {
    webSocket:"",
    init:function(){
        if (!window.WebSocket){
            console.log("你的浏览器不支持websocket，请升级到IE10以上浏览器，或者使用谷歌、火狐、360浏览器。");
        }
        //webSocket='';
        //$('#webchatCenter').click(function(){
            //webSocket = new WebSocket('ws://119.23.148.54:80/webchat/websocket/'+webChat.admin_+'/1');
            //webSocket = new WebSocket('ws://192.168.1.107:8081/webchat/websocket/'+webChat.admin_+'/1');
            webSocket = new WebSocket('ws://192.168.1.109:8081/webchat/websocket/'+webChat.admin_+'/1');
            //webSocket = new WebSocket('ws://localhost:80/webchat/websocket/1/1');
        //});
        webSocket.onerror = function(event) {
            console.log("websockt连接发生错误，请刷新页面重试!")
        };

        webSocket.onopen = function(event) {
            console.log('链接成功');
            //webSocket.send("_online_user_"+$('.chat-textarea textarea').val());
        };
        webSocket.onmessage = function(event) {
            debugger;
            var objdata = JSON.parse(event.data);
            var obj = objdata.chatRecord;
            obj.serviceId = objdata.serviceId;
            obj.agent_id = objdata.appId;
            obj.appId = objdata.appId;
            obj.side = objdata.side;
            obj.type = objdata.type;
            obj.userId = objdata.userId;
            obj.msg = objdata.msg;
            obj.send_time = new Date();
           if(obj.type == 4){//客服主动断开会话
               obj.type = 2;
               obj.msg='您已超过两分钟未进行提问，客服即将断开会话';
               obj.side = 1;
               var res=JSON.stringify(obj);
               etiger.socket.sendData(res);
               webChat.listcontent.push(obj);
               webChat.deleteList(obj.contacts_id);
           }else if(obj.type == 5){
                $.each(webChat.listActive,function(i,value){
                    if(value.contacts_id == obj.contacts_id){
                        if(obj.serviceId != webChat.admin_){
                            webChat.listActive.splice(i,1);
                        }
                    }
                })
           }else if (obj.type == 6){
               obj.type = 2;
               webChat.listcontent.push(obj);
               webChat.deleteList(obj.contacts_id);
           }else if(obj.type == 7){  /*被动接入用户*/
               if(webChat.listparsen.length == 0){
                   webChat.listparsen.push(obj);
               }else{
                   webChat.listparsen.forEach(function(index,value){
                       if(value.contacts_id != obj.contacts_id){
                           webChat.listparsen.push(obj);
                       }
                   })
               }
               webChat.contacts_id = obj.contacts_id;
           }
           else{
                webChat.listchat.push(obj);
                if(obj.type == 1 ){
                    webChat.mainchat = true;webChat.mainlist = false;
                    if(webChat.listActive.length == 0){
                        webChat.listActive.push(obj);
                    }else{
                       $.each(webChat.listActive,function(i,value){
                           if(value.contacts_id == obj.contacts_id){
                              return false;
                           }else{
                               webChat.listActive.push(obj);
                           }
                       })
                    }
                    $('#mainlist').addClass('active_header').siblings('span').removeClass('active_header');
                }else{
                    if(webChat.listchat.length == 0){
                        webChat.listparsen.push(obj);
                        webChat.listcontent.push(obj);
                        webChat.contacts_id = webChat.listparsen[webChat.listparsen.length -1].contacts_id;
                    }else{
                        if(webChat.listparsen.length == 0){
                            webChat.listparsen.push(obj);
                            webChat.listcontent.push(obj);
                            webChat.contacts_id = webChat.listparsen[webChat.listparsen.length-1].contacts_id;
                        }else{
                            $.each( webChat.listparsen,function(i,value){
                                if(value.contacts_id != obj.contacts_id){
                                    webChat.listparsen.push(obj);
                                }
                            });
                            $.each( webChat.listchat,function(i,value){
                                if(value.contacts_id == obj.contacts_id){
                                    webChat.listcontent.push(obj);
                                    $('#foucs').focus();$('#foucs').blur();$('.chat-textarea textarea').focus();
                                    return false;
                                }
                            })
                        }
                    }
                }
            }
        };
        webSocket.onclose = function(event){
            console.log(event);
            webSocket.close(); //关闭TCP连接
        };
    },
    send:function(data){
        this.waitForConnection(function () {//连接建立才能发送消息
            webSocket.send(data);
        }, 500);
    }
    ,
    sendData:function(data){
        this.waitForConnection(function () {
            webSocket.send(data);
            $('.chat-textarea textarea').val('');
            console.log(data)
        }, 500);
    },
    waitForConnection : function (callback, interval) {//判断连接是否建立
        if (webSocket.readyState === 1) {
            callback();
        } else {
            var that = this;
            setTimeout(function () {
                that.waitForConnection(callback, interval);
            }, interval);
        }
    }
};
$('#webchatCenter').click(function(){
    etiger.socket.init();
});
/*修改客服状态0离线1在线*/
webChat.changeServiceStatus = function(status){
    var obj={
        //serviceId:webChat.admin_,
        //appId:value.agent_id,
        //userId:value.contacts_id,
        //contacts_id:value.contacts_id,
        //send_time:new Date(),
        //side:'1',
        //chat_id:value.chat_id,
       // corp_id:value.corp_id,
        type:7,
        status:status,
        //msg:$('.chat-textarea textarea').val()
    };
    var res=JSON.stringify(obj);
    etiger.socket.sendData(res);
}
/*点击发送按钮*/
webChat.sendmessage = function(){
    if(!webChat.contacts_id){
        layer.alert('请选择需要发送的人员');
        return false;
    }
    $.each(webChat.listparsen,function(i,value){
        if(value.contacts_id == webChat.contacts_id){
            if(!$('.chat-textarea textarea').val()){layer.alert('请输入要发送的内容'); return false;}
            var obj={
                serviceId:webChat.admin_,
                appId:value.agent_id,
                userId:value.contacts_id,
                contacts_id:value.contacts_id,
                send_time:new Date(),
                side:'1',
                chat_id:value.chat_id,
                corp_id:value.corp_id,
                type:2,
                msg:$('.chat-textarea textarea').val()
            };
            var res=JSON.stringify(obj);
            etiger.socket.sendData(res);
            webChat.listcontent.push(obj);
            $('#foucs').focus();$('#foucs').blur();$('.chat-textarea textarea').focus();
            $('.chat-textarea textarea').val('');
        }
    });
};
/*点击接入按钮*/
webChat.linebutton = function(obj){
    $('#'+obj.contacts_id).children('i').removeClass('hidden').parent('button').siblings('button').children('i').addClass('hidden');
    webChat.idObj = obj;
    webChat.contacts_id = obj.contacts_id;
};
/*点击接入按钮*/
webChat.linebuttonmessage = function(){
        $('#mainchat').addClass('active_header').siblings('span').removeClass('active_header');
        webChat.listcontent = [];
        if(webChat.listActive.length == 0){layer.alert('没有需要接入的人员');return false};
        if(!webChat.idObj.contacts_id){layer.alert('请选择需要接入的人员');return false};
        var obj={
            serviceId:webChat.admin_,
            contacts_id:webChat.idObj.contacts_id,
            corp_id:webChat.idObj.corp_id,
            send_time : new Date(),
            appId:webChat.idObj.agent_id,
            agent_id:webChat.idObj.agent_id,
            chat_id:webChat.idObj.chat_id,
            userId:webChat.idObj.userId,
            side:'1',
            type:'1',
            msg:''
        };
        $.each(webChat.listActive,function(i,value){
            if(value.contacts_id == webChat.idObj.contacts_id){
                webChat.listActive.splice(i,1);
                return false;
            }
        });
        webChat.mainchat = false;webChat.mainlist = true;
        obj.msg = '客服'+obj.serviceId+'已准备为你服务';
        var res=JSON.stringify(obj);
        etiger.socket.sendData(res);
        webChat.listchat.push(obj);
        $.ajax({
            type:'post',
            url:'/webchat/chat/queryChatRecordByChatId',
            dataType:'json',
            data:{chat_id:webChat.idObj.chat_id},
            success:function(data){
                if(data.code == 100){
                    debugger;
                    if(data.info.admin_id == webChat.admin_){
                        if(webChat.listparsen.length == 0){
                            webChat.listparsen.push(obj);
                        }else{
                            $.each(webChat.listparsen,function(i,value){
                                if(value.contacts_id == webChat.idObj.contacts_id){
                                    return false;
                                }else{ webChat.listparsen.push(obj);}
                            });
                        }
                    }else{
                        layer.alert('该用户可能已被其他客服接入')
                    }
                }else{
                    layer.alert('请求数据失败！')
                }
            },
            error:function(){
                layer.alert('请求失败');
            }
        })
        webChat.contacts_id = webChat.listparsen[webChat.listparsen.length-1].contacts_id;
        $('.'+obj.chat_id).addClass('backlist').siblings('li').removeClass('backlist');
        $.each(webChat.listparsen,function(i,value){
            if(value.contacts_id == webChat.contacts_id){
                webChat.listcontent.push(obj);
                return false;
            }
        });
        webChat.idObj ={};
        return false;
};
/*获取历史聊天会话*/
webChat.chatList = function(){
    webChat.chatListjl = true;webChat.common = true;webChat.mainlist=true;webChat.mainchat= false;
    /*点击回车键发送按钮*/
    $(function(){
        $('#text_list').on('keydown', function(event) {
            if (event.keyCode == "13") {
                event.preventDefault();
                //回车执行查询
                webChat.sendmessage();
            }
        });
    })
    $.ajax({
        type:'post',
        url:'/webchat/chat/queryChatRecordByAdminId',
        dataType:'json',
        data:{admin_id:webChat.admin_,status:'1'},
        success:function(data){
            if(data.code == 100){
                webChat.listparsen = data.list;
            }else{
                layer.alert('请求数据失败！')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
};
/*点击查看详情*/
webChat.checklist = function(chatid,contacts_id,status){
    webChat.status = status;webChat.chatid = chatid;
    webChat.contacts_id = contacts_id;
    $('.'+chatid).addClass('backlist').siblings('li').removeClass('backlist');
    $.ajax({
        type:'post',
        url:'/webchat/chat/queryChatMessage',
        dataType:'json',
        data:{chat_id:chatid},
        success:function(data){
            if(data.code == 100){
                webChat.listcontent= data.list;
                $('#foucs').focus();$('#foucs').blur();$('.chat-textarea textarea').focus();
            }else{
                layer.alert('请求数据失败！')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
};
/*修改人员的状态*/
webChat.deleteList = function(contacts_id){
    if(webChat.contacts_id == contacts_id){
        webChat.contacts_id = '';webChat.listcontent = [];
        webChat.changeStatus(contacts_id);
    }else{
        webChat.changeStatus(contacts_id);
    }
};
/*遍历修改状态*/
webChat.changeStatus = function(contactsid){
    $.each( webChat.listparsen,function(i,value){
        if(value.contacts_id == contactsid){
            var objvalue = {
                serviceId: value.admin_id,
                appId: value.agent_id,
                userId:value.contacts_id,
                chat_id: value.chat_id,
                corp_id: value.corp_id,
                last_time: value.last_time,
                status: value.status,
                type:3,
                msg:'客服'+webChat.admin_+'已结束会话，欢迎下次使用'
            };
            webChat.listparsen.splice(i,1);
            var res=JSON.stringify(objvalue);
            etiger.socket.sendData(res);
            return false;
        }
    });
};
/*修改导航条*/
webChat.spanchange = function(id){
    $('#'+id).addClass('active_header').siblings('span').removeClass('active_header');
    if(id == 'mainchat' ){
        webChat.mainchat = false;webChat.mainlist = true;webChat.webchatStutas = true;
    }else if(id == 'mainStutas' ){
        webChat.webchatStutas = !webChat.webchatStutas;webChat.mainchat = false;webChat.mainlist = true;
    }else{
        webChat.webchatStutas =true;webChat.mainchat = true;webChat.mainlist = false;
    }
};
/*修改在线状态*/
webChat.statusFunction = function(stutas){
    webChat.webchatStutas = true;
    if(stutas == 0){
        webChat.stutasClass = true;
        webChat.changeServiceStatus(stutas);
    }else{
        webChat.stutasClass = false;
        webChat.changeServiceStatus(stutas);}
};
/*查看常用老问题*/
webChat.chatListchange = function(){
    $.ajax({
        type:'post',
        url:'/webchat/chat/queryCommonQuestion',
        dataType:'json',
        success:function(data){
            if(data.code == 100){
                webChat.commonProblems = data.list;
            }else{
                layer.alert('请求数据失败！')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
}
/*获取常用问题的msg*/
webChat.commonMsg = function(msg){
    webChat.common = true;
    $('.chat-textarea textarea').val(msg);
}
/*点击其他地方关闭常用问题*/
webChat.bodyclose = function(){
    if(!webChat.common){
        webChat.common = true;
    }
    //if(!webChat.chatListjl){
    //    webChat.chatListjl = true;
    //}
};
/*查看聊天记录*/
webChat.ChatLog = function(time_q,time_z){
    webChat.chatListjl = false;webChat.common = true;
    $.ajax({
        type:'post',
        url:'/webchat/chat/queryChatRecordByLast_time',
        dataType:'json',
        data:{admin_id:webChat.admin_,status:'2',time_q:time_q,time_z:time_z},
        success:function(data){
            debugger;
            if(data.code == 100){
                webChat.ChatLogHistoricalParent = data.list;
                if(data.list.length == 0){
                    webChat.ChatLogHistoricalParent = '';
                }
            }else{
                layer.alert('请求数据失败！')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
}
/*查询历史记录的聊天记录*/
webChat.checklistchat = function(chatid){
    $.ajax({
        type:'post',
        url:'/webchat/chat/queryChatMessage',
        dataType:'json',
        data:{chat_id:chatid},
        success:function(data){
            if(data.code == 100){
                webChat.ChatLogHistorical= data.list;
            }else{
                layer.alert('请求数据失败！')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
};
/*删除历史聊天记录*/
webChat.deleteHistory = function(chatId){
    $.ajax({
        type:'post',
        url:'/webchat/chat/deleteOneChat_Record',
        dataType:'json',
        data:{record_id:chatId},
        success:function(data){
            debugger;
            if(data.code == 100){
                layer.msg('删除成功',function(){
                    webChat.ChatLog (webChat.timeList.startTime,webChat.timeList.endTime);
                })
            }else{
                layer.alert('删除失败！')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
};
/*批量删除历史聊天记录*/
webChat.BatchDelete = function(){
    debugger;
    layer.confirm('确定要删除吗？',function(){
        $.ajax({
            type:'post',
            url:'/webchat/chat/deleteChat_Record',
            dataType:'json',
            data:{admin_id:webChat.admin_ ,status:'2',time_q:webChat.deleteTime.startTime,time_z:webChat.deleteTime.endTime},
            success:function(data){
                debugger;
                if(data.code == 100 || data.code == 777){
                    layer.msg('删除成功',function(){
                        webChat.ChatLog (webChat.timeList.startTime,webChat.timeList.endTime);
                    })
                }else{
                    layer.alert('删除失败！')
                }
            },
            error:function(){
                layer.alert('请求失败');
            }
        })
    })
};
///*表情包路径配置*/
//$(function(){
//    $('.emotion').qqFace({
//        id : 'facebox', //表情盒子的ID
//        assign:'saytext', //给那个控件赋值
//        path:'/../../static/images/face/'	//表情存放的路径
//    });
//    $(".sub_btn").click(function(){
//        var str = $("#saytext").val();
//        $("#show").html(replace_em(str));
//    });
//});
////查看结果
//function replace_em(str){
//    str = str.replace(/\</g,'&lt;');
//    str = str.replace(/\>/g,'&gt;');
//    str = str.replace(/\n/g,'<br/>');
//    str = str.replace(/\[em_([0-9]*)\]/g,'<img src="../../static/images/face/$1.gif" border="0" />');
//    return str;
//}