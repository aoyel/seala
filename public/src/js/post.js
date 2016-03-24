
$(function(){
	var editor = null;
	if(window.Editor){
		editor = new Editor();
		editor.render();
	}

	$("#post-button").on("click",function(e){
		var form = $($(this).attr("target"));
		var param = {};
		param['title'] = $("input[name='title']").val();
		if(empty(param['title'])){
			$("input[name='title']").focus();
			return false;
		}
		param['content'] = editor.codemirror.getValue();
		$.post(form.attr("action"), param, function(data, textStatus, xhr) {
			if(data.status == 1){
				notify("success","success");
				lazyLoad("/");
			}else{
				notify(data.data,"error");
			}
		},"json");
	})

	$("#comment-button").on('click', function(event) {
		var form = $($(this).attr("target"));
		var data = form.formToArray();
		var param = {};
		for(i in data){
			param[data[i].name] = data[i].value;
		}
		$.post(form.attr("action"), param, function(data, textStatus, xhr) {
			if(data.status == 1){
				notify("success","success");
				reload();
			}else{
				notify(data.data,"error");
			}
		},"json");
	});
	
	if($(".comment-list").length > 0){
		var id = $(".comment-list").data("id");
		$.get('/comment/{0}'.format(id), function(data) {
			if(data.status == 1){
				var dataset = data.data;
				$.each(dataset, function(index, val) {
					 /* iterate through array or object */
					 console.log(val);
					 $(".comment-list").append(
					 		"		<div class=\"comment\">" +
							"			<strong class=\"author\">"+ val.name +"<time>"+ new Date(val.create_time*1000) +"</time></strong>" +
							"			<p>"+ marked(val.content) +"</p>" +
							"		</div>"
					 )	
				});
			}
		});
	}

})
