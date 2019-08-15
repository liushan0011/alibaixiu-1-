//修改密码  有问题
$('.form-horizontal button').on('submit',function(){
    var old = $('#old').val();
    var password = $('#password').val();
    var confirm = $('#confirm').val();
    if(old != password && password == confirm) {
        var formData = $(this).serialize();
        $.ajax({
            url: '/users/password',
            type: 'put',
            data: formData,
            success: function(){
                location.href = "/admin/login.html"
            }
        })
    }
    return false;
});