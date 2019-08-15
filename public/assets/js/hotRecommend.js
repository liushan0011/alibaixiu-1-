// 为了将模板变成公共的，所以将模板写在了js文件中
$.ajax({
    url: '/posts/recommend',
    type: 'get',
    success: function (r) {
        var str = `
            {{each data}}
            <li>
              <a href="detail.html?id={{$value._id}}">
                <img src="{{$value.thumbnail}}" alt="">
                <span>{{$value.title}}</span>
              </a>
            </li>
            {{/each}}
            `;
        var html = template.render(str, { data: r });
        $('#recommendBox').html(html);
    }
})