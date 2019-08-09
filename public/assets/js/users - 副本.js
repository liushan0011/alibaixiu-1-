// 主要是用于操作用户的 
var userArr = new Array();
// 将用户列表展示出来 
$.ajax({
    type:'get',
    url:'/users',
    success:function(res){
        userArr = res;
        render(userArr);
    }
})

// 用于调用template方法 
function render(arr){   
   var str =  template('userTpl',{
        list:arr
    });
    // console.log(str);
    $('tbody').html(str);
}

// 添加用户功能 
$('#userAdd').on('click',function(){
    // console.log($('#userForm').serialize());
    // return;
    $.ajax({
        url:'/users',
        type:'post',
        data:$('#userForm').serialize(),
        success:function(res){
            userArr.push(res);
            render(userArr);
        }
    });
});

// 当用户选择文件的时候
$('#avatar').on('change', function () {
	// 用户选择到的文件
	// this.files[0]
	var formData = new FormData();
	formData.append('avatar', this.files[0]);

	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		// 告诉$.ajax方法不要解析请求参数
		processData: false,
		// 告诉$.ajax方法不要设置请求参数的类型
		contentType: false,
		success: function (response) {
			// 实现头像预览功能
            $('#preview').attr('src', response[0].avatar);
            // 将图片的地址添加到表单里面的隐藏域
			$('#hiddenAvatar').val(response[0].avatar)
		}
	})
});


// 编辑用户功能 
$('tbody').on('click','.edit',function(){
    // 获取tr元素
    var trObj = $(this).parents('tr');
    
    var imgSrc = trObj.children().eq(1).children().attr('src');
    


    $('#email').val(trObj.children().eq(2).text());
    $('#nickName').val(trObj.children().eq(3).text());
   
    var status = trObj.children().eq(4).text();
    var role = trObj.children().eq(5).text();

    if(status == '激活'){
        $('#jh').prop('checked',true)
    }else{
        $('#wjh').prop('checked',true)
    }

    if(role == '超级管理员'){
        $('#admin').prop('checked',true)
    }else{
        $('#normal').prop('checked',true)
    }

    $("#userAdd").hide();
    $('#userEdit').show();

});