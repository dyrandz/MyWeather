using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyWeather.Service.Services.IServices;

namespace MyWeather.API.Controllers
{
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IWeatherForecastService _weatherForecastService;

        public WeatherForecastController(IWeatherForecastService weatherForecastService) => _weatherForecastService = weatherForecastService;

        [HttpGet("ip-address/{ip}")]
        public async Task<IActionResult> GetWeatherByIPAsync(string ip)
        {
            return Ok(await _weatherForecastService.GetWeatherByIPAsync(ip));
        }

        [HttpGet("location/{location}")]
        public async Task<IActionResult> GetWeatherByLocationAsync(string location)
        {
            return Ok(await _weatherForecastService.GetWeatherByLocationAsync(location));
        }
    }
}
