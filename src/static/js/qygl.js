/**
 * Created by summer on 2017/5/26.
 */
var tjqyh = avalon.define({
    $id:'tjqyh',
    name:'',
    shuihao:'',
    cxqyh:'',
    cxqyhFunction:avalon.noop,
    yhmc:'',
    yhlyAll:'',
    qyh:'',
    bz:'',
    tjqyhzt:'1',
    yyid:'',
    yyms:'',
    yymc:'',
    yylx:'',
    tjyyzt:'',
    yysm:'',
    tjyyhzt:'1',
    xqfunction:avalon.noop,
    namefunction:avalon.noop,
    closefunction:avalon.noop,
    statusfunction:avalon.noop,
    tjqyhfunction:avalon.noop,
    tjyyfunction:avalon.noop,
    statusMfunction:avalon.noop,
    yylb:'',
    gllb:'',
    statusAppChange:avalon.noop,
    paging:avalon.noop,
    statusAaminChange:avalon.noop,
    yyglList:avalon.noop,
    ryglList:avalon.noop,
    page:'',
    statusChange:avalon.noop
});
/*
*页面初始化数据
* */
tjqyh.$watch('onReady',function(){
    tjqyh.cxqyhFunction(1, true);
})
/*
* 添加应用
* */
tjqyh.tjyyfunction = function(){
	//企业管理-添加应用表单验证
	var reg = /^[0-9]{1,10}$/;
	var reg_yyms= /^[0-9a-zA-Z-]{1,64}$/;
    var obj = {add_yyid:tjqyh.yyid,add_yyms:tjqyh.yyms,add_yymc:tjqyh.yymc,add_yysm:tjqyh.yysm};
    var isPass = false;
    $.each(obj,function(key,value){
        if (!value) {
            layer.tips($("#" + key).attr('placeholder'), "#" + key, {
                tips: [1, '#c00']
            });
            $("#" + key).focus();
            isPass = true;
            return false;
        }
    });
    if (isPass)return false;
    if(!reg.test($.trim(tjqyh.yyid))){
        layer.tips("应用ID由1到10位数字组成！","#add_yyid",{
            tips:[1,'#c00']
        });
        return false;
    }
    if(!reg_yyms.test($.trim(tjqyh.yyms))){
        layer.tips("应用密匙由数字、大小写字母、-（连接线）组成","#add_yyms",{
            tips:[1,'#c00']
        });
        return false;
    }
    if(!isPass){
        $.ajax({
            type:'post',
            url:'/webchat/app/insert',
            data:{app_id:'45621',agent_id: $.trim(tjqyh.yyid),secret:$.trim(tjqyh.yyms),corp_id: $.trim(tjqyh.shuihao),app_name:$.trim(tjqyh.yymc),status:tjqyh.tjqyhzt,memo:tjqyh.tjqyhzt},
            dataType:'json',
            success:function(data){
                if(data.code == 100){
                    $('#tjyingy').modal('hide');
                    var index = layer.alert('添加成功',function(){
                        tjqyh.yyglList();
                        layer.close(index);
                    })
                }else{
                    layer.alert('添加失败！')
                }
            },
            error:function(){
                layer.alert('请求失败');
            }
        })
    }
}
/*
* 添加企业号
* */
tjqyh.tjqyhfunction = function(){
	//企业管理-添加企业号表单验证
	var reg = /^[0-9a-zA-Z]{1,20}$/;
    var obj = {add_yhmc: tjqyh.yhmc, add_qyh: tjqyh.qyh};
    var isPass = false;
    $.each(obj, function (key, value) {
        if (!value) {
            layer.tips($("#" + key).attr('placeholder'), "#" + key, {
                tips: [1, '#c00']
            });
            $("#" + key).focus();
            isPass = true;
            return false;
        }
    });
    if (isPass)return false;
    if (!reg.test($.trim(tjqyh.qyh))) {
        layer.tips("企业号由1到20位数字、大小写字母组成！", "#add_qyh", {
            tips: [1, '#c00']
        });
        return false;
    }
    if(!isPass){
        $.ajax({
            type:'post',
            url:'/webchat/corportion/insert',
            data:{corp_name:$.trim(tjqyh.yhmc),corp_id: $.trim(tjqyh.qyh),status:tjqyh.tjqyhzt,memo: tjqyh.yysm},
            dataType:'json',
            success:function(data){
                if(data.code == 100){
                    $('#tjqyh_').modal('hide');
                    layer.msg('添加成功',function(){
                        tjqyh.cxqyhFunction(1, true);
                    })
                }else{
                    layer.alert('添加失败！')
                }
            },
            error:function(){
                layer.alert('请求失败');
            }
        })
    }
}
/*应用管理详情*/
tjqyh.yyglList = function(){
    $.ajax({
        type:'post',
        url:'/webchat/app/queryList',
        data:{corp_id:tjqyh.shuihao},
        dataType:'json',
        success:function(data){
            if(data.code == 100){
                tjqyh.yylb = data.list;
            }else{
                layer.alert('查看详情失败')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })

};
tjqyh.ryglList = function(){
    $.ajax({
        type:'post',
        url:'/webchat/admin/queryOne',
        data:{corp_id:tjqyh.shuihao},
        dataType:'json',
        success:function(data){
            tjqyh.gllb = data.list;
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
}
/*
* 查看详情
* */
tjqyh.xqfunction = function(name,id){
    tjqyh.name = name;
    tjqyh.shuihao = id;
    $('.slider_right .content_right').css('width','60%');
    $('.tjqyh').removeClass('hide');
    $('.slider_right .content_right').css('margin-right','10px');
    tjqyh.yyglList();
    tjqyh.ryglList();
}
/*
* 修改企业名称
* */
/*tjqyh.namefunction = function(){
        $.ajax({
            type:'post',
            url:'/webchat/corportion/update',
            data:{corp_id:tjqyh.shuihao,corp_name:tjqyh.name},
            dataType:'json',
            success:function(data){
                if(data.code == 100){
                    layer.alert('修改成功！')
                }else{
                    layer.alert('修改失败！')
                }
            },
            error:function(){
                layer.alert('请求失败！')
            }
        });
}*/
/*
* 修改管理员状态
* */
tjqyh.statusAaminChange = function(adminid,zt,cordid){
    layer.confirm('确认要修改状态吗',function(){
        $.ajax({
            type:'post',
            url:'/webchat/admin/update',
            data:{admin_id:adminid,status:zt,corp_id:cordid},
            dataType:'json',
            success:function(data){
                if(data.code == 100){
                    layer.msg('修改成功！',function(){
                        tjqyh.ryglList();
                    })
                }else{
                    layer.alert('修改失败！')
                }
            },
            error:function(){
                layer.alert('请求失败！')
            }
        });
    })
}
/*
* 点击关闭按钮
* */
tjqyh.closefunction = function(){
    $('.slider_right .content_right').css('width','94%');
    $('.tjqyh').addClass('hide');
    $('.slider_right .content_right').css('margin-right','0');
}
/*
* 查询列表
* */
tjqyh.cxqyhFunction = function(currentPage, flg){
    var data = {};
    data.rows = 3;
    data.page = currentPage;
    tjqyh.page = data.page
    $.ajax({
        url : "/webchat/corportion/queryList",
        data : {rows:data.rows,page:tjqyh.page},
        type : "post",
        dataType : "json",
        success : function(res) {
            if(res.code == 100){
                tjqyh.cxqyh=res.list;
                if(flg){//分页只初始化一次
                    tjqyh.paging(res.total);
                }
            }else{
             layer.alert('查询失败！')
            }
        },
        error : function(res) {
            layer.alert('请求失败!')
        }
    });
}
/*
* 状态设置
* */
tjqyh.statusChange = function(id,number){
    debugger;
    layer.confirm('确认修改该状态吗',function(){
        $.ajax({
            type:'post',
            url:'/webchat/corportion/update',
            data:{corp_id:id,status:number},
            dataType:'json',
            success:function(data){
                if(data.code == 100){
                    layer.msg('状态修改成功！',function(){
                        tjqyh.cxqyhFunction(tjqyh.page, true);
                    })
                }else{
                    layer.alert('状态修改失败！')
                }
            },
            error:function(){
                layer.alert('请求失败！')
            }
        });
    })
}
/*
 * 添加状态设置
 * */
tjqyh.statusAppChange = function(appid,status,agentid){
    layer.confirm('确认修改该状态吗',function(){
        //if(status == 1){status = 0,classzt = 'qiyong',classztfx = 'jingyong',innerhtml='禁用'}else if(status == 0){status = 1,classzt = 'jingyong',classztfx = 'qiyong',innerhtml='启用'}
        $.ajax({
            type:'post',
            url:'/webchat/app/update',
            data:{app_id:appid,status:status},
            dataType:'json',
            success:function(data){
                if(data.code == 100){
                    /*$('#'+agentid+'>span .neirong').html(innerhtml);*/
                    layer.msg('状态修改成功！',function(){
                        tjqyh.yyglList();
                    })
                }else{
                    layer.alert('修改失败！')
                }
            },
            error:function(){
                layer.alert('请求失败！')
            }
        });
    })
}
/*
* 状态设置
* */
//tjqyh.statusfunction = function(obj,number){
//        if(number == 1){
//            $('#'+obj+'>span').removeClass('qiyong').addClass('jingyong');
//            $('#'+obj+'>span .neirong').html('禁用');
//            statusChange(obj,0)
//        }else if(number == 0){
//            $('#'+obj+'>span').addClass('qiyong').removeClass('jingyong');
//            $('#'+obj+'>span .neirong').html('启用');
//            statusChange(obj,1)
//        }
//}
/*
* 企业号模态框
* */
tjqyh.statusMfunction = function(obj){
    if(tjqyh.tjqyhzt == 1){
        tjqyh.tjqyhzt=0;
        $('#'+obj+' tr td>span').removeClass('qiyong').addClass('jingyong');
        $('#'+obj+' tr td>span .neirong').html('禁用');
    }else if(tjqyh.tjqyhzt == 0){
        tjqyh.tjqyhzt=1;
        $('#'+obj+' tr td>span').removeClass('jingyong').addClass('qiyong');
        $('#'+obj+' tr td>span .neirong').html('启用');
    }
};
/*
*  传页码参数
* */
tjqyh.paging = function(total){
    layui.use(['laypage', 'layer'], function(){
        var laypage = layui.laypage
            ,layer = layui.layer;
        laypage({
            cont: $(".page_")
            ,pages : total % 3 > 0 ? (total / 3) + 1 : total / 3
            ,skin: '#1E9FFF'
            ,skip : true
            ,groups : 3,
            jump:function(obj,first){
                if(!first){
                    tjqyh.cxqyhFunction(obj.curr,false)
                }
            }
        });
    });

}


