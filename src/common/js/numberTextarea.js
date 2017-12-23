var initTextarea = function(){
	$('[number-length]').each(function(){
		var nowLength = $(this).val().length;
		var maxLength = $(this).attr('number-length');
		var html =  '<div class="textarea-number" style="padding:0 10px 5px;text-align:right;font-size:12px;color:#ccc;clear:both;">'+
						'<span class="number-now">'+nowLength+'</span>/<span class="number-all">'+maxLength+'</span>'+
					'</div>';
		$(this).after(html);
	});
	$('[number-length]').on('input propertychange change keyup paste', function(){
		var nowLength = $(this).val().length;
		var maxLength = $(this).attr('number-length');
		if(nowLength>=maxLength){
			$(this).val($(this).val().substring(0, maxLength));
			nowLength = maxLength;
			$(this).next('.textarea-number').find('span.number-now').text(nowLength).css('color','#F0271F');
		}else{
			$(this).next('.textarea-number').find('span.number-now').text(nowLength).css('color','#ccc');
		}
		
	});
}
$.extend({
	'numtextarea':function(){
		initTextarea();
	}
});
initTextarea();
