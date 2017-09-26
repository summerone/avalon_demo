/**
 * Created by summer on 2017/6/7.
 */
var yygl =avalon.define({
    $id:'yygl',
    changeYygl:avalon.noop,
    queryYyglList:avalon.noop,
    yyglList:'',
    deleteYyglList:'app_id',
    update:{},
    addYyglList:avalon.noop,
    updateStatus:avalon.noop,
    displaynone:'xgsc',
    tjyy:avalon.noop,
    rutback:avalon.noop,
    tjxyyobj:{src:'',agent_id:'',secret:'',app_name:'', corp_id:'',memo:''},
    srcfunction:avalon.noop,
    xltoogle:'xlk',
    xlkchange:avalon.noop,
    zt:false,
    statuszt:avalon.noop,
    pagingyygl:avalon.noop,
    tjxyjupm:true,
    tjxymain:false,
    tjxyjupmxg:true,
    tjyyglhtml:'添加新应用',
    dates:{},
    yygl_bj:avalon.noop,
    inputHidden:true,
    spanHidden:false,
    yygl_bj_qx:avalon.noop,
    yygl_bj_sure:avalon.noop,
    update_old:{}
});
var localTest = layui.data('test');
var corpId = localTest.corpId;
/*
 *页面初始化数据
 * */
