/**
 * Created by summer on 2017/6/3.
 */
var txl = avalon.define({
    $id:'txl',
    togglez:true,
    disCss:"sjchange",
    bkxsc:'coloradd',
    dhtjtxl:avalon.noop,
    txlqr:avalon.noop,
    xzry:avalon.noop,
    ckxq:avalon.noop,
    ahtjback:avalon.noop,
    tjtxlback:avalon.noop,
    gbxq:avalon.noop,
    choosetoggle:false,
    chooseToggle:avalon.noop,
    listone:'',
    listmeun:avalon.noop,
    listchilren:avalon.noop,
    checkedAll:avalon.noop,
    checkOne:avalon.noop,
    listse:'',
    listxiang:avalon.noop,
    flmc:'',
    xjfl:avalon.noop,
    deletefl:avalon.noop,
    groupId:'',
    groupids:'0',
    groupName:avalon.noop,
    groupname:'',
    xgflmc:avalon.noop,
    datalist:'',
    listcontact:'',
    name:'',
    zw:'',
    phone:'',
    tjry:avalon.noop,
    nsrsbhXyh:'',
    tjtxlnasr:'',
    nsrsbhfunction:avalon.noop,
    nsrsbh:'',
    nsrmc:'',
    djxh:'',
    txlsure:false,
    sureadd:avalon.noop,
    ztsztj:avalon.noop,
    cxryxqxg:avalon.noop,
    deleteqy:avalon.noop,
    delettdjxh:[],
    corpid:'',
    xztree:avalon.noop,
    groupid_s:'',
    groupid_ss:[],
    treelist:[],
    deletexz:avalon.noop,
    xglxr:avalon.noop,
    xgName:'',
    xgphone:'',
    xgzw:'',
    sureChange:avalon.noop,
    data1:'',
    data2:'',
    data3:'',
    data4:'',
    dataAll:'',
    deletelxr:avalon.noop,
    xzrytwo:avalon.noop,
    qrxglxr:avalon.noop,
    xglxrsure:avalon.noop,
    sureChangeqy:avalon.noop,
    sureDelete:avalon.noop,
    page:'',
    flg:'',
    index:'',
    zcdjlx:'',
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
    szfl:avalon.noop,
    szflcxssbm:avalon.noop,
    tjxqlist:true,
    treelist_fz:"",
    treelistgrouid:[],
    delteflList:[],
    groupid_all:[],
    treelist_obj:[],
    groupid_deletefl:[],
    mainhidden:false,
    ahtj:true,
    ahtjtjry:true,
    onload:avalon.noop,
    qrtjryame:'',
    qrtjry:avalon.noop,
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
    daoru_groupId:'',
    xzmb_fun:avalon.noop
});
var localTest = layui.data('test');
var corpId = localTest.corpId;
txl.$watch('onReady',function(){
    txl.listmeun();
    txl.onload();
    txl.listxiang('',1,true);
});
txl.onload = function(){
    ///*上传文件*/
   layui.use('upload',function(){
        layui.upload({
            elem:'#filewj',
            title:'批量上传通讯录',
            url: '/webchat/enterprise/insertAll?corp_id='+corpId+"&group_id=0",//上传接口
            success: function (data) { //上传成功后的回调
                if(data.code == 100){
                    layer.alert('批量导入成功');
                    txl.listxiang(txl.daoru_groupId,1,true);
                    txl.listmeun();
                }else{
                    layer.alert('批量导入失败')
                }
            }
            ,error:function(){
                layer.alert('请求出错');
            }
        })
    });
}
txl.qrtjry = function(id){
   txl.qrtjryame = id;
}
/*验证筛选表单的数据是否符合正确格式*/
txl.validate_input_sx = function(currentPage, flg){
    txl.choosesx = true;
	//纳税人识别号的验证（非空和长度15或者18位）
	var reg= /^([0-9a-zA-Z]{18}|[0-9a-zA-Z]{15})$/;
    var len = 0;
    if(txl.nsrsbh!="" || txl.nsrmc!="" || txl.rkrqq!="" || txl.rkrqz!="" || txl.zzsq!="" || txl.zzsz!="" || txl.sdsq!="" || txl.sdsz!="" || txl.ybnsr!="" || txl.djzclxmc!="" || txl.hymc!=""){
        len = 1;
    }
    if(len<=0){
        layer.alert('请输入你的筛选条件！', {icon: 5});
        return false;
    }
    if(txl.nsrsbh != "" && !reg.test($.trim(txl.nsrsbh))){
        layer.tips("请正确输入15或者18位纳税人识别号！","#nsrsbh",{
            tips:[1,'#c00']
        });
        return false;
    }
    var data = {};
    data.rows = 10;
    data.page = currentPage;
    $.ajax({
        type:'post',
        url:'/webchat/enterprise/querySxEnterprise',
        dataType:'json',
        data:{corp_id:corpId,nsrsbh:$.trim(txl.nsrsbh),nsrmc:$.trim(txl.nsrmc),ybnsr:txl.ybnsr,djzclxmc:txl.djzclxmc,hymc:txl.hymc,rkrqq:txl.rkrqq,rkrqz:txl.rkrqz,zzsq:txl.zzsq,zzsz:txl.zzsz,sdsq:txl.sdsq,sdsz:txl.sdsz,rows:data.rows,page:data.page},
        success:function(data){
            if(data.code == 100){
                //$('#alignIcons').removeClass('open');
            txl.choosebloor = false, txl.choosemeun = true;
                txl.listse=data.list;
                if(flg){//分页只初始化一次
                    txl.paging(data.total);
                }
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
/*点击全选按钮*/
txl.checkOne = function(){
    $('.chooseAll').prop('checked',"");
}
txl.checkedAll = function(){
    if($('.chooseAll').prop('checked')){
        $.each(txl.listse,function(i,value){
            txl.delettdjxh.push(value.enterprise.djxh);
        })
    }else{
        txl.delettdjxh=[];
    }
}
/*菜单详情*/
txl.listxiang = function(groupid,currentPage, flg){
    txl.daoru_groupId = groupid;
    txl.choosesx = false;txl.choosebloor = false, txl.choosemeun = true;
    txl.delettdjxh=[];$('.chooseAll').prop('checked','');
    txl.mainhidden=false;
    txl.ahtj=true;
    txl.ahtjtjry=true;
    txl.nsrsbh='';txl.nsrmc='';txl.ybnsr='';txl.djzclxmc='';txl.hymc='';txl.rkrqq='';txl.rkrqz='';txl.zzsq='';txl.zzsz='';txl.sdsq='';txl.sdsz='';
    if(!groupid){
    $('.parentList .listGrout li p').removeClass('backblue color_f');
       $('#all').addClass('backblue color_f');
   }else{
       $('#'+groupid).addClass('backblue color_f').parent('li').parent('ul').siblings('ul').children('li').children('p').removeClass('backblue color_f');
       $('#all').removeClass('backblue color_f');
   }
    txl.corpid = corpId;
    var data = {};
    data.rows = 10 ;
    data.page = currentPage;
    txl.page=currentPage;
    txl.groupids = groupid;
    txl.flg = flg;
    $('.layui-upload-button form').attr('action','/webchat/enterprise/insertAll?corp_id='+corpId+"&group_id="+groupid);
    setTimeout(function(){
        $.ajax({
            type:'post',
            url:'/webchat/enterprise/queryByGropId',
            dataType:'json',
            data:{corp_id:txl.corpid,group_id:groupid,rows:data.rows,page:txl.page},
            success:function(data){
                if(data.code == 100){
                    txl.listse=data.list;
                    if(txl.listse.length == 0){
                        layer.msg('没有查出相关数据!')
                    }
                    if(flg){//分页只初始化一次
                        txl.paging(data.total);
                    }
                }else{
                    layer.alert('没有数据')
                }
            },
            error:function(){
                layer.alert('请求失败');
            }
        })
    },1000)
}
/*菜单栏*/
txl.listmeun = function(){
    $.ajax({
        type:'post',
        url:'/webchat/group/queryList',
        dataType:'json',
        data:{corp_id:corpId,p_group_id:0},
        success:function(data){
            if(data.code == 100){
                txl.listone=data.list;
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
}
/*获取选择树形的name*/
txl.xztree = function(name,groupid){
    txl.groupid_deletefl.remove(groupid);
    if(txl.treelist_fz.length == 0){
        txl.treelist_fz.push({'group_name':name,'group_id':groupid});
        return;
    }
    var hastree = true;
    $.each(txl.treelist_fz,function(i,value){
        if(value.group_name == name){
            hastree = false;
            return false;
        }
    });
    if(hastree){
        txl.treelist_fz.push({'group_name':name,'group_id':groupid});
    }else{
        layer.alert('这项已经选择过了,请重新选择');
    }
}
/*删除选择了的*/
txl.deletexz = function(deletxz,groupid,index){
    if(index == 0){
        txl.treelist_fz.shift();
    }else{
        txl.treelist_fz.splice(index,1);
    }
    txl.groupid_deletefl.push(groupid);
};
/*删除分类*/
txl.deletefl = function(groupId,groupname){
    layer.confirm('确认删除'+groupname+'分类吗？',function(){
        $.ajax({
            type:'post',
            url:'/webchat/group/delete',
            dataType:'json',
            data:{corp_id:corpId,group_id:groupId},
            success:function(data){
                if(data.code == 100){
                    layer.msg('删除成功',function(){
                       /* txl.listmeun();*/
                        location.reload();
                    })
                }else{
                    layer.alert('删除失败')
                }
            },
            error:function(){
                layer.alert('请求失败');
            }
        })
    })
}
/*修改分类名称*/
txl.groupName = function(obj){
    txl.groupId = obj;
};

txl.xgflmc = function(){
	//企业通讯录——(左侧列表)修改分类名称验证
	var reg = /^.{1,20}$/;
	if(txl.groupname==""){
		layer.tips("分类名称不能为空","#groupname",{
    		tips:[1,'#c00']
    	});
        return false;
	}
	if(!reg.test(txl.groupname)){
		layer.tips("分类名称位数过长！","#groupname",{
    		tips:[1,'#c00']
    	});
		return false;
	}
    $.ajax({
        type:'post',
        url:'/webchat/group/update',
        dataType:'json',
        data:{corp_id:corpId,group_id:txl.groupId,group_name:txl.groupname},
        success:function(data){
            $('#changeName').modal('hide');
            if(data.code == 100){
                layer.msg('修改名称成功',function(){
                    txl.listmeun();
                });
            }else{
                layer.alert('修改名称失败！')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
}
/*新建分类*/
txl.xjfl = function(){
	//通讯录-新建分类验证分类名称
	var reg = /^.{1,20}$/;
	if(txl.flmc==""){
		layer.tips("分类名称不能为空","#add_flmc",{
    		tips:[1,'#c00']
    	});
        return false;
	}
	if(!reg.test(txl.flmc)){
		layer.tips("分类名称位数过长！","#add_flmc",{
    		tips:[1,'#c00']
    	});
		return false;
	}
	$.ajax({
        type:'post',
        url:'/webchat/group/insert',
        dataType:'json',
        data:{corp_id:corpId,group_name:txl.flmc,p_group_id:0},
        success:function(data){
            if(data.code == 100){
                $('#newFl_').modal('hide');
                layer.msg('添加成功',function(){
                    txl.listmeun();
                })
            }else{
                layer.alert('添加失败')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
}
/*选择框添加颜色*/
txl.chooseToggle = function(nsrsbh,nsrmc,djxh){
    txl.choosetoggle = !txl.choosetoggle;
    txl.nsrmc = nsrmc;
    txl.nsrsbh = nsrsbh;
    txl.djxh = djxh;
    txl.txlsure = true;
    $('#inaddTxl').attr('data-dismiss','modal')
}
/*单户添加通讯录*/
txl.dhtjtxl = function(){
    txl.mainhidden= !txl.mainhidden;
    txl.ahtj= !txl.ahtj;
    txl.delettdjxh = [];
    $('.chooseAll').prop('checked',"");
}
/*通讯录确认 */
txl.txlqr = function(){
    if(txl.txlsure){
        txl.ahtjtjry = false;
        txl.mainhidden=true;
        txl.ahtj=true;
    }else{
        layer.alert('请选择需要添加的用户');
    };
}
/*新增人员*/
txl.xzry = function(){
    $('.slider_right .content_right').css('width','60%');
    $('.addry').removeClass('hide');
    $('.slider_right .content_right').css('margin-right','10px');
}
/*查看详情*/
txl.ckxq = function(enterprise,contacts,index){
    txl.tjxqlist = false;
     txl.datalist = enterprise;
     txl.listcontact = contacts;
 }
/*添加通讯录返回键*/
txl.tjtxlback = function(){
    txl.mainhidden=false;
    txl.ahtj=true;
    txl.ahtjtjry=true
}
/*关闭详情页面*/
txl.gbxq = function(){
    txl.tjxqlist = true;
}
txl.xzrytwo = function(djxh){
    txl.djxh = djxh;
}
/*添加人员*/
txl.tjry = function(){
    //企业通讯录——添加人员验证
    var reg = /[\u4e00-\u9fa5]/g;
    var reg_tel = /^((0\d{2,3}\d{7,8})|(1[35847]\d{9}))$/;
    //姓名验证
    if(txl.name==""){
        layer.tips("姓名不能为空","#add_name",{
            tips:[1,'#c00']
        });
        return false;
    }
    if(!reg.test(txl.name)){
        layer.tips("请输入正确的姓名","#add_name",{
            tips:[1,'#c00']
        });
        return false;
    }
    //职务验证
    if(txl.zw==""){
        layer.tips("职务不能为空","#add_zw",{
            tips:[1,'#c00']
        });
        return false;
    }
    if(!reg.test(txl.zw)){
        layer.tips("请输入正确的职务","#add_zw",{
            tips:[1,'#c00']
        });
        return false;
    }
    //电话号码验证
    if(txl.phone==""){
        layer.tips("电话号码不能为空","#add_phone",{
            tips:[1,'#c00']
        });
        return false;
    }
    if(!reg_tel.test(txl.phone)){
        layer.tips("请输入正确的电话号码","#add_phone",{
            tips:[1,'#c00']
        });
        return false;
    }
    $.ajax({
        type:'post',
        url:'/webchat/contact/insert',
        dataType:'json',
        data:{crop_id:corpId,djxh:txl.djxh,name:txl.name,telephone:txl.phone,position:txl.zw,contact_type:'2',status:'0'},
        success:function(data){
            if(data.code == 100){
                $('#addRy').modal('hide');
                layer.msg('添加成功',function(){
                    txl.name='';
                    txl.phone='';
                    txl.zw='';
                    if(txl.qrtjryame == 'qrtjry'){txl.nsrsbhfunction();}
                    else if(txl.qrtjryame == 'webchatAnd'){txl.cxryxqxg();txl.listxiang(txl.groupids,txl.page,txl.flg);}
                })
            }else{
                layer.alert('添加失败',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
}
/*查找信用代码*/
txl.nsrsbhfunction = function(){
   if(txl.nsrsbhXyh){
       $('#modeladd').attr('data-target','#addnsr_');
       $.ajax({
           type:'post',
           url:'/webchat/webservice/queryByNsrsbh',
           dataType:'json',
           data:{corp_id:corpId,nsrsbh:txl.nsrsbhXyh,group_id:txl.groupids},
           success:function(data){
               if(data.code == 100){
                  txl.tjtxlnasr = data.list;
               }else{
                   layer.alert('查询失败!')
               }
           },
           error:function(){
               layer.alert('请求失败');
           }
       })
   }else{
       layer.alert('请输入纳税人识别号或社会信用代码');
   }
}
/*确认添加联系人*/
txl.sureadd = function(){
    $.ajax({
        type:'post',
        url:'/webchat/weiXinContact/insertInfo',
        dataType:'json',
        data:{corp_id:corpId,djxh:txl.djxh/*,dept_name:txl.nsrmc,contact_type:'2',group_id:txl.groupids*/},
        beforeSend:function(){
            var layer;
            layui.use('layer', function(){
                layer= layui.layer;
                layer.load(0,{shade:false});
            });
        },
        success:function(data){
            if(data.code == 100){
                layer.alert('确认添加成功',{icon:6},function(){
                    txl.mainhidden=false;txl.ahtj=true;txl.ahtjtjry=true;
                    location.reload();
                });
            }else if(data.code==888){
                layer.alert('微信端同步失败!',{icon:5});
            }else {
                layer.alert('添加异常!',{icon:5});
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
}
/*人员详情中的联系人*/
txl.cxryxqxg = function(){
    $.ajax({
        type:'post',
        url:'/webchat/contact/queryContactByDjxh',
        dataType:'json',
        data:{djxh:txl.datalist.djxh},
        success:function(data){
            if(data.code == 100){
               txl.listcontact = data.list;
            }else{
                layer.alert('查询人员详情失败!',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
}
/*修改状态*/
txl.ztsztj = function(zt,contactsid,name,phone,position){
    var old_status =( zt == 1 || zt == 2) ?'0':'1';
    data1 = {crop_id:corpId,name:name,telephone:phone,old_status:old_status,status:zt,contacts_id:contactsid,djxh:txl.datalist.djxh,position:position};
    data2 = {crop_id:corpId,old_status:old_status,status:zt,contacts_id:contactsid,djxh:txl.datalist.djxh}
    data = zt == 1? data1 : data2 ;
    layer.confirm('确认修改通讯录吗？',function(){
        $.ajax({
            type:'post',
            url:'/webchat/contact/changeStatus',
            dataType:'json',
            data:data,
            success:function(data){
                if(data.code == 100){
                    layer.msg('修改成功',function(){
                        txl.cxryxqxg();
                        txl.listxiang(txl.groupids,txl.page,txl.flg);
                    });
                }else{
                    layer.alert('修改失败!',{icon:5})
                }
            },
            error:function(){
                layer.alert('请求失败',{icon:5});
            }
        })
    })
}
txl.deleteqy = function(){
    layer.confirm('确认要删除吗？',function(){
        $.ajax({
            type:'post',
            url:'/webchat/enterprise/deleteEnterprise',
            dataType:'json',
            data:{djxhList:txl.delettdjxh},
            success:function(data){
                if(data.code == 100){
                    layer.alert('删除成功',{icon:6},function(){
                        location.reload();
                        txl.delettdjxh =[];
                        $('.chooseAll').prop('')
                    });
                }else{
                    layer.alert('删除失败!',{icon:5})
                }
            },
            error:function(){
                layer.alert('请求失败',{icon:5});
            }
        })
    })
}

/*设置通讯录分组*/
txl.sztxlfz=function(djxh,group_id,corp_id){
    txl.data4 = {djxh:djxh,group_id:group_id};
    $.ajax({
        type:'post',
        url:'/webchat/contact/addEnterprise',
        dataType:'json',
        data:txl.data4,
        success:function(data){
            if(data.code == 100){
                layer.alert('修改成功',{icon:6},function(){
                    location.reload();
                });
            }else{
                layer.alert('修改失败!',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })

}




/*修改本地联系人状态*/
txl.xglxrzt=function(status,cotacts_id) {
    txl.data3 = {status: status, cotacts_id: cotacts_id};
    $.ajax({
        type: 'post',
        url: '/webchat/contact/changeLocalStatus',
        dataType: 'json',
        data: txl.data3,
        success: function (data) {
            if (data.code == 100) {
                layer.msg('修改成功', function () {
                    txl.cxryxqxg();
                    txl.listxiang(txl.groupids,txl.page,txl.flg);
                });
            } else {
                layer.alert('修改失败!', {icon: 5})
            }
        },
        error: function () {
            layer.alert('请求失败', {icon: 5});
        }
    })
}
/*修改联系人*/
txl.xglxr = function(telephone,name,position,contact_type,contacts_id,crop_id,status,djxh,enterprise_contacts_id){
    txl.xgphone = telephone;
    txl.xgName = name;
    txl.xgzw = position;
    txl.data1 = {contact_type:contact_type,contacts_id:contacts_id,crop_id:crop_id,status:status,djxh:djxh,enterprise_contacts_id:enterprise_contacts_id};
    status == 2 ? ($('#xgphone').prop('readonly','readonly')):($('#xgphone').prop('readonly',''));
};
/*修改联系人*/
txl.xglxrsure = function(children){
    txl.xgphone =children.telephone;
    txl.xgName = children.name;
    txl.xgzw = children.position;
    txl.data1 = {contacts_id:children.contacts_id,status:children.status};
};
/*确认添加中的修改人员参数*/
txl.sureChangeqy = function(){
    txl.data2 = {telephone:txl.xgphone,name:txl.xgName,position:txl.xgzw};
    txl.dataAll =Object.assign(txl.data2,txl.data1);
    //验证修改人员参数
    var reg = /[\u4e00-\u9fa5]/g;
    var reg_tel = /^((0\d{2}\d{8})|(1[3584]\d{9})|(\d{8}))$/;
    //姓名验证
    if(txl.xgName==""){
        layer.tips("姓名不能为空","#changeRyqr_xgName",{
            tips:[1,'#c00']
        });
        return false;
    }
    if(!reg.test(txl.xgName)){
        layer.tips("请输入正确的姓名","#changeRyqr_xgName",{
            tips:[1,'#c00']
        });
        return false;
    }
    //职务验证
    if(txl.xgzw==""){
        layer.tips("职务不能为空","#changeRyqr_xgzw",{
            tips:[1,'#c00']
        });
        return false;
    }
    if(!reg.test(txl.xgzw)){
        layer.tips("请输入正确的职务","#changeRyqr_xgzw",{
            tips:[1,'#c00']
        });
        return false;
    }
    //电话号码验证
    if(txl.xgphone==""){
        layer.tips("电话号码不能为空","#changeRyqr_xgphone",{
            tips:[1,'#c00']
        });
        return false;
    }
    if(!reg_tel.test(txl.xgphone)){
        layer.tips("请输入正确的电话号码","#changeRyqr_xgphone",{
            tips:[1,'#c00']
        });
        return false;
    }else{
        $('#changeRyqr').modal('hide');
    }
    $.ajax({
        type:'post',
        url:'/webchat/contact/changeLocalStatus',
        dataType:'json',
        data:txl.dataAll,
        success:function(data){
            if(data.code == 100){
                $('#changeRyqr').modal('hide');
                layer.msg('修改成功',function(){
                    txl.nsrsbhfunction();
                });
            }else{
                layer.alert('修改失败!',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
}
/*确认添加中的删除人员参数*/
txl.sureDelete = function(children){
    layer.confirm('确认要删除吗？',function(){
        $.ajax({
            type:'post',
            url:'/webchat/contact/deleteLocalContact',
            dataType:'json',
            data:{crop_id:children.crop_id,contacts_id:children.contacts_id,enterprise_contacts_id:children.enterprise_contacts_id},
            success:function(data){
                if(data.code == 100){
                    layer.msg('删除成功',function(){
                        txl.nsrsbhfunction();
                    });
                }else{
                    layer.alert('删除失败!',{icon:5})
                }
            },
            error:function(){
                layer.alert('请求失败',{icon:5});
            }
        })
    })
}
/*修改人员参数*/
txl.sureChange = function(){
    txl.data2 = {telephone:txl.xgphone,name:txl.xgName,position:txl.xgzw};
    txl.dataAll =Object.assign(txl.data2,txl.data1);
    //验证修改人员参数
    var reg = /[\u4e00-\u9fa5]/g;
   var reg_tel = /^((0\d{2,3}\d{7,8})|(1[3584]\d{9}))$/;
    //姓名验证
    if(txl.xgName==""){
    	layer.tips("姓名不能为空","#xgName",{
    		tips:[1,'#c00']
    	});
        return false;
    }
    if(!reg.test(txl.xgName)){
    	layer.tips("请输入正确的姓名","#xgName",{
    		tips:[1,'#c00']
    	});
        return false;
    }
    //职务验证
    if(txl.xgzw==""){
    	layer.tips("职务不能为空","#xgzw",{
    		tips:[1,'#c00']
    	});
        return false;
    }
    if(!reg.test(txl.xgzw)){
    	layer.tips("请输入正确的职务","#xgzw",{
    		tips:[1,'#c00']
    	});
        return false;
    }
    //电话号码验证
    if(txl.xgphone==""){
    	layer.tips("电话号码不能为空","#xgphone",{
    		tips:[1,'#c00']
    	});
        return false;
    }
    if(!reg_tel.test(txl.xgphone)){
    	layer.tips("请输入正确的电话号码","#xgphone",{
    		tips:[1,'#c00']
    	});
        return false;
    }

    $.ajax({
        type:'post',
        url:'/webchat/contact/update',
        dataType:'json',
        data:txl.dataAll,
        success:function(data){
            if(data.code == 100){
                layer.msg('修改成功',function(){
                    $("#changeRy").modal("hide");
                    txl.listxiang(txl.groupids,txl.page, txl.flg);
                    txl.cxryxqxg();
                });
            }else{
                layer.alert('修改失败!',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    });

}
/*删除联系人*/
txl.deletelxr = function(cropId,contactsId,enterpriseContactsId){
    layer.confirm('确认要删除该联系人吗？',function(){
        $.ajax({
            type:'post',
            url:'/webchat/contact/delete',
            dataType:'json',
            data:{crop_id:cropId,contacts_id:contactsId,enterprise_contacts_id:enterpriseContactsId},
            success:function(data){
                if(data.code == 100){
                    layer.msg('删除成功',function(){
                        txl.cxryxqxg();
                        txl.listxiang(txl.groupids,txl.page,txl.flg);
                    });
                }else{
                    layer.alert('删除失败!',{icon:5})
                }
            },
            error:function(){
                layer.alert('请求失败',{icon:5});
            }
        })
    })
};
/*确认添加中的修改状态*/
txl.qrxglxr = function(status,contactsId){
    layer.confirm('确认要修改联系人状态吗？',function(){
        $.ajax({
            type:'post',
            url:'/webchat/contact/qrxglxr',
            dataType:'json',
            data:{status:status,contacts_id:contactsId},
            success:function(data){
                if(data.code == 100){
                    layer.msg('修改成功',function(){
                        txl.nsrsbhfunction();
                    });
                }else{
                    layer.alert('修改失败!',{icon:5})
                }
            },
            error:function(){
                layer.alert('请求失败',{icon:5});
            }
        })
    })
}
/*设置分类查询所属部门*/
txl.szfl = function(){
    $.each(txl.treelist_fz,function(i,value){
        txl.groupid_all.push( value.group_id);
    });
    //if(txl.groupid_all.length==0){
    //    layer.tips("至少需要一个分组","#szflsure",{
    //        tips:[1,'#c00']
    //    });
    //    return false;
    //}
    txl.groupid_all = (txl.groupid_all.length == 0?[0]:txl.groupid_all);
    $.ajax({
        type:'post',
        url:'/webchat/enterprise/addGroup',
        dataType:'json',
        data:{djxhList:txl.delettdjxh.$model,groupList:txl.groupid_all,corp_id:corpId},
        success:function(data){
            if(data.code == 100){
                layer.msg('设置分类成功',function(){
                    location.reload();
                })
            }else{
                layer.alert('设置分类失败',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
}
/*设置分类查询所属部门*/
txl.szflcxssbm = function(){
    if(txl.delettdjxh.length==0){
        layer.tips("请选择需要设置分组的企业","#cxssdjxh",{
            tips:[1,'#c00']
        });
        return false;
    }
    $.ajax({
        type:'post',
        url:'/webchat/group/queryGroupIdByDjxh',
        dataType:'json',
        data:{djxhList:txl.delettdjxh.$model},
        success:function(data){
            if(data.code == 100){
                txl.treelist_fz = data.list;
                $.each(txl.treelist_fz,function(i,value){
                    txl.treelistgrouid.push(value.group_id);
                    txl.treelist.push(value.group_name);
                })
            }else{
                layer.alert('查询失败',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
};

/*
 *  传页码参数
 * */
txl.paging = function(total){
    layui.use(['laypage', 'layer'], function(){
        var laypage = layui.laypage
            ,layer = layui.layer;
        laypage({
            cont: $("#txlpafe")
            ,pages : total % 10 > 0 ? (total / 10) + 1 : total / 10
            ,skin: '#1E9FFF'
            ,skip : true
            ,groups : 3,
            jump:function(obj,first){
                if(!first){
                    if(txl.choosesx){
                        txl.validate_input_sx(obj.curr,false);
                    }else{
                        txl.listxiang(txl.groupids,obj.curr,false);
                    }
                }
            }
        });
    });
}
/*筛选功能的下拉功能（带模糊查询的）*/
txl.myFunction = function(){
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
                txl.sshymcList = data.sxmhtj[0].allHymc;
            }else{
                layer.alert('查询失败',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
};
txl.selectValue = function(sshymc){
    var  sshy_obj = document.getElementById("sshy_select");
    var input = document.getElementById("hymc");
    input.value = sshymc;
    sshy_obj.style.display="none";

};
txl.myFunction_djzclx = function(){
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
                txl.djzclxmcList = data.sxmhtj[0].allDjzclxmc;
            }else{
                layer.alert('查询失败',{icon:5})
            }
        },
        error:function(){
            layer.alert('请求失败',{icon:5});
        }
    })
};

txl.selectValue_djzclx = function(djzxlxmc){
    var djzclx_obj = document.getElementById("djzclxmc_select");
    var input = document.getElementById("djzclxmc");
    input.value = djzxlxmc;
    djzclx_obj.style.display="none";

};
/*解决dropdown下拉菜单隐藏的问题*/
txl.dropdown_menu_no = function(e){
    e.stopPropagation();
};
txl.bodyclose = function(){
    if(!txl.choosemeun){
        txl.choosemeun = true;txl.choosebloor = false;
    }
}
/*批量导入通讯录-模板下载*/
txl.xzmb_fun = function(){
    var index = layer.confirm('是否确定下载批量导入模板？',function(){
        window.open("/webchat/template/template_ManyImport.xls");
        layer.close(index);
    });
};
