
let weatherModel = {};

const weatherMapper = data =>{
	return {
		dateTime: formatDate(new Date(), 'llll'),
		city: data.city.name,
		country: data.city.country,
		list: data.list.map(forecastListMapper),
		icon: formatIconUrl(data.list.length&&data.list[0].weather[0].icon),
		temperature: `${convertKelvinToCelsius(data.list.length&&data.list[0].main.temp)} °C`,
		wind: `${data.list.length&&data.list[0].wind.speed}, m/s`,
		cloudiness: `${data.list.length&&data.list[0].weather[0].description}`,
		pressure: `${data.list.length&&data.list[0].main.pressure} hpa`,
		humidity: `${data.list.length&&data.list[0].main.humidity} %`,
		sunriseTime: formatUnixTime(data.city.sunrise),
		sunsetTime: formatUnixTime(data.city.sunset),
		geoLatitude: data.city.coord.lat,
		geloLongitude: data.city.coord.lon,
		weatherTabs: getWeatherTabs(data.list.reduce(getDateArray,[]))
	}
}

const getDateArray = (acc, cur) => {
	return [...acc, formatDate(cur.dt_txt, 'MMM Do YY')];
}

const getWeatherTabs  = data => {
	return [...new Set(data)]; 
}

const forecastListMapper = data => {
	return {
		date: formatDate(data.dt_txt, 'MMM Do YY'),
		time: formatDate(data.dt_txt, 'LT'),
		temperature: `${convertKelvinToCelsius(data.main.temp)} °C`,
		weather: data.weather[0].description,
		windSpeed: `${data.wind.speed}, m/s`,
		cloud: `${data.clouds.all} %`,
		pressure: `${data.main.pressure} hpa`,
		icon: formatIconUrl(data.weather[0].icon)
	}
}

const formatDate = (date, format) => {
	return moment(date).format(format);
}

const formatUnixTime = value => {
	return moment.unix(value).format("LT");
}

const convertKelvinToCelsius = kelvin => {
	return Math.round(kelvin - 273.15);
}

const formatIconUrl = iconName => {
	return urlIcon.replace("{iconName}", iconName);
}