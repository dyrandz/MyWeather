$(() => {
    getWeatherByUserIP();

    $(".form-search").submit( e =>{
    	e.preventDefault();
    	const location = $("#search").val().trim();
    	if(location === '') return;
    	getWeatherByLocation(location);
  	});
});

const showLoader = _=> {
	$('.loader-container').fadeIn();
}

const hideLoader = _=> {
	$('.loader-container').fadeOut();
}

const getWeatherByLocation = (location) => {
	showLoader();
	$.ajax({
        url: `${urlWeatherByLocation}${location}`,
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            weatherModel = weatherMapper(result);
            populateCurrentWeather(weatherModel);
            populateWeatherTabs(weatherModel);
            hideLoader();
        }
    });
}

const getWeatherByIP = ip => {
	showLoader();
	$.ajax({
        url: `${urlWeatherByIP}${ip}`,
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            weatherModel = weatherMapper(result);
            populateCurrentWeather(weatherModel);
            populateWeatherTabs(weatherModel);
            hideLoader();
        }
    });
}

const getWeatherByUserIP = _ => {
	$.getJSON(urlGetIP, function(data){
    	getWeatherByIP(data.ip);
	});
}

const populateCurrentWeather = data => {
	$('.locationName').text(`${data.city}, ${data.country}`);
	$('.weather-current-img').attr("src", data.icon);
	$('.widget-current-temp').text(data.temperature);
	$('.widget-current-cloudiness').text(data.cloudiness);
	$('.widget-current-date').text(data.dateTime);
	$('.widget-current-wind').text(data.wind);
	$('.widget-current-pressure').text(data.pressure);
	$('.widget-current-humidity').text(data.humidity);
	$('.widget-current-sunrise').text(data.sunriseTime);
	$('.widget-current-sunset').text(data.sunsetTime);
	$('.widget-current-coord').text(`[${data.geoLatitude}, ${data.geloLongitude}]`);
}

const populateWeatherTabs = data => {
	$('div .weather-tabs').html('');
	$('.widget-tab-content').html('');
	$.each(data.weatherTabs, function( index, value ) {
  		$('div .weather-tabs').append(
  			`<li class="nav-item">
				<a class="nav-link ${index === 0 ? 'active' : ''}" 
				id="weather-tab-${index}" data-toggle="tab" 
				href="#tab-${index}" role="tab" a
				ria-controls="tab-${index}" 
				aria-selected="true">
				${value}
				</a>
			</li>`
  		);
  		populateWeatherTabList(index, value, data);
	});
}

const populateWeatherTabList = (dateIndex, date, data) => {
	$('.widget-tab-content').append(
		`
		<div class="tab-pane fade ${dateIndex === 0 ? 'active show' : ''}" id="tab-${dateIndex}" role="tabpanel" aria-labelledby="tab-${dateIndex}"> 
  			<h5 align="center"> Hourly weather and forecasts </h5>
  			<div class="widget-hourly"></div>
		</div>
		`
	);
	const list = data.list.filter(list => list.date === date);
	$.each(list, function( index, value ) {
		$(`.widget-tab-content #tab-${dateIndex} .widget-hourly`).append(
			`
			<div class="d-flex widget-row">
				<div> 
					<span> ${value.time} </span>
					<img src="${value.icon}" alt="forecast" width="50" height="50"> 
				</div>
				<div> 
					<p>
						<span class="weather-hourly-temp"> ${value.temperature} </span>
						<span class="weather-hourly-desc"> ${value.weather} </span>
					</p>
					<p>
						${value.windSpeed}  clouds: ${value.cloud}, ${value.pressure}
					</p>
				</div>
			</div>
			`
		);
	});	
}

const populateWeatherTabListXXX = (dateIndex, date, data) => {
	$.each(data.weatherTabs, function( index, value ) {
		const list = data.list.filter(list => list.date === date);
  		$('.widget-tab-content').append(
  			`
  			<div class="tab-pane fade show ${dateIndex === 0 ? 'active' : ''}" id="tab-${dateIndex}" role="tabpanel" aria-labelledby="tab-${dateIndex}"> 
	  			<h5 align="center"> Hourly weather and forecasts </h5>
				<div class="widget-hourly">
		  			<div class="d-flex widget-row">
						<div> 
							<span> ${list.time} </span>
							<img src="${list.icon}" alt="forecast" width="50" height="50"> 
						</div>
						<div> 
							<p>
								<span class="weather-hourly-temp"> ${list.temperature} </span>
								<span class="weather-hourly-desc"> ${list.weather} </span>
							</p>
							<p>
								${list.wind}  clouds: ${list.cloud}, ${list.pressure}
							</p>
						</div>
					</div>
				</div>
			</div>
			`
  		);
	});
}