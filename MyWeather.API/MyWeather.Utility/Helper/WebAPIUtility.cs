using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace MyWeather.Utility.Helper
{
    public class WebAPIUtility
    {
        public static async Task<T> CreateWebRequest<T>(string url)
        {
            using (var client = new HttpClient())
            {
                var httpResponse = await client.GetAsync(url);

                if (httpResponse.IsSuccessStatusCode)
                {
                    return JsonSerializer.Deserialize<T>
                    (
                        await httpResponse.Content.ReadAsStringAsync()
                    );
                }
                return default;
            }
        }
    }
}
