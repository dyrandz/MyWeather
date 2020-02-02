using MyWeather.Service.Models;
using System.Threading.Tasks;

namespace MyWeather.Service.Services.IServices
{
    public interface IWeatherForecastService
    {
        Task<OpenWeatherMap> GetWeatherByIPAsync(string ip);
        Task<OpenWeatherMap> GetWeatherByLocationAsync(string location);
    }
}
