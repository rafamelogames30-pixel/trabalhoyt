using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Newtonsoft.Json;

namespace api.Service
{
    public class FMPService : IFMPService
    {
        private HttpClient _httpClient;
        private IConfiguration _config;
        public FMPService(HttpClient httpClient, IConfiguration config)
        {
            _httpClient = httpClient;
            _config = config;
        }
        public async Task<Stock> FindStockBySymbolAsync(string symbol)
        {
            try
            {
                var profileResult = await _httpClient.GetAsync($"https://finnhub.io/api/v1/stock/profile2?symbol={symbol}&token={_config["FMPKey"]}");
                var quoteResult = await _httpClient.GetAsync($"https://finnhub.io/api/v1/quote?symbol={symbol}&token={_config["FMPKey"]}");

                if (profileResult.IsSuccessStatusCode && quoteResult.IsSuccessStatusCode)
                {
                    var profileContent = await profileResult.Content.ReadAsStringAsync();
                    var quoteContent = await quoteResult.Content.ReadAsStringAsync();

                    var stock = JsonConvert.DeserializeObject<FMPStock>(profileContent);
                    var quote = JsonConvert.DeserializeObject<FinnhubQuote>(quoteContent);

                    if (stock != null && !string.IsNullOrEmpty(stock.ticker))
                    {
                        return stock.ToStockFromFMP(quote);
                    }
                    return null;
                }
                return null;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}