$(function(){
	var layer;
	var index;
	layui.use('layer', function(){
		layer= layui.layer;
	});
	(function($){

		//首先备份下jquery的ajax方法
		var _ajax=$.ajax;

		//重写jquery的ajax方法
		$.ajax=function(opt){
			//备份opt中error和success方法
			var fn = {
				error:function(XMLHttpRequest, textStatus, errorThrown){},
				success:function(data, textStatus){}
			}
			if(opt.error){
				fn.error=opt.error;
			}
			if(opt.success){
				fn.success=opt.success;
			}

			//扩展增强处理
			var _opt = $.extend(opt,{
				error:function(XMLHttpRequest, textStatus, errorThrown){
					//错误方法增强处理
					layer.alert('连接服务器失败，请稍后重试！')
					fn.error(XMLHttpRequest, textStatus, errorThrown);
				},
				success:function(data, textStatus){
					if(data.code == 888){
						layer.alert('未登录，请重新登录！',function(){
							window.location.href='/login.html';
						});
						return false;
					}

					if(data.code == 666){
						layer.alert('无权限访问！');
						return false;
					}
					//成功回调方法增强处理
					fn.success(data, textStatus);
				},
				beforeSend:function(XHR){
					//提交前回调方法
					index = layer.load(0);

				},
				complete:function(XHR, TS){
					//请求完成后回调函数 (请求成功或失败之后均调用)。
					layer.close(index);
				}
			});
			return _ajax(_opt)
		};
	})(jQuery);
});

// QQ表情插件
//(function($){
//	$.fn.qqFace = function(options){
//		var defaults = {
//			id : 'facebox',
//			path : '/../../static/images/face/',
//			assign : 'content',
//			tip : 'em_'
//		};
//		var option = $.extend(defaults, options);
//		var assign = $('#'+option.assign);
//		var id = option.id;
//		var path = option.path;
//		var tip = option.tip;
//
//		if(assign.length<=0){
//			alert('缺少表情赋值对象。');
//			return false;
//		}
//
//		$(this).click(function(e){
//			var strFace, labFace;
//			if($('#'+id).length<=0){
//				strFace = '<div id="'+id+'" style="position:absolute;display:none;z-index:1000;" class="qqFace">' +
//				'<table border="0" cellspacing="0" cellpadding="0"><tr>';
//				for(var i=1; i<=75; i++){
//					labFace = '['+tip+i+']';
//					strFace += '<td><img src="'+path+i+'.gif" onclick="$(\'#'+option.assign+'\').setCaret();$(\'#'+option.assign+'\').insertAtCaret(\'' + labFace + '\');" /></td>';
//					if( i % 15 == 0 ) strFace += '</tr><tr>';
//				}
//				strFace += '</tr></table></div>';
//			}
//			$(this).parent().append(strFace);
//			var offset = $(this).position();
//			var top = offset.top + $(this).outerHeight();
//			$('#'+id).css('top',top);
//			$('#'+id).css('left',offset.left);
//			$('#'+id).show();
//			e.stopPropagation();
//		});
//
//		$(document).click(function(){
//			$('#'+id).hide();
//			$('#'+id).remove();
//		});
//	};
//
//})(jQuery);
//
//jQuery.extend({
//	unselectContents: function(){
//		if(window.getSelection)
//			window.getSelection().removeAllRanges();
//		else if(document.selection)
//			document.selection.empty();
//	}
//});
//jQuery.fn.extend({
//	selectContents: function(){
//		$(this).each(function(i){
//			var node = this;
//			var selection, range, doc, win;
//			if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection()) && typeof selection.removeAllRanges != 'undefined'){
//				range = doc.createRange();
//				range.selectNode(node);
//				if(i == 0){
//					selection.removeAllRanges();
//				}
//				selection.addRange(range);
//			} else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())){
//				range.moveToElementText(node);
//				range.select();
//			}
//		});
//	},
//
//	setCaret: function(){
//		if(!$.browser.msie) return;
//		var initSetCaret = function(){
//			var textObj = $(this).get(0);
//			textObj.caretPos = document.selection.createRange().duplicate();
//		};
//		$(this).click(initSetCaret).select(initSetCaret).keyup(initSetCaret);
//	},
//
//	insertAtCaret: function(textFeildValue){
//		var textObj = $(this).get(0);
//		if(document.all && textObj.createTextRange && textObj.caretPos){
//			var caretPos=textObj.caretPos;
//			caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ?
//			textFeildValue+'' : textFeildValue;
//		} else if(textObj.setSelectionRange){
//			var rangeStart=textObj.selectionStart;
//			var rangeEnd=textObj.selectionEnd;
//			var tempStr1=textObj.value.substring(0,rangeStart);
//			var tempStr2=textObj.value.substring(rangeEnd);
//			textObj.value=tempStr1+textFeildValue+tempStr2;
//			textObj.focus();
//			var len=textFeildValue.length;
//			textObj.setSelectionRange(rangeStart+len,rangeStart+len);
//			textObj.blur();
//		}else{
//			textObj.value+=textFeildValue;
//		}
//	}
//});
//$(function () { $("[data-toggle='tooltip']").tooltip(); });