/**
 * Created by summer on 2017/8/7.
 */
var swrytxl = avalon.define({
    $id:'swrytxl',
    txLlistfun:avalon.noop,
    txLlist:"",
    listSwry:''
});
swrytxl.$watch('onReady',function(){
    swrytxl.txLlistfun();
});
swrytxl.txLlistfun = function(){
    $.ajax({
        type:'post',
        url:'/webchat/contact/queryByContact_type',
        dataType:'json',
        // data:{chat_id:chatid},
        success:function(data){
            if(data.code == 100){
                swrytxl.listSwry = data.list;
                // webChat.listcontent= data.list;
                // $('#foucs').focus();$('#foucs').blur();$('.chat-textarea textarea').focus();
            }else{
                layer.alert('请求数据失败！')
            }
        },
        error:function(){
            layer.alert('请求失败');
        }
    })
}
// txl.listxiang = function(groupid,currentPage, flg){
//     txl.daoru_groupId = groupid;
//     txl.choosesx = false;txl.choosebloor = false, txl.choosemeun = true;
//     txl.delettdjxh=[];$('.chooseAll').prop('checked','');
//     txl.mainhidden=false;
//     txl.ahtj=true;
//     txl.ahtjtjry=true;
//     txl.nsrsbh='';txl.nsrmc='';txl.ybnsr='';txl.djzclxmc='';txl.hymc='';txl.rkrqq='';txl.rkrqz='';txl.zzsq='';txl.zzsz='';txl.sdsq='';txl.sdsz='';
//     if(!groupid){
//         $('.parentList .listGrout li p').removeClass('backblue color_f');
//         $('#all').addClass('backblue color_f');
//     }else{
//         $('#'+groupid).addClass('backblue color_f').parent('li').parent('ul').siblings('ul').children('li').children('p').removeClass('backblue color_f');
//         $('#all').removeClass('backblue color_f');
//     }
//     txl.corpid = corpId;
//     var data = {};
//     data.rows = 10 ;
//     data.page = currentPage;
//     txl.page=currentPage;
//     txl.groupids = groupid;
//     txl.flg = flg;
//     $('.layui-upload-button form').attr('action','/webchat/enterprise/insertAll?corp_id='+corpId+"&group_id="+groupid);
//     $.ajax({
//         type:'post',
//         url:'/webchat/enterprise/queryByGropId',
//         dataType:'json',
//         data:{corp_id:txl.corpid,group_id:groupid,rows:data.rows,page:txl.page},
//         success:function(data){
//             if(data.code == 100){
//                 txl.listse=data.list;
//                 if(txl.listse.length == 0){
//                     layer.msg('没有查出相关数据!')
//                 }
//                 if(flg){//分页只初始化一次
//                     txl.paging(data.total);
//                 }
//             }else{
//                 layer.alert('没有数据')
//             }
//         },
//         error:function(){
//             layer.alert('请求失败');
//         }
//     })
// }