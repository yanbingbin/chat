
/*聊天信息*/
function show(headSrc,str,className){
	var html="<div class="+className+"><div class='msg'><img src="+headSrc+" />"+
	"<p><i class='msg_input'></i>"+str+"</p></div></div>";
	upView(html);
}
/*更新视图*/
function upView(html){
	$('.message').append(html);
	$('body,html').animate({scrollTop:$('.message').outerHeight()-window.innerHeight},200);// 自动将页面移动到最底部
	// $("body").animate({scrollTop:top})不被Firefox支持,而被chrome支持
	// $("html").animate({scrollTop:top})而被chrome支持,而被Firefox支持
}


var flag = true; // 防止连续点击提交消息
var message = ''; // 接收接口返回的数据


$(function(){
	$('.footer').on('keyup','input',function(){
		if($(this).val().length>0){
			$(this).next().css('background','#114F8E');
		
		}else{
			$(this).next().css('background','#ddd');
		}
	});
	$('.footer p').click(function(){
		if($(this).prev().val() == '') return;
		if(flag){
			flag = false;
		
			console.log($(this).prev().val());
			 $.ajax({
			      type: "post",
			      dataType: "json",
			      url: "http://www.tuling123.com/openapi/api",
			      data:{
			      	key:"fd858f311a7444888d1516fd55b86459", //这里的key需要自己去图灵机器人申请
			      	info:$(this).prev().val(),
			      	userid:"123456"
			      },
			      success: function (data) {
			      	flag = true;
			      	// console.log(data); {code:10000,text:"返回的信息"}
			      	message = data.text;

					show("./images/touxiangm.png",$(".footer input").val(),"show");
					setTimeout(function(){
						show("images/touxiang.png",message,"send");
					},500);	
					$(".footer input").val("").next().css('background','#ddd');//清空input
			      }
	    	});
	 	}	
	});
});

