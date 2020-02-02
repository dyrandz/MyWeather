using MyWeather.Service.Models;
using System.Threading.Tasks;

namespace MyWeather.Service.Services.IServices
{
    public interface ILocationService
    {
        Task<Geolocation> GetLocationByIPAsync(string ip);
    }
}
