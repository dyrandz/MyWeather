using Microsoft.Extensions.Options;
using MyWeather.Service.Models;
using MyWeather.Service.Services.IServices;
using MyWeather.Utility.Helper;
using System.Threading.Tasks;

namespace MyWeather.Service.Services
{
    public class LocationService : ILocationService
    {
        private readonly IOptions<AppSettings> _appSettings;

        public LocationService(IOptions<AppSettings> appSettings) => _appSettings = appSettings;

        public async Task<Geolocation> GetLocationByIPAsync(string ip)
        {
            string url = $"{_appSettings.Value.Geolocation.IPGeoUrl}?apiKey={_appSettings.Value.Geolocation.ApiKey}&ip={ip}";

            return await WebAPIUtility.CreateWebRequest<Geolocation>(url);
        }
    }
}
