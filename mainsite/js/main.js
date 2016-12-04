$(document).ready(function(){
	var domConvertor = function(content, main_url) {
			var reg=new RegExp("<li>","g");
			var newstr=content.replace(reg,"<li class=\"list-group-item\">");
			var url_bool = main_url.indexOf("list");
			if (url_bool <= 0) {
				reg=new RegExp("<a target=\"_blank\" href=\"http://www.rs05.com/","g");
				newstr=newstr.replace(reg,"<a  data-toggle=\"modal\" data-target=\"#myModal\" href=\"api/movie/id/");
				reg=new RegExp("<a class=\"pic fl\" href=\"http://www.rs05.com/","g");
				newstr=newstr.replace(reg,"<a  data-toggle=\"modal\" data-target=\"#myModal\" class=\"pic fl\" href=\"api/movie/id/");
				reg=new RegExp("<a target=\"_blank\" class=\"a\" href=\"http://","g");
				newstr=newstr.replace(reg,"<a  data-toggle=\"modal\" data-target=\"#myModal\" href=\"api/movie/tv/");
			} else {
				reg=new RegExp("src=\"images","g");
				newstr=newstr.replace(reg,"src=\"http://img.xinxianplus.com");
				reg=new RegExp("<a target=\"_blank\" href=\"http://www.rs05.com/","g");
				newstr=newstr.replace(reg,"<a  data-toggle=\"modal\" data-target=\"#myModal\" href=\"api/movie/id/");
				reg=new RegExp("<a class=\"pic fl\" href=\"","g");
				newstr=newstr.replace(reg,"<a  data-toggle=\"modal\" data-target=\"#myModal\" class=\"pic fl\" href=\"api/movie/id/");
			}
			reg=new RegExp("href=\".*?tag.*?\"","g");
			newstr=newstr.replace(reg, "");
			$("#movie-spinner").css("display","none");
			$("#content-movie-list").html("<ul class=\"list-group movie-list\">"+ newstr +"</ul>");
			$("#content-movie-list").css("display","block");
	};
	var doGetListResult = function(data, main_url) {
		if (data != "failed") {
			var result = eval('(' + data + ')');
			var content = result.content;
			var pagenum = result.lastpage;
			domConvertor(content, main_url);
			if ($("#movie-pagination").first().data('jqPagination')) {
				$("#movie-pagination").jqPagination('destroy');
			}
			$("#movie-pagination").jqPagination({
				link_string	: '',
				current_page    : 1,
				max_page	: pagenum,
				paged		: function(page) {
					$("#content-movie-list").css("display","none");
					$("#movie-spinner").css("display","block");
					var url_bool = main_url.indexOf("list");
					var page_url = "";
					if (url_bool <= 0) {
						page_url = main_url + "/" + page;
					} else {
						page_url = "api/movie/list/" + page;
					}
					$.get(page_url,
						function(data) {
							var result = eval('(' + data + ')');
							var content = result.content;
							domConvertor(content, main_url);
						}
					);
				}
			});
			$("#tb-pagination").css("display","table");
		} else {
			$("#movie-spinner").css("display","none");
			$("#movie-404").css("display","block");
		}
	};
	var ids = ["#content-begin", "#content-movie", "#content-shadowsocks", "#content-verycd", "#content-youtube", "#content-google", "#content-bt", "#content-baidupan"];
	var idsToggler = function(id){
		for (var i = 0; i < ids.length; i++) {
		 	$(ids[i]).css("display","none");
		}
		$(id).css("opacity","0");
		$(id).css("display","block");
		$(id).transition({opacity: 1}, 500);
		location.hash=id;

	};
	var urlhashchange = function(){
		var hashStr = location.hash;
		var isValid = false;
		if (hashStr) {
			for (var i = 0; i < ids.length; i++) {
			 	if (ids[i] == hashStr) {
			 		isValid = true;
			 		break;
			 	}
			}
		} else {
			isValid = true;
			hashStr = "#content-begin";
		}

		if (isValid) {
			idsToggler(hashStr);
		}
	};
	window.onhashchange = urlhashchange;
	$("#nav-brand").click(function(){
		idsToggler("#content-begin");
	});
	$("#nav-begin").click(function(){
		idsToggler("#content-begin");
	});
	$("#nav-youtube").click(function(){
		idsToggler("#content-youtube");
	});
	$("#nav-movie").click(function(){
		//$.get("api/movie/list/1", function(data){ doGetListResult(data, $(this)[0].url); });
		idsToggler("#content-movie");
	});
	$("#nav-shadowsocks").click(function(){
		idsToggler("#content-shadowsocks");
	});
	$("#nav-verycd").click(function(){
		idsToggler("#content-verycd");
	});
	$("#nav-google").click(function(){
		idsToggler("#content-google");
	});	
	$("#nav-bt").click(function(){
		idsToggler("#content-bt");
	});
	$("#nav-baidupan").click(function(){
		idsToggler("#content-baidupan");
	});
	$("#tile-youtube").click(function(){
		idsToggler("#content-youtube");
	});
	$("#tile-movie").click(function(){
		$.get("api/movie/list/1", function(data){ doGetListResult(data, $(this)[0].url); });
		idsToggler("#content-movie");
	});
	$("#tile-shadowsocks").click(function(){
		idsToggler("#content-shadowsocks");
	});
	$("#tile-bt").click(function(){
		idsToggler("#content-bt");
	});
	$("#tile-verycd").click(function(){
		idsToggler("#content-verycd");
	});
	$("#tile-google").click(function(){
		idsToggler("#content-google");
	});
	$("#tile-baidupan").click(function(){
		idsToggler("#content-baidupan");
	});
	$("#btn-youtube").click(function(){
		if ($("#input-youtube")[0].value) {
			$("#panel-text").css("display","none");
	  	  	$("#panel-spinner").css("display","block");
	  		$.post("api/youtube/post", 
	  			{
	  			  	url: $("#input-youtube")[0].value
	  			},
	  			function(data,status){
	  				if (data != "failed" && data != "bad url") {
	  					$("#panel-text").html("<p> 缓存成功了！！赶快点击下面的链接保存到本地！！</p><p><a href='"+ data +"'>"+ data +"</a></p>");
	  				} else {
	  					$("#panel-text").html("<p> 貌似失败了。</p>");
	  				}
	  				$("#panel-spinner").css("display","none");
	  				$("#panel-text").css("display","block");
	  			}
	  		);
  		}
    });
    var verycdDomConvertor = function (content) {												
    	var reg = new RegExp("style=.*?http","g");
		content = content.replace(reg,"><img src=\"http");
		reg = new RegExp("jpg.*?>","g");
		content = content.replace(reg,"jpg\"/>");
		reg = new RegExp("href","g");
		content = content.replace(reg,"class=\"verycd_a\" href");
		$("#panel-verycd-text").html("<ul class=\"panel-verycd-list\">" +content + "</ul");
		$("a[class='verycd_a']").click(function(event){
			event.preventDefault();
			$('#myModal').modal('toggle');
			$.post("api/verycd/post",
				{
	  			  	url: event.target.href,
	  			  	type: "url"
	  			},
	  			function(data,status){
	  				var result = eval('(' + data + ')');
	  				if (result.result != "failed") {
	  					var content = result.content;
	  					$("#myModal-content").html("<table id=\"panel-verycd-table\" class=\"panel-verycd-table\">" +content + "</table>");
	  				}
	  			}
	  		);
		});
	};
	$("#btn-verycd").click(function(){
		if ($("#input-verycd")[0].value) {
			$("#panel-verycd-text").css("display","none");
			$("#pannel-verycd-footer").css("display","none");
	  	  	$("#panel-verycd-spinner").css("display","block");
	  	  	$.post("api/verycd/post", 
	  			{
	  			  	url: $("#input-verycd")[0].value,
	  			  	type: "search"
	  			},
	  			function(data,status){
	  				$("#panel-verycd-spinner").css("display","none");
	  				$("#panel-verycd-text").css("display","block");
	  				var result = eval('(' + data + ')');
	  				if (result.result != "failed") {
	  					var style = result.style
	  					if (style == "single") {
							var content = result.content;
		  					$("#panel-verycd-text").html("<table id=\"panel-verycd-table\" class=\"panel-verycd-table\">" +content + "</table>");
	  					}
	  					if (style == "list") {
	  						var content = result.content;
	  						var pagenum = result.lastpage;
	  						var url = result.url;
	  						$("#panel-verycd-container").css("height","100%");
	  						verycdDomConvertor(content);
	  						if (pagenum != "1") {
	  							if ($("#verycd-pagination").first().data('jqPagination')) {
									$("#verycd-pagination").jqPagination('destroy');
								}
								$("#verycd-pagination").jqPagination({
									link_string	: url,
									current_page    : 1,
									max_page	: pagenum,
									paged		: function(page) {
										$("#panel-verycd-text").css("display","none");
								  	  	$("#panel-verycd-spinner").css("display","block");
								  	  	var url = this.link_string + "&page=" + page;
								  	  	$.post("api/verycd/post",
								  	  		{
								  			  	url: url,
								  			  	type: "page"
								  			},
								  			function(data,status){
								  				$("#panel-verycd-spinner").css("display","none");
	  											$("#panel-verycd-text").css("display","block");
	  											var result = eval('(' + data + ')');
	  											if (result.result != "failed") {
	  												var content = result.content;
							  						var pagenum = result.lastpage;
							  						var url = result.url;
							  						$("#panel-verycd-container").css("height","100%");
													verycdDomConvertor(content);
	  											} else {
	  												$("#panel-verycd-text").html("<p> 貌似失败了。</p>");
	  											}
	  										});
									}
								});
	  							$("#pannel-verycd-footer").css("display","block");
	  						}
	  					}
	  				} else {
	  					$("#panel-verycd-text").html("<p> 貌似失败了。</p>");
	  				}
	  			}
	  		);
	  	}
    });
    $("#btn-movie").click(function(){
    	var search_key = $("#search-movie").val();
    	if (search_key) {
	    	$("#tb-pagination").css("display","none");
			$("#content-movie-list").css("display","none");
			$("#movie-404").css("display","none");
			$("#movie-spinner").css("display","block");
	    	$.get("api/movie/key/"+search_key,  function(data){ doGetListResult(data, $(this)[0].url); });
    	}
    });

    $("#content-movie-list").ready(function(){
    	$.get("api/movie/list/1", function(data){ doGetListResult(data, $(this)[0].url); });
    });
    $("#myModal").on("hidden.bs.modal", function() {
    	$(this).removeData("bs.modal");
    	$("#myModal-content").html("<table width=\"100%\" height=\"100%\">\
						                <tr>\
						                    <td align=\"center\">\
												<i class=\"fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom\"></i>\
												<span class=\"sr-only\">Loading...</span>\
											</td>\
										</tr>\
									</table>");
	});
	$(".tag-tabs").click(function(){
		$("#tb-pagination").css("display","none");
		$("#content-movie-list").css("display","none");
		$("#movie-404").css("display","none");
		$("#movie-spinner").css("display","block");
		$.get("api/movie/tag/"+this.innerText,  function(data){ doGetListResult(data, $(this)[0].url); });
	});
	$(".tag-all").click(function(){
		$("#tb-pagination").css("display","none");
		$("#content-movie-list").css("display","none");
		$("#movie-404").css("display","none");
		$("#movie-spinner").css("display","block");
		$.get("api/movie/list/1",  function(data){ doGetListResult(data, $(this)[0].url); });
	});
	$("#downlist-google-1").click(function(){
		$("#btn-logo-google").html(this.innerHTML);
		$("#input-google")[0].placeholder = "输入搜索内容";
	});
	$("#downlist-google-2").click(function(){
		$("#btn-logo-google").html(this.innerHTML);
		$("#input-google")[0].placeholder = "输入网址，获取网页快照";
	});
	$("#btn-google").click(function(){
		var type;
		var value = $("#input-google")[0].value;
		if ($("#input-google")[0].placeholder == "输入网址，获取网页快照") {
			type = "pdfpage";
			value = encodeURI(value);
		} else {
			type = "google";
		}
		if (value) {
			$("#content-google-list").css("display","none");
			$("#google-spinner").css("display","block");
			$.post("api/google/post", 
	  			{
	  			  	value: value,
	  			  	type: type
	  			},
	  			function(data,status){
					var result = eval('(' + data + ')');
					if (result.result == "ok") {
						if (result.style == "pdfpage") {
					    	$("#content-google-list").html("<table width=\"100%\" height=\"100%\">\
				                <tr>\
				                    <td align=\"center\">\
										<a class=\"pdf_link\" href=\""+ result.content +"\" target=\"_blank\"><i class=\"fa fa-download download_icon\"></i>"+ result.content +"</a>\
									</td>\
								</tr>\
							</table>");
						}
						if (result.style == "google") {
							var search_list = eval('(' + result.content + ')');
							var html_str = "";
							for (var i = 0; i < search_list.length; i++) {
								html_str += "<div id=\"google-card-"+ i +"\" class=\"row row-2\"> \
		      								<div class=\"google-card-container\">\
		      								<div class=\"google-card-title\">\
		      								<a href=\""+ search_list[i].url +"\" target=\"_blank\">\
		      								"+ search_list[i].title +"\
		      								</a>\
		      								</div>\
		      								<div class=\"google-card-url\">"+ search_list[i].url +"\
		      								<a class=\"pdf_link google-card-pdf\" href=\""+ search_list[i].url +"\">获取pdf快照</a>\
		      								<i class=\"fa fa-spinner fa-pulse fa-3x fa-fw google-card-spinner\"></i>\
		      								<a class=\"pdf_link google-card-pdf-download\" href=\"\">下载地址</a>\
		      								</div>\
		      								<div class=\"google-card-abstract\">"+ search_list[i].abstract +"</div>\
		      								</div>\
	      									</div>"
							}
							$("#content-google-list").html(html_str);
							$(".google-card-pdf").click(function(event){
								event.preventDefault();
								event.target.nextElementSibling.nextElementSibling.style.setProperty('display','none');
								event.target.nextElementSibling.style.setProperty('display','inline-block');
								$.post("api/google/post", 
						  			{
						  			  	value: event.target.href,
						  			  	type: "pdfpage"
						  			},
						  			function(data,status){
						  				var result = eval('(' + data + ')');
										if (result.result == "ok") {
												event.target.nextElementSibling.nextElementSibling.href = result.content;
												event.target.nextElementSibling.style.setProperty('display','none');
												event.target.nextElementSibling.nextElementSibling.style.setProperty('display','inline-block');
										}
						  			});
							});			
						}
					}
				    $("#google-spinner").css("display","none");
					$("#content-google-list").css("display","block");
	  			});
		}
	});
	var btDomConvertor = function (content) {
		var reg = new RegExp("href","g");
		content = content.replace(reg,"class=\"bt_a\" href");
		$("#content-bt-list").html("<table id=\"content-bt-table\">" + content + "</table>");
		$("a[class='bt_a']").click(function(event){
			event.preventDefault();
			$('#myModal').modal('toggle');
			$.post("api/bt/post",
				{
	  			  	value: event.currentTarget.href,
	  			  	type: "detail"
	  			},
	  			function(data,status){
	  				var result = eval('(' + data + ')');
	  				if (result.result != "failed") {
	  					var magnet = result.magnet;
	  					var thunder = result.thunder;
	  					$("#myModal-content").html("<table class=\"panel-verycd-table\"> <tbody><tr><td align=\"center\"><a href=\""+ magnet +"\">磁力链接</a></td></tr><tr><td align=\"center\"><a href=\""+ thunder +"\">迅雷链接</a></td></tr></tbody></table>");
	  				}
	  			}
	  		);
		});
	};
	$("#btn-bt").click(function(){
		var value = $("#input-bt")[0].value;
		if (value) {
			$("#content-bt-list").css("display","none");
			$("#bt-pagination-tb").css("display","none");
			$("#bt-spinner").css("display","block");
			$.post("api/bt/post",
				{
	  			  	value: value,
	  			  	type: "search"
	  			},
	  			function(data,status){
	  				var result = eval('(' + data + ')');
					if (result.result == "ok") {
							btDomConvertor(result.content);
					}
					if ($("#bt-pagination").first().data('jqPagination')) {
						$("#bt-pagination").jqPagination('destroy');
					}
					$("#bt-pagination").jqPagination({
						link_string	: '',
						current_page    : 1,
						max_page	: result.pagenum,
						paged		: function(page) {
							$("#content-bt-list").css("display","none");
							$("#bt-spinner").css("display","block");
							$.post("api/bt/post",
								{
					  			  	value: value,
					  			  	type: "page",
					  			  	pagenum: page
					  			},
					  			function(data,status){
					  				var result = eval('(' + data + ')');
									if (result.result == "ok") {
											btDomConvertor(result.content);
									}
									$("#bt-spinner").css("display","none");
									$("#content-bt-list").css("display","block");
					  			}
					  		);
						}
					});
					$("#bt-spinner").css("display","none");
					$("#content-bt-list").css("display","block");
					$("#bt-pagination-tb").css("display","table");
	  			});
		}
	});
	var baidupanDomConvertor = function (content) {
		for (var i = 1; i < content.length; i++) {
			if (content[i].indexOf("baidu.com") == -1) {
				content[i] = "";
				continue;
			}
			content[i] = content[i].split("</table>")[0];
			content[i] = content[i] + "</table>";
		}
		content = content.join(" ");
		var reg = new RegExp("cse-search-result_content_item_table","g");
		content = content.replace(reg, "search-item");
		reg = new RegExp("cse-search-result_content_item_top","g");
		content = content.replace(reg, "item-title");
		reg = new RegExp("cse-search-result_content_item_mid","g");
		content = content.replace(reg, "item-list");
		reg = new RegExp("cse-search-result_content_item_bottom","g");
		content = content.replace(reg, "item-bar");
		$("#content-baidupan-list").html(content);
	};
	$("#btn-baidupan").click(function(){
		var value = $("#input-baidupan")[0].value;
		if (value) {
			$("#content-baidupan-list").css("display","none");
			$("#baidupan-pagination-tb").css("display","none");
			$("#baidupan-spinner").css("display","block");
			$.post("api/baidupan/post",
				{
	  			  	value: value,
	  			  	type: "search"
	  			},
	  			function(data,status){
	  				var result = eval('(' + data + ')');
					if (result.result == "ok") {
							baidupanDomConvertor(result.content);
					}
					if ($("#baidupan-pagination").first().data('jqPagination')) {
						$("#baidupan-pagination").jqPagination('destroy');
					}
					$("#baidupan-pagination").jqPagination({
						link_string	: '',
						current_page    : 1,
						max_page	: result.pagenum,
						paged		: function(page) {
							$("#content-baidupan-list").css("display","none");
							$("#baidupan-spinner").css("display","block");
							$.post("api/baidupan/post",
								{
					  			  	value: value,
					  			  	type: "page",
					  			  	pagenum: page
					  			},
					  			function(data,status){
					  				var result = eval('(' + data + ')');
									if (result.result == "ok") {
											baidupanDomConvertor(result.content);
									}
									$("#baidupan-spinner").css("display","none");
									$("#content-baidupan-list").css("display","block");
					  			}
					  		);
						}
					});
					$("#baidupan-spinner").css("display","none");
					$("#content-baidupan-list").css("display","block");
					$("#baidupan-pagination-tb").css("display","table");
	  			});
		}
	});
	$("#form-search-mov").validate({
		errorClass : 'help-block',
        rules : {
            search : {
                required : true
            }
        },
        messages : {
            search : {
                required : "请输入关键字"
            }

        },
        highlight : function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        success : function(label) {
        	$("#search-bar-movie").removeClass('has-error');
        },
        errorPlacement : function(error, element) {
        },
        submitHandler : function(form) {
        }
	});
	$("#form-youtube").validate({
		errorClass : 'help-block',
        rules : {
            link : {
                required : true
            }
        },
        messages : {
            link : {
                required : "请输入关键字"
            }

        },
        highlight : function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        success : function(label) {
        	$("#search-bar-youtube").removeClass('has-error');
        },
        errorPlacement : function(error, element) {
        },
        submitHandler : function(form) {
        }
	});
	$("#form-verycd").validate({
		errorClass : 'help-block',
        rules : {
            link : {
                required : true
            }
        },
        messages : {
            link : {
                required : "请输入关键字"
            }

        },
        highlight : function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        success : function(label) {
        	$("#search-bar-verycd").removeClass('has-error');
        },
        errorPlacement : function(error, element) {
        },
        submitHandler : function(form) {
        }
	});
	$("#form-google").validate({
		errorClass : 'help-block',
        rules : {
            link : {
                required : true
            }
        },
        messages : {
            link : {
                required : "请输入搜索内容"
            }

        },
        highlight : function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        success : function(label) {
        	$("#search-bar-google").removeClass('has-error');
        },
        errorPlacement : function(error, element) {
        },
        submitHandler : function(form) {
        }
	});
	$("#form-bt").validate({
		errorClass : 'help-block',
        rules : {
            link : {
                required : true
            }
        },
        messages : {
            link : {
                required : "请输入搜索内容"
            }

        },
        highlight : function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        success : function(label) {
        	$("#search-bar-bt").removeClass('has-error');
        },
        errorPlacement : function(error, element) {
        },
        submitHandler : function(form) {
        }
	});
	$("#form-baidupan").validate({
		errorClass : 'help-block',
        rules : {
            link : {
                required : true
            }
        },
        messages : {
            link : {
                required : "请输入搜索内容"
            }

        },
        highlight : function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        success : function(label) {
        	$("#search-bar-baidupan").removeClass('has-error');
        },
        errorPlacement : function(error, element) {
        },
        submitHandler : function(form) {
        }
	});
	urlhashchange();
});
