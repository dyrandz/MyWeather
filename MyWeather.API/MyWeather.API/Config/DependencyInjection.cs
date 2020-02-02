using Microsoft.Extensions.DependencyInjection;
using MyWeather.Service.Services;
using MyWeather.Service.Services.IServices;

namespace MyWeather.API.Config
{
    public static class DependencyInjection
    {
        public static IServiceCollection RegisterDependencyInjection(this IServiceCollection services)
        {
            services.AddTransient<IWeatherForecastService, WeatherForecastService>();
            services.AddTransient<ILocationService, LocationService>();

            return services;
        }
    }
}