yygl.$watch('onReady',function(){
    yygl.queryYyglList(1, true);
});
/*选择应用logo*/
yygl.srcfunction = function(obj){
     yygl.tjxyyobj.src='../../static/images/filecopy/'+obj+'.png';
}
yygl.xlkchange = function(){

}
/*添加应用管理*/
yygl.tjyy = function(){
    if(yygl.tjyyglhtml =='添加新应用'){
        yygl.tjxyjupm = false;yygl.tjxymain = true;yygl.tjxyjupmxg =true;
        yygl.tjxyjupm == true ? (yygl.tjyyglhtml='添加新应用'):(yygl.tjyyglhtml='返回');
    }else{
        yygl.tjxyjupm = true;yygl.tjxymain = false;yygl.tjxyjupmxg =true;
        yygl.tjxyjupm == true ? (yygl.tjyyglhtml='添加新应用'):(yygl.tjyyglhtml='返回');
        yygl.inputHidden = true;
        yygl.spanHidden = false;
    }
}
yygl.changeYygl =function(obj){
    yygl.tjxyjupm=true;yygl.tjxymain=true;yygl.tjxyjupmxg=false;
    yygl.update = obj;yygl.tjyyglhtml='返回';
    yygl.update_old = {secret:obj.secret,agent_id:obj.agent_id,memo:obj.memo}
};
yygl.queryYyglList = function(currentPage, flg){
    yygl.dates.rows = 5;yygl.dates.page = currentPage;yygl.dates.flg = flg;
    $.ajax({
        type:'post',
        url:'/webchat/app/queryList',
        data:{page:yygl.dates.page,rows: yygl.dates.rows,corp_id:corpId},
        dataType:'json',
        success:function(data){
            yygl.yyglList = data.list;
            if(flg){//分页只初始化一次
                yygl.pagingyygl(data.total);
            }
        },
        error:function(){
            layer.alert('应用管理数据加载失败...');
        }
    })
}
/*修改状态*/
yygl.statuszt = function(appid,zt){
    layer.confirm('确认修改该公告的状态吗？', {
        btn: ['确定','取消']
    }, function(){
        $.ajax({
            type:'post',
            url:'/webchat/app/update',
            data:{app_id:appid,status:zt},
            dataType:'json',
            success:function(data){
                if(data.code==100){
                    layer.msg('修改成功',function(){
                        yygl.queryYyglList(yygl.dates.page,yygl.dates.flg);
                    });
                }else{
                    layer.alert('修改失败',{icon:5})
                }
            },
            error:function(){
                layer.alert('请求失败',{icon:5});
            }
        })
    });
}
yygl.deleteYyglList = function(app_id){
    layer.confirm('是否删除应用管理 公告？', {
        btn: ['确定','取消'] //按钮
    }, function(){
        $.ajax({
            type:'post',
            url:'/webchat/app/delete',
            data:{app_id:app_id},
            dataType:'json',
            success:function(data){
                if(data.code==100){
                    layer.msg('删除成功',function(){
                        yygl.queryYyglList(yygl.dates.page,yygl.dates.flg);
                    });
                }else{
                    layer.alert('删除失败',{icon:5})
                }
            },
            error:function(){
                layer.alert('删除失败',{icon:5});
            }
        })
    });
}
//应用管理-添加新应用表单验证
yygl.addYyglList = function(){
	var reg = /^[0-9]{1,10}$/;var reg_secret= /^[0-9a-zA-Z-_]{1,64}$/;var reg_qyh = /^[0-9a-zA-Z]{1,20}$/;
    var isPass = false;
    $.each(yygl.tjxyyobj,function(key,value){
        if(!value){
            layer.tips($("#"+key).attr('placeholder'),"#"+key,{
                tips:[1,'#c00']
            });
            $("#"+key).focus();
            isPass = true;
            return false;
        }
    });
    if(isPass)return false;
    if(!reg.test($.trim(yygl.tjxyyobj.agent_id))){
        layer.tips("应用ID由1到10位数字组成！","#agent_id",{
            tips:[1,'#c00']
        });
        $("#agent_id").focus();
        return false;
    }
    if(!reg_secret.test($.trim(yygl.tjxyyobj.secret))){
        layer.tips("应用密钥由数字、大小写字母、-（连接线）、下划线组成","#secret",{
            tips:[1,'#c00']
        });
        $("#secret").focus();
        return false;
    }
    if(!reg_qyh.test($.trim(yygl.tjxyyobj.corp_id))){
        layer.tips("企业号由1到20位数字、大小写字母组成！","#corp_id",{
            tips:[1,'#c00']
        });
        $("#corp_id").focus();
        return false;
    }
    if(!isPass){
        $.ajax({
            type:'post',
            url:'/webchat/app/insert',
            data:{img_path:yygl.tjxyyobj.src,app_name:$.trim(yygl.tjxyyobj.app_name), status:1, agent_id:$.trim(yygl.tjxyyobj.agent_id), secret:$.trim(yygl.tjxyyobj.secret), corp_id:$.trim(yygl.tjxyyobj.corp_id), memo:$.trim(yygl.tjxyyobj.memo)},
            dataType:'json',
            success:function(data){
                if(data.code==100){
                    layer.msg('添加成功',{icon:6},function(){
                        location.reload();
                    })
                }else{
                    layer.alert('添加失败',{icon:5})
                }
            },
            error:function(){
                layer.alert('添加失败...',{icon:5});
            }
        })
    }
};
yygl.updateStatus = function(app_id){
    $.ajax({
        type:'post',
        url:'/webchat/app/update',
        data:{app_id:app_id, status:1},
        dataType:'json',
        success:function(data){
            if(data.code==100){
                layer.msg('添加成功',function(){
                    location.reload();
                })
            }
        },
        error:function(){
            layer.alert('添加失败...');
        }
    })
};
/*
*应用管理-编辑
* */
yygl.yygl_bj = function(){
    yygl.inputHidden = false;
    yygl.spanHidden = true;
};
/*应用管理-编辑-取消*/
yygl.yygl_bj_qx = function(){
    yygl.update.secret = yygl.update_old.secret;
    yygl.update.agent_id = yygl.update_old.agent_id;
    yygl.update.memo = yygl.update_old.memo;
    yygl.inputHidden = true;
    yygl.spanHidden = false;
};
/*应用管理-编辑-确定*/
yygl.yygl_bj_sure = function(){
    $.ajax({
        type:'post',
        url:'/webchat/app/update',
        data:{app_id:yygl.update.app_id,secret:yygl.update.secret,agent_id:yygl.update.agent_id,memo:yygl.update.memo},
        dataType:'json',
        success:function(data){
            if(data.code==100){
                layer.msg('编辑成功',function(){
                    yygl.inputHidden = true;
                    yygl.spanHidden = false;
                })
            }
        },
        error:function(){
            layer.alert('编辑失败...');
        }
    })
};
/*
 *  传页码参数
 * */
yygl.pagingyygl = function(total){
    layui.use(['laypage', 'layer'], function(){
        var laypage = layui.laypage
            ,layer = layui.layer;
        laypage({
             cont: $("#yyglpage")
            ,pages : total % 5 > 0 ? (total / 5) + 1 : total / 5
            ,skin: '#1E9FFF'
            ,skip : true
            ,groups : 5,
            jump:function(obj,first){
                if(!first){
                    yygl.queryYyglList(obj.curr,false)
                }
            }
        });
    });
};
