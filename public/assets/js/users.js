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


var userId;
// 编辑用户功能 
$('tbody').on('click','.edit',function(){
    // 保存当前被修改的这个用户的id
    userId = $(this).parent().attr('data-id');

    $('#userForm > h2').text('修改用户');

   // 先获取 当前被点击这个元素的祖先 叫tr 
    var trObj = $(this).parents('tr');

    // 获取图片的地址
    var imgSrc = trObj.children().eq(1).children('img').attr('src');
    // 将图片的地址写入到隐藏域 
    $('#hiddenAvatar').val(imgSrc);
    // 如果imgSrc有值 我们
    if(imgSrc){
        $('#preview').attr('src',imgSrc);
    }else{
        $('#preview').attr('src',"../assets/img/default.png");
    }

    // 将对应的内容写入到左边的输入框里面
    $('#email').val(trObj.children().eq(2).text());
    $('#nickName').val(trObj.children().eq(3).text());

    var status = trObj.children().eq(4).text();
    if(status == '激活'){
        $('#jh').prop('checked',true);
    }else{
        $('#wjh').prop('checked',true);
    }

    var role = trObj.children().eq(5).text();

    if(role == '超级管理员'){
        $('#admin').prop('checked',true);
    }else{
        $('#normal').prop('checked',true);
    }

    // 当我们点击编辑按钮时 将添加按钮隐藏 同时将修改按钮 显示出来 
    $('#userAdd').hide();
    $('#userEdit').show();


});

// 完成修改用户功能 
$('#userEdit').on('click',function(){
    //console.log($('#userForm').serialize());
    // 我们需要发送ajax给服务器时 需要传递Id 
    $.ajax({
        type:'put',
        url:'/users/'+userId,
        data:$('#userForm').serialize(),
        success:function(res){
            // 我们只是将数据库里面的数据给修改 但是我们将userArr这个数组里面的元素给修改
            // 我们要从userArr这个数组中 将要修改这个数组元素找出来 
            var index = userArr.findIndex(item=>item._id == userId);
            // 根据这个index找到数组的这个元素 将它的数据更新 
            userArr[index] = res;
            // 调用render方法 重新渲染页面 
            render(userArr);

            // 修改用户以后将表单数据还原
            $('#userForm > h2').text('添加新用户');
            $('#hiddenAvatar').val("");
            $('#preview').attr('src',"../assets/img/default.png");
            $('#userAdd').show();
            $('#userEdit').hide();
            $('#email').val("");
            $('#nickName').val("");
            $('#admin').prop('checked',false);
            $('#normal').prop('checked',false);
            $('#jh').prop('checked',false);
            $('#wjh').prop('checked',false);

        }
    });
});


