<section class="contact">
	<div class="container">
		<div class="inner">
			<div class="left half__sml">
				<h3>Contact</h3>
				<h4>Address</h4>
				<p>
					149c Neville rd</br>
					Forest Gate</br>
					London</br>
					E7 9QS</br>
				</p>
				<h4>Phone</h4>
				<p>
					<a href="tel:0757335070">0757 335070</a></br>
				</p>
				<h4>Email</h4>
				<p>
					<a href="mailto:info@stepthirtyone.com?Subject=Hello">info@stepthirtyone.com</a></br>
				</p>
				<h4>Social</h4>
				<ul class="social">
					<li><a class="facebook" target="_blank" href="https://www.facebook.com/stepthirtyone/"></a></li>
					<li><a class="instagram" target="_blank" href="https://www.instagram.com/stepthirtyone/"></a></li>
				</ul>
			</div>
		</div>
	</div>
	<div id="map" class="half__lrg map">
		
	</div>

	<script type="text/javascript">

		var locations = [
				[	
					'Stepthirtyone',
					51.538206,
					0.028316,
					1
				],
		];

		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 13,
			center: new google.maps.LatLng(51.538206, 0.028316),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			scrollwheel: false,
			disableDoubleClickZoom: true,
			styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
		});

		var infowindow = new google.maps.InfoWindow();

		var marker, i;

		for (i = 0; i < locations.length; i++) { 
			marker = new google.maps.Marker({
				position: new google.maps.LatLng(locations[i][1], locations[i][2]),
				map: map,
				icon: '/img/content/pin.png'
			});

			// google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
			// 	return function() {
			// 		infowindow.setContent(locations[i][0]);
			// 		infowindow.open(map, marker);
			// 	}
			// })(marker, i));
			google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
				return function() {
					infowindow.setContent(locations[i][0]);
					infowindow.close(map, marker);
				}
			})(marker, i));
		}
	</script>

</section>