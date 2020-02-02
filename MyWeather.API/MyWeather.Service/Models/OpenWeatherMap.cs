using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MyWeather.Service.Models
{
    public class OpenWeatherMap
    {
        public string cod { get; set; }
        public int message { get; set; }
        public int cnt { get; set; }
        public List<ForecastList> list { get; set; }
        public OpenWeatherCity city { get; set; }
    }

    public class ForecastList
    {
        public long dt { get; set; }
        public string dt_txt { get; set; }
        public ForecastMain main { get; set; }
        public List<ForecastWeather> weather { get; set; }
        public ForecastClouds clouds { get; set; }
        public ForecastWind wind { get; set; }
        public ForecastSnow snow { get; set; }
        public ForecastSys sys { get; set; }
    }

    public class ForecastMain
    {
        public double temp { get; set; }
        public double feels_like { get; set; }
        public double temp_min { get; set; }
        public double temp_max { get; set; }
        public int pressure { get; set; }
        public int sea_level { get; set; }
        public int grnd_level { get; set; }
        public int humidity { get; set; }
        public double temp_kf { get; set; }
    }

    public class ForecastWeather
    {
        public int id { get; set; }
        public string main { get; set; }
        public string description { get; set; }
        public string icon { get; set; }
    }

    public class ForecastClouds
    {
        public int all { get; set; }
    }

    public class ForecastWind
    {
        public double speed { get; set; }
        public int deg { get; set; }
    }

    public class ForecastSnow
    {
        [JsonPropertyName("3h")] //debug not working
        public double ThreeH { get; set; }
    }

    public class ForecastSys
    {
        public string pod { get; set; }
    }

    public class OpenWeatherCity
    {
        public int id { get; set; }
        public string name { get; set; }
        public OpenWeatherCityCoord coord { get; set; }
        public string country { get; set; }
        public int population { get; set; }
        public int timezone { get; set; }
        public long sunrise { get; set; }
        public long sunset { get; set; }
    }

    public class OpenWeatherCityCoord
    {
        public double lat { get; set; }
        public double lon { get; set; }
    }
}
