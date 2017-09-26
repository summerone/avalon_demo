/**
 * Created by summer on 2017/6/6.
 */
var ggfb = avalon.define({
    $id:'ggfb',
    allchecked: false,
    checkedAll:avalon.noop,
    checkOne:avalon.noop,
    chakanneun:avalon.noop,
    meunback:avalon.noop,
    add:false,
    addhidden:true,
    addnews:avalon.noop,
    listmeaus:'',
    listmeausobj:'',
    listmeau:avalon.noop,
    menulist:'',
    menufunction:avalon.noop,
    appId:'',
    nextmsg:'',
    xq:avalon.noop,
    nextfunction:avalon.noop,
    total:'',
    wfb:'',
    yfb:'',
    zf:'',
    cheack:[],
    deletegg:avalon.noop,
    buttonzt:true,
    listone:'',
    listyyfw:avalon.noop,
    fzqy:avalon.noop,
    treelist:[],
    xztree:avalon.noop,
    deletexz:avalon.noop,
    listxiang:avalon.noop,
    listse:'',
    xzyy:'',
    appname:'',
    xxyyfunction:avalon.noop,
    groupids:'',
    bt:'',
    zy:'',
    date:new Date,
    meassge:avalon.noop,
    content_ueditor:'',
    loginName:'',
    content_type:'',
    lookyl:avalon.noop,
    xzsj:avalon.noop,
    dstime:'',
    appid:'',
    tjxq:true,
    tjxqfunction:avalon.noop,
    msgid:'',
    tjxqlook:avalon.noop,
    lisyd:'',
    tjxqfunc:avalon.noop,
    chakanblooer:true,
    chakanlist:false,
    chakantwo:true,
    chakanone:false,
    htmlone:'全选',
    htmltwo:'全选',
    deletexq:avalon.noop,
    qychoose:[],
    qychoosestring:"",
    appidd:'',
    sureqyhao:avalon.noop,
    sendAll:'',
    ydactive:false,
    wdactive:false,
    cwactive:false,
    zcsendMessge:[],
    zcsendString:'',
    aginmeassge:avalon.noop,
    zcfsgg:avalon.noop,
    agentid:'',
    zcfsone:avalon.noop,
    readstatus:'',
    libs:'',
    treelist_fz:[],
    group_ids:[],
    xzclass:'',
    nsrsbh:'',
    nsrmc:'',
    rkrqq:'',
    rkrqz:'',
    zzsq:'',
    zzsz:'',
    sdsq:'',
    sdsz:'',
    ybnsr:'',
    djzclxmc:'',
    hymc:'',
    validate_input_sx:avalon.noop,
    ueditor:avalon.noop,
    bjmessge:avalon.noop,
    dtfs:avalon.noop,
    meassgecaogao:avalon.noop,
    sendmaessge:avalon.noop,
    chekedALLdjxh:avalon.noop,
    chekedDxdjxh:avalon.noop,
    dsfsmeassge:avalon.noop,
    tjxqfuncclise:avalon.noop,
    zkcklxrhtml:avalon.noop,
    zkcklxrhtmlinnerblooer:true,
    zkcklxrhtmlinnerhtml:'展开查看联系人',
    choosesx:false,
    myFunction:avalon.noop,
    myFunction_djzclx:avalon.noop,
    selectValue:avalon.noop,
    selectValue_djzclx:avalon.noop,
    sshymcList:[],
    djzclxmcList:[],
    dropdown_menu_no:avalon.noop,
    choosebloor:false,
    choosemeun:true,
    bodyclose:avalon.noop,
    choosebloor_yxry:false,
    choosemeun_yxry:true,
    bj_lx:avalon.noop,
    datalist:{},
    exportExcel:avalon.noop,
    app_name:'',
    sxfs_fun:avalon.noop
});
avalon.scan(document.body);
/*
 *页面初始化数据
 * */
