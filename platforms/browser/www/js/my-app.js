var $$ = Dom7;

var app = new Framework7({
	root: '#app',
	name: 'TDIApp',
	id: 'com.tdipaint.TDIApp',
	panel: { swipe: 'left' },
	theme: 'md',
	routes: [
		{
			path: '/home/',
			url: 'home.html',
		},
		{
			path: '/customer/',
			url: 'customer.html',
		},
		{
			path: '/infoCustomer/:customerName',
			url: 'infoCustomer.html',
		},
		{
			path: '/product/',
			url: 'product.html',
		},
		{
			path: '/infoProduct/:productName',
			url: 'infoProduct.html',
		},
		{
			path: '/salesOrder/',
			url: 'salesOrder.html',
		},
		{
			path: '/shipment/',
			url: 'shipment.html',
		},


	]
});

var mainView = app.views.create('.view-main');

$$(document).on('page:init',  function (e, page) {
	
	if(page.name == "home"){
		app.preloader.show();
		$$('#deviceID').html('Device ID : ' + device.uuid);
		app.request.post('http://localhost/tdiApp/getSOShipmentDraft.php', {}, function (data) {
			//app.dialog.alert('tes');
		  	var obj = JSON.parse(data);
		  
		  	var gaugeSO = app.gauge.get('.gaugeso');

			gaugeSO.update({
			  value: obj[0]['totalso']/ obj[0]['countso'] ,
			  valueText: obj[0]['countso'],
			  valueFontSize: 72,
			  labelText: '/ ' + obj[0]['totalso'],
			  labelFontSize : 25,
			});

			var gaugeSH = app.gauge.get('.gaugeshipment');

			gaugeSH.update({
			  value: obj[0]['totalshipment']/ obj[0]['countshipment'] ,
			  valueText: obj[0]['countshipment'],
			  valueFontSize: 72,
			  labelText: '/ ' + obj[0]['totalshipment'],
			  labelFontSize : 25,
			});

		    app.preloader.hide();
		});
	}
	else if(page.name == "customer") {
		$$('#btnsearch').on('click', function() {
			var x = new FormData($$(".form-ajax-searchCustomer")[0]);
			//console.log($$('#inputName').val());
			mainView.router.navigate("/infoCustomer/" + $$('#inputName').val());
		});
	}
	else if(page.name == "infoCustomer"){
		app.preloader.show();
		$name = page.router.currentRoute.params.customerName;
		//app.dialog.alert($name);
		//app.request.post('http://103.89.5.148/searchCustomer.php', {name: $name}, function (data) {
		app.request.post('http://localhost/tdiApp/searchCustomer.php', {name: $name}, function (data) {
			//app.dialog.alert('tes');
		  	var obj = JSON.parse(data);
		  	$html = '';
		  	for(var i=0; i < obj.length; i++) {

		  		var socreditlimit = obj[i]['so_creditlimit'];
					socreditlimit = parseFloat(socreditlimit).toFixed(2);
					socreditlimit = formatRupiah(socreditlimit);

					
					//socreditlimit = formatRupiah(socreditlimit,'Rp. ');

				var totalopenbalance = obj[i]['totalopenbalance'];
					totalopenbalance = parseFloat(totalopenbalance).toFixed(2);
					totalopenbalance = formatRupiah(totalopenbalance);

					
					//totalopenbalance = formatRupiah(totalopenbalance,'Rp. ');
					

				var so_total = obj[i]['so_total'];
					so_total = parseFloat(so_total).toFixed(2);
					so_total = formatRupiah(so_total);

					//so_total = formatRupiah(so_total,'Rp. ').toFixed(2);

		      //$$('#driverlist').append('<li><a href="#">' + obj[i]['name'] + '</a></li>');
		      	$html += '<div class="card card-outline">'+
		      	'<div class="card-header" id="cardHeader"><b>'+obj[i]['name']+'</b></div>'+
		      		'<div class="card-content card-content-padding" id="cardContent">Kode Customer : '+obj[i]['value']+'<br>'+
		      																		'SO Credit Limit : Rp. '+socreditlimit+'<br>'+
		      																		'Total Open Balance : Rp. '+totalopenbalance+'<br>'+
		      																		'Total SO : Rp. '+so_total+'</div>'+
		      	'</div>';
		    }	
		    $$('#cardCustomer').html($html);
		    app.preloader.hide();
		});
	}
	else if(page.name == "product"){
		$$('#btnsearch').on('click', function() {
			var x = new FormData($$(".form-ajax-searchProduct")[0]);
			//console.log($$('#inputName').val());
			mainView.router.navigate("/infoProduct/" + $$('#inputName').val());
		});
	}
	else if(page.name == "infoProduct"){
		app.preloader.show();
		$name = page.router.currentRoute.params.productName;
		//app.dialog.alert($name);
		//app.request.post('http://103.89.5.148/searchProduct.php', {name: $name}, function (data) {
		app.request.post('http://localhost/tdiApp/searchProduct.php', {name: $name}, function (data) {
			//app.dialog.alert('tes');
		  	var obj = JSON.parse(data);
		  	$html = '';
		  	for(var i=0; i < obj.length; i++) { 
		      //$$('#driverlist').append('<li><a href="#">' + obj[i]['name'] + '</a></li>');
		      	$html += '<div class="card card-outline">'+
		      	'<div class="card-header" id="cardHeader"><b>'+obj[i]['name']+'</b></div>'+
		      		'<div class="card-content card-content-padding" id="cardContent">Kode Product : '+obj[i]['value']+'<br>'+
		      																		'Product Group : '+obj[i]['productgroup']+'<br>'+
		      																		'Warehouse Name : '+obj[i]['warehouse_name']+'<br>'+
		      																		'Qty OnHand : '+obj[i]['totalqtyonhand']+'<br>'+
		      																		'Qty Reserved : '+obj[i]['totalqtyreserved']+'<br>'+
		      																		'Real Qty : '+obj[i]['realqty']+'</div>'+
		      	'</div>';
		    }	
		    $$('#cardProduct').html($html);
		    app.preloader.hide();
		});
	}
});

$$('.customer-button').on('click', function () {
  //app.dialog.alert('Welcome to About');
});

function formatRupiah(bilangan){

	var	number_string = bilangan.toString(),
	split	= number_string.split('.'),
	sisa 	= split[0].length % 3,
	rupiah 	= split[0].substr(0, sisa),
	ribuan 	= split[0].substr(sisa).match(/\d{1,3}/gi);
		
	if (ribuan) {
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}
	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;

	return rupiah;
}

