using Microsoft.Extensions.Options;
using MyWeather.Service.Models;
using MyWeather.Service.Services.IServices;
using MyWeather.Utility.Helper;
using System.Threading.Tasks;

namespace MyWeather.Service.Services
{
    public class WeatherForecastService : IWeatherForecastService
    {
        private readonly IOptions<AppSettings> _appSettings;
        private readonly ILocationService _locationService;
        
        public WeatherForecastService(IOptions<AppSettings> appSettings,
            ILocationService locationService)
        {
            _appSettings = appSettings;
            _locationService = locationService;
        }

        public async Task<OpenWeatherMap> GetWeatherByIPAsync(string ip)
        {
            var location = await _locationService.GetLocationByIPAsync(ip);

            return await GetWeatherByLocationAsync($"{location.City},{location.CountryCode}");
        }

        public async Task<OpenWeatherMap> GetWeatherByLocationAsync(string location)
        {
            string url = $"{_appSettings.Value.OpenWeatherMap.ForecastUrl}?q={location}&APPID={_appSettings.Value.OpenWeatherMap.ApiKey}";

            return await WebAPIUtility.CreateWebRequest<OpenWeatherMap>(url);
        }

        
    }
}
