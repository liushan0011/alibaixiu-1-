$.ajax({
    type: 'get',
    url: '/comments/lasted',
    success: function (r) {
        // console.log(r);
        
        var comTpl = `
        {{each data}}
			<li>
			  <a href="javascript:;">
			    <div class="avatar">
			      <img src="{{$value.author && $value.author.avatar}}" alt="">
			    </div>
			    <div class="txt">
			      <p>
			        <span>{{$value.author && $value.author.nickName}}</span>{{$value.createAt.substr(0,10)}}说:
			      </p>
			      <p>{{$value.content}}</p>
			    </div>
			  </a>
			</li>
            {{/each}}
            `;
        var html = template.render(comTpl, { data: r});
        $('#commentBox').html(html);
    }
})