var localTest = layui.data('test');
var corpId = localTest.corpId;
var localName = layui.data('name');
ggfb.loginName = localName.name;
ggfb.$watch('onReady',function(){
    ggfb.listyyfw();
    ggfb.listmeau('',1,true);
    ggfb.menufunction();
    layui.use('laydate', function() {
        var laydate = layui.laydate;
    });
    ggfb.listxiang(1,true);
});
ggfb.ueditor = function(){
    window.uploadEditor = UE.getEditor('editor123',{
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
}
/*预览公告*/
ggfb.lookyl = function(){
    ggfb.buttonzt = !ggfb.buttonzt;
    ggfb.content_type =UE.getEditor('editor123').getContent();
    if(ggfb.content_type.length == 0){
        layer.msg('未添加公告内容');
    }
}
/*展开查看联系人*/
ggfb.zkcklxrhtml = function(id){
    ggfb.zkcklxrhtmlinnerblooer =!ggfb.zkcklxrhtmlinnerblooer;
    ggfb.zkcklxrhtmlinnerblooer == true?($('#'+id).html('展开查看联系人')):($('#'+id).html('收起联系人'));
};
/*统计详情关闭*/
ggfb.tjxqfuncclise = function(){
    ggfb.tjxq = !ggfb.tjxq;
    ggfb.ydactive = false;
    ggfb.wdactive = false;
    ggfb.cwactive = false;
    ggfb.zcsendMessge=[];
}
/*统计详情*/
ggfb.tjxqfunction = function(readstatus,obj){
    ggfb.readstatus = readstatus;
    ggfb.libs = obj;
    ggfb.tjxq = !ggfb.tjxq;
    ggfb.ydactive = false;
    ggfb.wdactive = false;
    ggfb.cwactive = false;
    ggfb.zcsendMessge=[];
    $('.tjxq_header_checkbox').prop('checked','');
    ggfb.htmltwo='全选';
    if(obj == 'ydactive'){
        ggfb.ydactive = !ggfb.ydactive;
    }else if(obj == 'wdactive'){
        ggfb.wdactive = !ggfb.wdactive;
    }else if(obj == 'cwactive'){
        ggfb.cwactive = !ggfb.cwactive;
    }
    ggfb.tjxqfunc(ggfb.readstatus,ggfb.libs,1, true);
}
/*统计详情请求*/
ggfb.tjxqfunc = function(status,objs,currentPage, flg){
    ggfb.readstatus = status;ggfb.zcsendMessge=[];$('.tjxq_header_checkbox').prop('checked','');ggfb.htmltwo = '全选';
    ggfb.libs = objs;
    if(objs == 'ydactive'){
        ggfb.ydactive = true;ggfb.wdactive = false; ggfb.cwactive =false;
    }else if(objs == 'wdactive'){
        ggfb.wdactive = true; ggfb.ydactive = false; ggfb.cwactive =false;
    }else if(objs == 'cwactive'){
        ggfb.cwactive =true; ggfb.wdactive = false; ggfb.ydactive = false;
        ggfb.lisyd=[];
        return false;
    }
    ggfb.datalist.rows = 4;
    ggfb.datalist.page = currentPage;
    ggfb.datalist.flg = flg;
    $.ajax({
        type:'post',
        url:'/webchat/message/readDetails',
        dataType:'json',
        data:{msg_id:ggfb.msgid,read_status:status,rows:ggfb.datalist.rows,page:ggfb.datalist.page},
        success:function(data){
            if(data.code == 100){
                ggfb.lisyd=data.list;
                if(ggfb.lisyd.length== 0){
                    layer.msg('没有数据');
                }
                if(flg){//分页只初始化一次
                    ggfb.paging(data.total,'tjxqpage',4);
                }
            }else{
                layer.alert('暂时没查出详情',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
}
/*验证筛选表单的数据是否符合正确格式*/
ggfb.validate_input_sx = function(currentPage, flg){
    ggfb.choosesx = true;
    //纳税人识别号的验证（非空和长度15或者18位）
    var reg= /^([0-9a-zA-Z]{18}|[0-9a-zA-Z]{15})$/;
    var len = 0;
    if(ggfb.nsrsbh!="" || ggfb.nsrmc!="" || ggfb.rkrqq!="" || ggfb.rkrqz!="" || ggfb.zzsq!="" || ggfb.zzsz!="" || ggfb.sdsq!="" || ggfb.sdsz!="" || ggfb.ybnsr!="" || ggfb.djzclxmc!="" || ggfb.hymc!=""){
        len = 1;
    }
    if(len<=0){
        layer.alert('请输入你的筛选条件！', {icon: 5});
        return false;
    }
    if(ggfb.nsrsbh != "" && !reg.test($.trim(ggfb.nsrsbh))){
        layer.tips("请正确输入15或者18位纳税人识别号！","#nsrsbh",{
            tips:[1,'#c00']
        });
        return false;
    }
    ggfb.qychoose = [];  $('#chekedALLdjxh').prop('checked',"");
    var data = {};data.rows = 9;data.page = currentPage;
    $.ajax({
        type:'post',
        url:'/webchat/enterprise/querySxEnterprise',
        dataType:'json',
        data:{corp_id:corpId,nsrsbh:$.trim(ggfb.nsrsbh),nsrmc:$.trim(ggfb.nsrmc),ybnsr:ggfb.ybnsr,djzclxmc:ggfb.djzclxmc,hymc:ggfb.hymc,rkrqq:ggfb.rkrqq,rkrqz:ggfb.rkrqz,zzsq:ggfb.zzsq,zzsz:ggfb.zzsz,sdsq:ggfb.sdsq,sdsz:ggfb.sdsz,rows:data.rows,page:data.page},
        success:function(data){
            if(data.code == 100){
                if(data.list.length == 0){
                    layer.msg('没有查出相关信息')
                }
                ggfb.listse=data.list;
                ggfb.choosebloor = false, ggfb.choosemeun = true;
                $('#fz_body').addClass('hidden'); $('#qy_body').removeClass('hidden');
                $('.qy_body'+' i').removeClass('hidden').parent('button').siblings('button').children('i').addClass('hidden');
                if(flg){//分页只初始化一次
                    ggfb.paging(data.total,'ggfbqy',9);
                }
                ggfb.xzclass = 'qy_body';
            }else{
                layer.alert('查询失败',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
    return false;
}
/*按企业发送中的全选*/
ggfb.chekedALLdjxh = function(){
    if($('#chekedALLdjxh').prop('checked')){
        ggfb.qychoose=[];
      $.each(ggfb.listse,function(i,value){
          ggfb.qychoose.push(value.enterprise.djxh+'|'+value.enterprise.nsrmc);
      })
    }else{
        ggfb.qychoose=[];
    }
}
ggfb.chekedDxdjxh = function(){
    $('#chekedALLdjxh').prop('checked',"");
}
/*按企业发送*/
ggfb.sureqyhao = function(){
    ggfb.treelist_fz = [];
    $.each(ggfb.qychoose,function(i,value){
        var pos = value.indexOf('|');
        var djxh = value.substring(0,pos);
        var nsrmc = value.substring(pos+1,value.length);
        ggfb.treelist_fz.push({'group_id':value.substring(0,pos),'group_name':value.substring(pos+1,value.length)})
    });
};
/*单条发送公告*/
ggfb.dtfs = function(){
    $.ajax({
        type:'post',
        url:'/webchat/message/sendMessage',
        dataType:'json',
        data:{msg_id:ggfb.listmeausobj.msg_id,agent_id:ggfb.listmeausobj.agent_id},
        success:function(data){
            if(data.code == 100){
                layer.alert('发送成功',{icon:6},function(){
                    location.reload();
                })
            }else{
                layer.alert('发送失败')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
}
/*发送公告的校验*/
ggfb.sendmaessge = function(){
    ggfb.content_ueditor =UE.getEditor('editor123').getContent();
    if(ggfb.xzclass == 'fz_body' || ggfb.xzclass == ''){
        $.each(ggfb.treelist_fz,function(i,value){
            ggfb.groupids += (value.group_id+'|');
        })
    }else if(ggfb.xzclass == 'qy_body'){
        $.each(ggfb.treelist_fz,function(i,value){
            ggfb.qychoosestring += (value.group_id+'|');
        })
    }
    if(ggfb.groupids !=''){
        ggfb.sendAll = 0;ggfb.qychoosestring='';
    }else if(ggfb.qychoosestring !=''){
        ggfb.sendAll=0;ggfb.groupids !=''
    }else if( (ggfb.groupids =='') && (ggfb.qychoosestring =='')){
        ggfb.sendAll= 1;
    }
    //发送公告的时候先验证表单中标题和作者不能为空
    if(ggfb.xzyy==""){
        $('#xzyyhidden').focus();
        layer.tips("选择应用不能为空","#xzyy",{
            tips:[1,'#c00']
        });
        return false;
    }
    if(ggfb.treelist_fz.length <= 0){
        $('#xzfwhidden').focus();
        layer.tips("发送范围不能为空","#add_fsfw",{
            tips:[1,'#c00']
        });
        return false;
    }
    if(ggfb.bt==""){
        $('#add_bt').focus();
        layer.tips("标题不能为空","#add_bt",{
            tips:[1,'#c00']
        });
        return false;
    }
    if(ggfb.content_ueditor==""){
        layer.tips("内容详情不能为空","#editor123",{
            tips:[1,'#c00']
        });
        return false;
    }
    if(ggfb.zy==""){
        $('#add_zy').focus();
        layer.tips("摘要内容不能为空","#add_zy",{
            tips:[1,'#c00']
        });
        return false;
    }
    return true;
}
/*发送公告*/
ggfb.meassge = function(){
    if(!ggfb.sendmaessge()){return false};
    $.ajax({
        type:'post',
        url:'/webchat/message/sendMessage',
        dataType:'json',
        data:{send_group:ggfb.groupids,send_all:ggfb.sendAll,send_enterprise:ggfb.qychoosestring,app_id:ggfb.appid,agent_id:ggfb.xzyy,title:ggfb.bt,content:ggfb.content_ueditor,msgtype:'textcard',description:ggfb.zy},
        success:function(data){
            if(data.code == 100){
                layer.alert('发送成功',{icon:6},function(){
                    ggfb.qychoosestring='';ggfb.groupids = '';
                    ggfb.treelist_fz=[];
                    location.reload();
                })
            }else{
                layer.alert('发送失败')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
}
/*发送公告保存为草稿*/
ggfb.meassgecaogao = function(){
    if(!ggfb.sendmaessge()){return false};
    $.ajax({
        type:'post',
        url:'/webchat/message/add',
        dataType:'json',
        data:{send_group:ggfb.groupids,send_all:ggfb.sendAll,send_enterprise:ggfb.qychoosestring,app_id:ggfb.appid,agent_id:ggfb.xzyy,title:ggfb.bt,content:ggfb.content_ueditor,msgtype:'textcard',description:ggfb.zy,status:'1'},
        success:function(data){
            if(data.code == 100){
                layer.alert('保存为查稿成功',{icon:6},function(){
                    ggfb.qychoosestring='';ggfb.groupids = '';
                    ggfb.treelist_fz=[];
                    location.reload();
                })
            }else{
                layer.alert('保存为草稿失败')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
}
/*定时发送*/
ggfb.dsfsmeassge = function(){
    if(ggfb.dstime == ''){
        layer.tips("请选择发送时间","#dsfs_h",{
            tips:[1,'#c00']
        });
        return false}
    $.ajax({
        type:'post',
        url:'/webchat/message/add',
        dataType:'json',
        data:{send_time:ggfb.dstime,send_group:ggfb.groupids,send_all:ggfb.sendAll,send_enterprise:ggfb.qychoosestring,app_id:ggfb.appid,agent_id:ggfb.xzyy,title:ggfb.bt,content:ggfb.content_ueditor,msgtype:'textcard',description:ggfb.zy,status:'2'},
        success:function(data){
            if(data.code == 100){
                layer.msg('定时发送成功',function(){
                    ggfb.qychoosestring='';ggfb.groupids = '';
                    location.reload();
                })
            }else{
                layer.alert('定时发送失败',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
}
/*再次发送公告*/
ggfb.zcfsgg = function(){
    $.each(ggfb.zcsendMessge,function(i,value){
        ggfb.zcsendString += (value+'|');
    })
    $.ajax({
        type:'post',
        url:'/webchat/message/sendMessage',
        dataType:'json',
        data:{msg_id:ggfb.msgid,send_enterprise:ggfb.zcsendString,agent_id:ggfb.agentid},
        success:function(data){
            if(data.code == 100){
                layer.alert('发送成功',{icon:6},function(){
                    location.reload();
                })
            }else{
                layer.alert('发送失败')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
}
/*再次发送公告点击全选*/
ggfb.aginmeassge = function(){
    if($('.tjxq_header_checkbox').prop('checked')){
        $.each(ggfb.lisyd,function(i,value){
            ggfb.zcsendMessge.push(value.djxh);
        });
        ggfb.htmltwo='取消全选';
    }else{
        ggfb.zcsendMessge=[];
        ggfb.htmltwo='全选';
    }
    if(ggfb.zcsendMessge.length == 0){
        ggfb.htmltwo='全选';
    }
}
ggfb.zcfsone = function(){
    $('.tjxq_header_checkbox').prop('checked','');
    ggfb.htmltwo='全选';
}
/*选择应用*/
ggfb.xxyyfunction = function(agentid,name,appid){
    ggfb.appname = name;
    ggfb.xzyy = agentid;
    ggfb.appid = appid;
    $('#'+agentid+' i').removeClass('hidden').parent('button').siblings('button').children('i').addClass('hidden');
}
/*获取按企业分组*/
ggfb.listxiang = function(currentPage, flg){
    ggfb.choosesx = false;
    $('#chekedALLdjxh').prop('checked',""); ggfb.qychoose=[];ggfb.treelist_fz = [];
    var data = {};
    data.rows = 9;
    data.page = currentPage;
    setTimeout(function(){
        $.ajax({
            type:'post',
            url:'/webchat/enterprise/queryByGropId',
            dataType:'json',
            data:{corp_id: corpId,rows:data.rows,page:data.page},
            success:function(data){
                if(data.code == 100){
                    ggfb.listse=data.list;
                    if(flg){//分页只初始化一次
                        ggfb.paging(data.total,'ggfbqy',9);
                    }
                }else{
                    layer.alert('没有数据')
                }
            },
            error:function(){
                layer.alert('请求失败');
            }
        })
    },1000);
}
/*获取选择树形的name*/
ggfb.xztree = function(name,groupid){
    if(ggfb.treelist_fz.length == 0){
        ggfb.treelist_fz.push({'group_name':name,'group_id':groupid});
        return;
    }
    var hastree = true;
    $.each(ggfb.treelist_fz,function(i,value){
        if(value.group_name == name){
            hastree = false;
            return false;
        }
    });
    if(hastree){
        ggfb.treelist_fz.push({'group_name':name,'group_id':groupid});
    }else{
        layer.alert('这项已经选择过了,请重新选择');
    }
}
/*删除选择了的*/
ggfb.deletexz = function(groupid,index,name){
    if(index == 0){
        ggfb.treelist_fz.shift();
    }else{
        ggfb.treelist_fz.splice(index,1);
    }
    ggfb.qychoose.remove(groupid+'|'+name);
    $('#chekedALLdjxh').prop('checked',"");
}
/*分组企业*/
ggfb.fzqy = function(id){
    ggfb.treelist_fz=[];
    ggfb.qychoose=[];
    ggfb.groupids='' ;
    ggfb.qychoosestring = '';
    ggfb.xzclass=id;
    $('#chekedALLdjxh').prop('checked',"");
    if(id == 'all'){ var tree ='按全员';ggfb.treelist_fz.push({'group_name':tree});}
    $('#'+id).removeClass('hidden');
    $('.'+id+' i').removeClass('hidden').parent('button').siblings('button').children('i').addClass('hidden');
    var other = ( id == 'fz_body' ? 'qy_body':'fz_body');
    $('#'+other).addClass('hidden');
}
/*获取应用范围*/
ggfb.listyyfw = function(){
    $.ajax({
        type:'post',
        url:'/webchat/group/queryList',
        dataType:'json',
        data:{corp_id:corpId,p_group_id:0},
        success:function(data){
            if(data.code == 100){
                ggfb.listone=data.list;
            }else{
                layer.alert('暂时没分组',{icon:6})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
}
/*请求左边菜单栏*/
ggfb.menufunction = function(){
    $.ajax({
        type:'post',
        url:'/webchat/app/queryList',
        dataType:'json',
        data:{corp_id:corpId},
        success:function(data){
            if(data.code == 100){
                ggfb.menulist = data.list;
            }else{
                layer.alert('获取菜单失败！',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
}
ggfb.listmeau = function(appId,currentPage, flg,app_name,app_status){
    if(appId==''){
        app_name = "全部";
    }
    ggfb.app_name = app_name;
    ggfb.chakanone=false;ggfb.cheack=[];$('.chooseAll').prop('checked','');ggfb.htmlone='全选';ggfb.chakantwo=true;
    ggfb.chakanlist=false;ggfb.addhidden = true;ggfb.add = false;
    ggfb.chakanblooer = true;
    if(!appId){
        $('#allgg').addClass('color_blue backfff').parent('li').siblings('li').children('p').removeClass('color_blue backfff');
    }else{
        $('#'+appId).addClass('color_blue backfff').parent('li').siblings('li').children('p').removeClass('color_blue backfff');
    }
    ggfb.appidd = appId;
    var data = {};
    data.rows = 6;
    data.page = currentPage;
    $.ajax({
        type:'post',
        url:'/webchat/message/query',
        dataType:'json',
        data:{app_id:appId,msgType:'textcard',rows:data.rows,page:data.page,status:app_status},
        success:function(data){
            if(data.code == 100){
                ggfb.listmeaus = data.list;
                ggfb.yfb = data.yfb;
                ggfb.wfb = data.wfb;
                ggfb.zf = data.zf;
                if( ggfb.listmeaus.length == 0){
                    layer.msg('暂无公告');
                }
                if(flg){//分页只初始化一次
                    ggfb.paging(data.total,'newspage',6);
                }
            }else{
                layer.alert('获取消息失败！',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
}
ggfb.addnews = function(){
    ggfb.add = !ggfb.add;
    ggfb.addhidden = !ggfb.addhidden;
    $('button i').addClass('hidden');
    ggfb.zy = '';
    ggfb.bt = '';
    UE.getEditor('editor123').setContent('');
    ggfb.treelist_fz =[]; ggfb.qychoosestring='';ggfb.groupids = '';
}
/*点击全选按钮*/
ggfb.checkOne = function(){
    ggfb.chakantwo = false;
    ggfb.chakanone = true;
    if($('.zn-two input:checkbox:checked').size() == 0){
        ggfb.chakantwo = true;
        ggfb.chakanone = false;
    }
}
ggfb.checkedAll = function(){
    if($('.chooseAll').prop('checked')){
        ggfb.cheack =[];
        ggfb.htmlone = '取消全选';
        $.each(ggfb.listmeaus,function(i,values){
            ggfb.cheack.push(values.msg_id);
        });
    }else{
        ggfb.cheack =[];
        ggfb.htmlone = '全选';
        ggfb.chakantwo = true;
        ggfb.chakanone = false;
    }
}
/*查看详情*/
ggfb.chakanneun = function(appIds,msgid,agentid){
    ggfb.appId = appIds;
    ggfb.msgid = msgid ;
    ggfb.agentid = agentid ;
    ggfb.chakanblooer = !ggfb.chakanblooer;
    ggfb.chakanlist = !ggfb.chakanlist;
    ggfb.htmlone = '全选';
    ggfb.chakantwo = true;
    ggfb.chakanone = true;
    $('.chooseAll').prop('checked','')
    $.ajax({
        type:'post',
        url:'/webchat/message/query',
        dataType:'json',
        data:{app_id:ggfb.appId,msgType:'textcard', msg_id:msgid},
        success:function(data){
            if(data.code == 100){
                ggfb.listmeausobj = data.list[0];
                ggfb.nextmsg  = data.list[0].next_msg_id;
            }else{
                layer.alert('获取消息失败！')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
};
/*c查看下一条详情*/
ggfb.nextfunction = function(){
    if(ggfb.nextmsg==""){
        layer.alert('暂时没有下一条公告！');
    }
    $.ajax({
        type:'post',
        url:'/webchat/message/query',
        dataType:'json',
        data:{app_id:ggfb.appId,msgType:'text', msg_id:ggfb.nextmsg },
        success:function(data){
            if(data.code == 100){
                ggfb.listmeausobj = data.list[0];
            }else{
                layer.alert('获取消息失败！')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
};
/*点击详情的返回按钮*/
ggfb.meunback = function(){
    ggfb.chakanblooer = !ggfb.chakanblooer;
    ggfb.chakanlist = !ggfb.chakanlist;
    ggfb.chakanone = false;
    ggfb.cheack=[];
    ggfb.tjxq = true;
}
/*
*删除公告
* */
ggfb.deletegg = function(){
    if(ggfb.cheack.length == 0){layer.alert('你还没选择要删除的公告');return;}
    layer.confirm('确认要删除这些公告吗？',function(){
        $.each(ggfb.cheack,function(){
            $.ajax({
                type:'post',
                url:'/webchat/message/delete',
                dataType:'json',
                data:{msg_id:this},
                success:function(data){
                    if(data.code == 100){
                        layer.msg(data.msg,function(){
                            ggfb.listmeau();
                            ggfb.cheack = [];
                            $('.chooseAll').prop('checked',"");
                            $('.chooseAll').next('label').html('全选');
                        })
                    }else{
                        layer.alert('删除消息失败！')
                    }
                },
                error:function(){
                    layer.alert('请求失败');
                }
            })
        })
    })
}
/*
*删除公告
* */
ggfb.deletexq = function(){
    layer.confirm('确认要删除公告吗？',function(){
            $.ajax({
                type:'post',
                url:'/webchat/message/delete',
                dataType:'json',
                data:{msg_id:ggfb.msgid},
                success:function(data){
                    if(data.code == 100){
                        layer.msg(data.msg,function(){
                            location.reload();
                        })
                    }else{
                        layer.alert('删除公告失败！')
                    }
                },
                error:function(){
                    layer.alert('请求失败');
                }
            })
        })
}
/*
* 编辑公告
* */
ggfb.bjmessge = function(){
    ggfb.addhidden = false;
    ggfb.chakanlist = true;
    ggfb.add = true;
    $('#'+ggfb.listmeausobj.agent_id+' i').removeClass('hidden');
    ggfb.xzyy = ggfb.listmeausobj.agent_id;
    ggfb.zy = ggfb.listmeausobj.description;
    ggfb.bt = ggfb.listmeausobj.title;
    UE.getEditor('editor123').execCommand('insertHtml', ggfb.listmeausobj.content)
    ggfb.treelist_fz = ggfb.listmeausobj.send_group_name;
    if(ggfb.listmeausobj.send_group.length == 0 && ggfb.listmeausobj.send_all == 0) {
        ggfb.xzclass = 'qy_body';
    }else if(ggfb.listmeausobj.send_all == 0 && ggfb.listmeausobj.send_enterprise.length == 0){
        ggfb.xzclass = 'fz_body';
    }else if(ggfb.listmeausobj.send_all == 1 && ggfb.listmeausobj.send_enterprise.length == 0 && ggfb.listmeausobj.send_group.length == 0){
        ggfb.xzclass = '';
    }
}
/*
 *  传页码参数
 * */
ggfb.paging = function(total,id,nummber){
    layui.use(['laypage', 'layer'], function(){
        var laypage = layui.laypage
            ,layer = layui.layer;
        laypage({
            cont: $("#"+id)
            ,pages : total % nummber > 0 ? (total / nummber) + 1 : total / nummber
            ,skin: '#1E9FFF'
            ,skip : true
            ,groups : 3,
            jump:function(obj,first){
                if(!first){
                    if(ggfb.choosesx){
                        ggfb.validate_input_sx(obj.curr,false);
                    }else{
                        if(id == 'newspage'){
                            ggfb.listmeau(ggfb.appidd,obj.curr,false,ggfb.app_name)
                        }else if(id == 'ggfbqy'){
                            ggfb.listxiang(obj.curr,false);
                        }else if(id == 'tjxqpage'){
                            ggfb.tjxqfunc(ggfb.readstatus,ggfb.libs,obj.curr,false)
                        }
                    }

                }
            }
        });
    });

}
/*筛选功能的下拉功能（带模糊查询的）*/
ggfb.myFunction = function(){
    // 声明变量
    var input, filter, table, tr, td,sshy_obj;
    input = document.getElementById("hymc");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    sshy_obj = document.getElementById("sshy_select");
    tr = table.getElementsByTagName("tr");
    // 循环表格每一行，查找匹配项
    for (var i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                sshy_obj.style.display="";
                tr[i].style.display = "";
            } else {
                sshy_obj.style.display="none";
                tr[i].style.display = "none";
            }
        }
        if(filter==""){
            sshy_obj.style.display="none";
        }else{
            sshy_obj.style.display="";
        }
    }
    $.ajax({
        type:'post',
        url:'/webchat/enterprise/queryMhCx',
        dataType:'json',
        success:function(data){
            if(data.code == 100){
                ggfb.sshymcList = data.sxmhtj[0].allHymc;
            }else{
                layer.alert('查询失败',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
};
ggfb.selectValue = function(sshymc){
    var  sshy_obj = document.getElementById("sshy_select");
    var input = document.getElementById("hymc");
    input.value = sshymc;
    sshy_obj.style.display="none";

};
ggfb.myFunction_djzclx = function(){
    // 声明变量
    var input, filter, table, tr, td,djzclx_obj;
    input = document.getElementById("djzclxmc");
    filter = input.value.toUpperCase();
    table = document.getElementById("djzclxmc_myTable");
    djzclx_obj = document.getElementById("djzclxmc_select");
    tr = table.getElementsByTagName("tr");
    // 循环表格每一行，查找匹配项
    for (var i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                djzclx_obj.style.display="";
                tr[i].style.display = "";
            } else {
                djzclx_obj.style.display="none";
                tr[i].style.display = "none";
            }
        }
        if(filter==""){
            djzclx_obj.style.display="none";
        }else{
            djzclx_obj.style.display="";
        }
    }
    $.ajax({
        type:'post',
        url:'/webchat/enterprise/queryMhCx',
        dataType:'json',
        success:function(data){
            if(data.code == 100){
                ggfb.djzclxmcList = data.sxmhtj[0].allDjzclxmc;
            }else{
                layer.alert('查询失败',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
};

ggfb.selectValue_djzclx = function(djzxlxmc){
    var djzclx_obj = document.getElementById("djzclxmc_select");
    var input = document.getElementById("djzclxmc");
    input.value = djzxlxmc;
    djzclx_obj.style.display="none";

};
/*解决dropdown下拉菜单隐藏的问题*/
ggfb.dropdown_menu_no = function(e){
    e.stopPropagation();
};
ggfb.bodyclose = function(){
    if(!ggfb.choosemeun){
        ggfb.choosemeun = true;ggfb.choosebloor = false;
    }
    if(!ggfb.choosemeun_yxry){
        ggfb.choosemeun_yxry = true;ggfb.choosebloor_yxry = false;
    }
};
/*公告发布-手动标记企业是否已经联系*/
ggfb.bj_lx = function(djxh,call_status){
    layer.confirm('确定要修改当前状态吗？',function(){
        $.ajax({
            type:'post',
            url:'/webchat/message/updateCallStatus',
            dataType:'json',
            data:{msg_id:ggfb.msgid,djxh:djxh,call_status:call_status},
            success:function(data){
                if(data.code == 100){
                    layer.msg('已成功修改当前状态！',function(){
                        ggfb.tjxqfunc('0','wdactive',ggfb.datalist.page,ggfb.datalist.flg);
                    });
                }else{
                    layer.alert('修改失败！',{icon:5})
                }
            },
            error:function(){
                layer.alert('请求失败',{icon:5});
            }
        })
    });
};
/*导出企业*/
ggfb.exportExcel = function(){
    var innerhtml = ggfb.readstatus == 1 ?'已读':'未读';
    if(ggfb.lisyd.length == 0){
        layer.alert('暂无可以导出的企业');
        return;
    }
    layer.confirm('确定要导出'+innerhtml+'企业吗？',function(e){
        window.location.href = '/webchat/message/exportExcel?msg_id='+ggfb.msgid+'&read_status='+ggfb.readstatus;
        layer.close(e);
    });
};
/*发送短信*/
ggfb.sendSMS = function(){

};
/*筛选已发送、未发送的公告*/
ggfb.sxfs_fun = function(currentPage, flg,app_status){
    appId = ggfb.appidd;
    app_name = ggfb.app_name;
    ggfb.listmeau(appId,currentPage, flg,app_name,app_status);
};


