function show() {
	// if (document.querySelector('#navigation').style.height ===='17.45rem') {
	if (document.querySelector('#navigation').style.height ===='14rem') {
		document.querySelector('#navigation').style.height = '4rem';
	} else {
		// document.querySelector('#navigation').style.height = '17.45rem';
		document.querySelector('#navigation').style.height = '14rem';
	}
}

function hide() {
	document.querySelector('#navigation').style.height = '4rem';
}
