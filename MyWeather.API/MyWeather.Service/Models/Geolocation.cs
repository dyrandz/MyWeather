using System.Text.Json.Serialization;

namespace MyWeather.Service.Models
{
    public class Geolocation
    {
        [JsonPropertyName("city")]
        public string City { get; set; }

        [JsonPropertyName("country_code2")]
        public string CountryCode { get; set; }
    }
}
