var $$ = Dom7;

var app = new Framework7({
	root: '#app',
	name: 'TDIApp',
	id: 'com.tdipaint.TDIApp',
	panel: { swipe: 'left' },
	theme: 'md',
	routes: [
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
		}

	]
});

var mainView = app.views.create('.view-main');

$$(document).on('page:init',  function (e, page) {
	if(page.name == "customer") {
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
		app.request.post('http://103.89.5.148/searchCustomer.php', {name: $name}, function (data) {
			//app.dialog.alert('tes');
		  	var obj = JSON.parse(data);
		  	$html = '';
		  	for(var i=0; i < obj.length; i++) {

		  		var socreditlimit = obj[i]['so_creditlimit'];
		
				var	reversesocreditlimit = socreditlimit.toString().split('').reverse().join(''),
					socreditlimitribuan = reversesocreditlimit.match(/\d{1,3}/g);
					socreditlimitribuan	= socreditlimitribuan.join('.').split('').reverse().join('');

				var totalopenbalance = obj[i]['totalopenbalance'];
		
				var	reversetotalopenbalance = totalopenbalance.toString().split('').reverse().join(''),
					totalopenbalanceribuan = reversetotalopenbalance.match(/\d{1,3}/g);
					totalopenbalanceribuan	= totalopenbalanceribuan.join('.').split('').reverse().join('');

				var so_total = obj[i]['so_total'];
		
				var	reverseso_total = so_total.toString().split('').reverse().join(''),
					so_totalribuan = reverseso_total.match(/\d{1,3}/g);
					so_totalribuan	= so_totalribuan.join('.').split('').reverse().join('');

		      //$$('#driverlist').append('<li><a href="#">' + obj[i]['name'] + '</a></li>');
		      	$html += '<div class="card card-outline">'+
		      	'<div class="card-header" id="cardHeader"><b>'+obj[i]['name']+'</b></div>'+
		      		'<div class="card-content card-content-padding" id="cardContent">Kode Customer : '+obj[i]['value']+'<br>'+
		      																		'SO Credit Limit : Rp. '+socreditlimitribuan+'<br>'+
		      																		'Total Open Balance : Rp. '+totalopenbalanceribuan+'<br>'+
		      																		'Total SO : Rp. '+so_totalribuan+'</div>'+
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
		app.request.post('http://103.89.5.148/searchProduct.php', {name: $name}, function (data) {
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

