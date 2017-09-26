/**
 * Created by summer on 2017/6/7.
 */
var glylb = avalon.define({
   $id:'glylb',
   addBtn:avalon.noop,
   changePass:avalon.noop,
   del:avalon.noop,
   change:avalon.noop,
   queryList:"",
   list:avalon.noop,
    status:false,
    innerhtml:'启用',
    tjglyzt:avalon.noop,
    backGround:{backgroundColor:'#D8D8D8'},
    objpadding:{paddingRight: '0px',paddingLeft:'20px'},
    objleft:{left:'0'},
    xgglyzt:avalon.noop,
    changeObj:{},
    surechange:avalon.noop,
    tjglyObj:{glyyhm:'',glyzm:'',glymm:'',glyfzdqyh:'',glyyxrqq:'',glyyxrqz:''},
    status2:false,
    innerhtml2:'启用',
    tjgly:avalon.noop,
    old_psw:'',
    new_psw:'',
    sure_check_psw:avalon.noop,
    tjglyjump:true,
    glylbmain:false,
    glylbxg:true,
    tjglyhtml:'添加管理员'
});
glylb.list();
/*页面来加载的数据*/
glylb.list = function(){
    $.ajax({
        type:'post',
        url:'/webchat/admin/queryAll',
        dataType:'json',
        success:function(data){
            if(data.code == 100){
                glylb.queryList=data.list;
            }else{
                layer.alert('请求数据失败！')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
}
/*添加管理员*/
glylb.addBtn = function(){
    if(glylb.tjglyhtml == '添加管理员'){
        glylb.tjglyjump = false;glylb.glylbmain = true;glylb.glylbxg = true;
        glylb.tjglyhtml = '返回';
    }else{
        glylb.tjglyjump = true;glylb.glylbmain = false;glylb.glylbxg = true;
        glylb.tjglyhtml = '添加管理员';
    }
};
/*修改*/
glylb.change = function(obj){
    glylb.changeObj = obj;
    obj.status == 1 ? (glylb.status = false) : (glylb.status = true);
    obj.status == 1 ? (glylb.innerhtml = '启用') : (glylb.innerhtml = '禁用');
    glylb.glylbmain= true;glylb.glylbxg=false;glylb.tjglyjump = true;
    glylb.tjglyhtml = '返回';
};
/*确认修改密码*/
//glylb.sure_check_psw = function(){
//	//管理员列表-修改密码
//	var reg = /^([A-Za-z0-9_-]{6,14})$/;
//	if(glylb.old_psw==""){
//		layer.tips("密码不能为空","#old_psw",{
//    		tips:[1,'#c00']
//    	});
//	    return false;
//	}
//	if(glylb.new_psw==""){
//		layer.tips("新密码不能为空","#new_psw",{
//    		tips:[1,'#c00']
//    	});
//	    return false;
//	}
//	if(!reg.test(glylb.new_psw)){
//		layer.tips("密码由6到14位字母数字下划线","#new_psw",{
//    		tips:[1,'#c00']
//    	});
//	    return false;
//	}
//        $.ajax({
//            type:'post',
//            url:'/webchat/admin/update',
//            dataType:'json',
//            data:{admin_id:glylb.adminId,pwd:glylb.old_psw,newPwd:glylb.new_psw},
//            success:function(data){
//                if(data.code == 100){
//                    layer.msg('修改成功',function(){
//                        $('#tjqyh_').modal('hide');
//                        glylb.old_psw ='';glylb.new_psw='';
//                    });
//                }else if(data.code == 777){
//                    layer.tips("旧密码与原密码不一致","#old_psw",{
//                        tips:[1,'#c00']
//                    });
//                    return false;
//                }else{
//                    layer.alert('修改失败！')
//                }
//            },
//            error:function(){
//                layer.alert('请求失败');
//            }
//        })
//}
/*删除*/
glylb.del = function(adminid){
    layer.confirm('确认要删除吗?',{btn:['确认','取消']},function(){
        $.ajax({
            type:'post',
            url:'/webchat/admin/delete',
            dataType:'json',
            data:{admin_id:adminid},
            success:function(data){
                if(data.code == 100){
                    layer.msg('删除成功');
                    glylb.list();
                }else{
                    layer.alert('删除失败！')
                }
            },
            error:function(){
                layer.alert('请求失败');
            }
        })
    });
};
/*修改管理员状态的值*/
glylb.xgglyzt = function(){
    glylb.status = !glylb.status;
    glylb.status ? (glylb.innerhtml = '禁用'):( glylb.innerhtml = '启用');
}
/*添加管理员状态*/
glylb.tjglyzt = function(){
    glylb.status2 = !glylb.status2;
    glylb.status2 ? (glylb.innerhtml2 = '禁用'):( glylb.innerhtml2 = '启用');
}
/*确认修改管理员*/
glylb.surechange = function(){
	var reg_qyh = /^[0-9a-zA-Z]{1,20}$/;
    var obj = {realname:glylb.changeObj.realname,corp_id:glylb.changeObj.corp_id,valid:glylb.changeObj.valid,until:glylb.changeObj.until}
	var isPass = false;
    $.each(obj,function(key,value){
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
	if(!reg_qyh.test($.trim(glylb.changeObj.corp_id))){
		layer.tips("企业号由1到20位数字、大小写字母组成！","#xg_fzdqyh",{
    		tips:[1,'#c00']
    	});
	    return false;
	}
    var status = glylb.status == true ? '0':'1';
    var yxrqq = Date.parse(glylb.changeObj.valid)/1000;
    var yxrqz = Date.parse(glylb.changeObj.until)/1000;
       if(!isPass){
           $.ajax({
               type:'post',
               url:'/webchat/admin/updateAdminInfo',
               dataType:'json',
               /*data:{'admin_id':glylb.changeObj.admin_id,'realname':glylb.changeObj.realname,'corp_id':glylb.changeObj.corp_id,'valid':yxrqq,'until':yxrqz,'status':status},*/
               data:{admin_id:glylb.changeObj.admin_id,realname:$.trim(glylb.changeObj.realname),corp_id:$.trim(glylb.changeObj.corp_id),valid:glylb.changeObj.valid,until:glylb.changeObj.until,status:status},
               success:function(data){
                   if(data.code == 100){
                       layer.msg('修改成功',function(){
                           location.reload();
                       });
                   }else{
                       layer.alert('修改失败');
                   }
               },
               error:function(){
                   layer.alert('请求失败');
               }
           });
       }
    /*return false;*/
};
/*添加管理员*/
glylb.tjgly = function(){
	var reg = /^([A-Za-z0-9_-]{6,14})$/;
	var reg_qyh = /^[0-9a-zA-Z]{1,20}$/;
    var isPass = false;
    $.each(glylb.tjglyObj,function(key,value){
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
	if(!reg_qyh.test($.trim(glylb.tjglyObj.glyfzdqyh))){
		layer.tips("企业号由1到20位数字、大小写字母组成！","#glyfzdqyh",{
    		tips:[1,'#c00']
    	});
	    return false;
	}
    var status2 = glylb.status2 == true ? '0':'1';
   if(!isPass){
       $.ajax({
           type:'post',
           url:'/webchat/admin/insert',
           dataType:'json',
           data:{username:$.trim(glylb.tjglyObj.glyyhm),realname:$.trim(glylb.tjglyObj.glyzm),pwd:$.trim(glylb.tjglyObj.glymm),corp_id:$.trim(glylb.tjglyObj.glyfzdqyh),valid:glylb.tjglyObj.glyyxrqq,until:glylb.tjglyObj.glyyxrqz,'status':status2},
           success:function(data){
               if(data.code == 100){
                   layer.msg('添加成功');
                   location.reload();
               }else{
                   layer.msg('添加失败');
               }
           },
           error:function(){
               layer.alert('请求失败');
           }
       })
   }
}