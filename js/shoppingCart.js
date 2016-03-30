var products =[{
			"brand_name": "Maiyas",
			"id": "0",
			"product_img": "http://p2.zopnow.com/images/products/320/maiyas-rasam-powder-v-200-g.png",
			"product_name": "Rasam Powder",
			"detail": "200 gPouch",
			"price": "100"
		},
		{
			"brand_name": "Organica",
			"id": "1",
			"product_img": "http://p2.zopnow.com/images/products/320/organica-garam-masala-v-75-g.png",
			"product_name": "Garam Masala",
			"detail": "75 g Bottle",
			"price": "80"
		},
		{
			"brand_name": "Eastern",
			"id": "2",
			"product_img": "http://p1.zopnow.com/images/products/320/eastern-chicken-fry-kabab-masala-v-100-g.png",
			"product_name": "Chicken Fry",
			"detail": "100 gm",
			"price": "38"
		},
		{
			"brand_name": "MTR",
			"id": "3",
			"product_img": "http://p1.zopnow.com/images/products/320/1322730272-Picture-367-copy.png",
			"product_name": "Pav Bhaji Masala",
			"detail": "100gm Pouch",
			"price": "64"
		}];	

//////MODEL ENDS HERE
	var itemDet = "<tr id='{id}'><td>{brand_name}<br/>{product_name}</td><td id='quan' data-item={id}>1</td><td id='total'>Rs {price}</td></tr><br/>";

	var productDetailsMarkup =  '<div class="products col-xs-3">'+
									'<img align="middle" src={product_img} width="200" height="200"/>'+
									'<h6>{brand_name}</h6>'+
									'<h5>{product_name}</h5>'+
									'<h5>{detail}</h5>'+
									'<h5>Rs {price}</h5>'+
								'</div>';

	var itemQuantity = $("#itemQuantity");
	var totalAmnt = $("#totalAmt");
	function createCartUI(jsonIndex){
		var delBtn =$('<button/>',
		{
	        text: 'remove',
	        class:'btn btn-xs btn-primary removeBtn',
	        "data-item": jsonIndex,
	        click: function () { 
	        	var i = $(this).attr("data-item")+"";
	        	var btn2 = $(".btnDet [data-item='"+i+"']").first().parent();
				btn2.removeClass("show");
				$(this).parent().remove();
	        	localStorage.setItem("indexes", localStorage.getItem("indexes"))
	        	var btn = $(".addBtn[data-item='"+i+"']");
	        	var decreaseBy = parseInt(btn.text().split(" ").splice(0));
	        	amnt = parseInt(products[jsonIndex].price.replace("Rs ",""))*decreaseBy;
	        	quan=itemQuantity.text();
	        	itemQuantity.html(parseInt(quan)-1);
				totalAmnt.html(parseInt(totalAmnt.text())-amnt);
	        	btn.text("Add to Cart");
				btn.removeAttr("disabled");
	        }
	    });
	    $(itemDet.interpolate(products[jsonIndex])).append(delBtn).appendTo(" #items table tbody");
	}
	function bindShoppingCart(){
			for(var i in products){
				var productDetails = $(productDetailsMarkup.interpolate(products[i]));
				var cnt=1;var add=1;var quan=0;var jsonIndex=0;var _this=null; 
				var itemIncart  = null;var itemsFound=null;var cartNos="";var currQuantity=""
				var prsAmt = 0; var totalAmt =0; var btn,amnt;
				var addBtn =$('<button/>',
   						 {
					        text: 'Add To Cart',
					        class:'addBtn',
					        "data-item": i,
					        click: function () {
					        			 _this = $(this);
										_this.next().addClass("show");
										_this.attr("disabled","disabled");
										_this.text(+ cnt  + " in cart");
										if(itemQuantity.text()!=""){	
											var qno=itemQuantity.text();
											var itemsQuan= parseInt(qno) + cnt;
											itemQuantity.html(itemsQuan);
										}else{
											itemQuantity.html(cnt);
										}
										jsonIndex =  _this.attr('data-item')+"";;
										amnt= products[jsonIndex].price;
										prsAmt = totalAmnt.text();
										totalAmt = parseInt(prsAmt)+parseInt(amnt);
										if(totalAmnt.text()!=""){
											totalAmnt.html(totalAmt);
										 }else{
										 	totalAmnt.html(amnt);
										 }
										 //var jsonIndex = _this.attr("data-item")+"";
										 if(window.localStorage){
										 	var ls = localStorage.getItem("indexes");
										 	if(!ls || !(ls.indexOf(jsonIndex)>-1)){
										 		localStorage.setItem("indexes", (ls||'')+jsonIndex);
										 	}
										 }
										createCartUI(jsonIndex)
						        		}
					   	 });
				var btnSub = $('<button/>',
   						 {
					        text: '-',
					        id:'btnCal',
					        "data-item": i,
					        click: function() {
					        			 _this = $(this);
					        			btn = _this.parent().prev();
					        			cartNos = parseInt(btn.text().split(" ").splice(0));
					        			var removeFrmCart = cartNos - 1;
					        			jsonIndex =  _this.attr('data-item')+"";;
					        			if(removeFrmCart == 0){
					        				btn.text("Add to Cart");
					        				btn.removeAttr("disabled");
					        				_this.parent().removeClass("show");
					        				
					        				if(itemQuantity.text()!=""){
					        					quan =  parseInt(itemQuantity.text()) - 1 ;
					        					prsAmt = products[jsonIndex].price;
					        					amnt= parseInt(totalAmnt.text()) - prsAmt;
					        					itemQuantity.html(quan);
						        				totalAmnt.html(amnt);
					        				} 
					        			}else{
					        				btn.text(+removeFrmCart+ " in cart" );
											amnt= products[jsonIndex].price;
											if(totalAmnt.text()!=""){
												prsAmt = totalAmnt.text();
												totalAmt = parseInt(prsAmt)-amnt;
												totalAmnt.html(totalAmt);
					        				}
					        			}
				        				itemIncart =  $("tbody tr");
										 jsonIndex =  _this.attr("data-item")+"";
										for(var i=0; i<=$("tr").length;i++){
											if(itemIncart[i].id == jsonIndex){
												itemsFound = itemIncart[i];
												break;
											}
										}
										currQuantity=$(itemsFound).children("#quan").text();
										currQuantity = parseInt(currQuantity) - parseInt(1);
       									$(itemsFound).children("#quan").text(currQuantity);
       									totamnt = currQuantity * products[jsonIndex].price;
       									$(itemsFound).children("#total").text(totamnt);
       									if(currQuantity == 0){
       										$(itemsFound).remove();
 	       								}
					        		}		
					    });
				var btnPlus =$('<button/>',
   						 {
					        text: '+',
					        id:'btnPlus',
					         "data-item": i,
					        click: function () {
					        		var _this=$(this);
					        			btn = $(this).parent().prev();
					        			cartNos = parseInt(btn.text().split(" ").splice(0));
					        			var addToCart = cartNos + 1;
					        			btn.text(+ addToCart + " in cart" );
											if(totalAmnt.text()!=""){
												 prsAmt = totalAmnt.text();
												 amnt= btn.prev().text().split(" ").splice(1);
												 totalAmt = parseInt(prsAmt)+parseInt(amnt);
													totalAmnt.html(totalAmt);
											 }
											 itemIncart =  $("tbody tr")
											 jsonIndex =  _this.attr("data-item")+"";
											 itemsFound=null;
											for(var i=0; i<=$("tr").length;i++){
												if(itemIncart[i].id == jsonIndex){
													itemsFound = itemIncart[i];
													break;
												}
											
											}
											currQuantity=$(itemsFound).children("#quan").text();
											currQuantity = parseInt(currQuantity) + parseInt(1);
	       									$(itemsFound).children("#quan").text(currQuantity);
	       									totamnt = currQuantity * products[jsonIndex].price;
	       									$(itemsFound).children("#total").text(totamnt);
       									
					        		}
					    });
				var btnDet = $('<div class="btnDet"></div>');
				btnDet.append(btnSub,btnPlus);
				$("#container").append(productDetails);
				productDetails.append(addBtn,btnDet);
			}
		}
		window.onload = function(){
			String.prototype.interpolate = function (o) {
			    return this.replace(/{([^{}]*)}/g,
			        function (a, b) {
			            var r = o[b];
			            return typeof r === 'string' || typeof r === 'number' ? r : a;
			        }
			    );
			};
			bindShoppingCart();
			var ls = localStorage.getItem("indexes");
			if(ls){
				var arr = ls.split("");
				for(var i in arr){
					createCartUI(arr[i]);
				}
			}
		}
