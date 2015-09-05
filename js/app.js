// Private methods
function showBytes() {
	var byteArray = '';
	var bitValue = [128,64,32,16,8,4,2,1];

	for (var rowIx = 1; rowIx <= 8; rowIx++) {
		var byteValue = 0;

		for (var colIx = 1; colIx <= 8; colIx++) {
			var id = '#'+ rowIx +'_'+ colIx;
			var isChecked = $(id).hasClass('on');
			if (isChecked) {
				byteValue += bitValue[colIx-1];
			}
		}

		if (rowIx > 1) {
			byteArray += ',';
		}

		byteArray += '0x'+byteValue.toString(16);
	}

	$('#bytes').text(byteArray);
	$('#clippy').val(byteArray);
}

function setAll(checked) {
	for (var rowIx = 1; rowIx <= 8; rowIx++) {
		for (var colIx = 1; colIx <= 8; colIx++) {
			var id = '#'+ rowIx +'_'+ colIx;
			if (checked) {
				$(id).addClass('on');
			} else {
				$(id).removeClass('on');
			}
		}
	}

	showBytes();
}

// Event handlers
$('.led').click(function() {
	if ($(this).hasClass('on')) {
		$(this).removeClass('on');
	} else {
		$(this).addClass('on');
	}
	showBytes();
});

$('.bulkSelector').click(function() {
  var id;
	var $button = $(this);
	var offset = $button.prop('id').substr(3);

	for (var led=1; led<=8; led++) {
  	if ($button.hasClass('column')) {
			id = '#'+led+'_'+offset;
		} else {
			id = '#'+offset+'_'+led;
		}
		if ($button.hasClass('selected')){
			$(id).removeClass('on');
		} else {
			$(id).addClass('on');
		}
	}

	if ($button.hasClass('selected')){
		$button.removeClass('selected');
	} else {
		$button.addClass('selected');
	}

	showBytes();
});

$('#clearAll').click(function(){
	setAll(false);
	$('.bulkSelector').removeClass('selected');
});

$('#setAll').click(function(){
	setAll(true);
	$('.bulkSelector').addClass('selected');
});

$('#copy').click(function(){
	var copyTextinput = document.querySelector('#clippy');
	copyTextinput.select();

	try {
		var successful = document.execCommand('copy');
	} catch (err) {
		console.log('Oops, unable to copy');
	}
});

// Initialisation
showBytes();
