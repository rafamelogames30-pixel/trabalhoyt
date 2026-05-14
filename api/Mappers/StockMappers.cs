// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using api.Dtos.Stock;
// using api.Models;
// using Microsoft.CodeAnalysis.CSharp.Syntax;

// namespace api.Mappers
// {
//     public static class StockMappers
//     {
//         // Extension method
//         public static StockDto ToStockDto(this Stock stockModel)
//         {
//             return new StockDto
//             {
//                 Id = stockModel.Id,
//                 Symbol = stockModel.Symbol,
//                 CompanyName = stockModel.CompanyName,
//                 Purchase = stockModel.Purchase,
//                 LastDiv = stockModel.LastDiv,
//                 Industry = stockModel.Industry,
//                 MarketCap = stockModel.MarketCap,
//                 Comments = stockModel.Comments.Select(c => c.ToCommentDto()).ToList()
//             };
//         }

//         public static Stock ToStockFromCreateDTO(this CreateStockRequestDto stockDto)
//         {
//             return new Stock
//             {
//                 Symbol = stockDto.Symbol,
//                 CompanyName = stockDto.CompanyName,
//                 Purchase = stockDto.Purchase,
//                 LastDiv = stockDto.LastDiv,
//                 Industry = stockDto.Industry,
//                 MarketCap = stockDto.MarketCap
//             };
//         }

//         public static Stock ToStockFromFMP(this FMPStock fmpStock)
//         {
//             return new Stock
//             {
//                 Symbol = fmpStock.symbol,
//                 CompanyName = fmpStock.companyName,
//                 Purchase = (decimal)fmpStock.price,
//                 LastDiv = (decimal)fmpStock.lastDiv,
//                 Industry = fmpStock.industry,
//                 MarketCap = fmpStock.mktCap
//             };
//         }
//     }
// }
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Stock;
using api.Models;

namespace api.Mappers
{
    public static class StockMappers
    {
        public static StockDto ToStockDto(this Stock stockModel)
        {
            return new StockDto
            {
                Id = stockModel.Id,
                Symbol = stockModel.Symbol,
                CompanyName = stockModel.CompanyName,
                Purchase = stockModel.Purchase,
                LastDiv = stockModel.LastDiv,
                Industry = stockModel.Industry,
                MarketCap = stockModel.MarketCap,
                Comments = stockModel.Comments.Select(c => c.ToCommentDto()).ToList()
            };
        }

        public static Stock ToStockFromCreateDTO(this CreateStockRequestDto stockDto)
        {
            return new Stock
            {
                Symbol = stockDto.Symbol,
                CompanyName = stockDto.CompanyName,
                Purchase = stockDto.Purchase,
                LastDiv = stockDto.LastDiv,
                Industry = stockDto.Industry,
                MarketCap = stockDto.MarketCap
            };
        }

        public static Stock ToStockFromFMP(this FMPStock fmpStock, FinnhubQuote? quote = null)
        {
            return new Stock
            {
                Symbol = fmpStock.ticker,
                CompanyName = fmpStock.name,
                Purchase = quote != null ? (decimal)quote.c : 0,
                LastDiv = quote != null ? (decimal)quote.d : 0,
                Industry = fmpStock.finnhubIndustry,
                MarketCap = fmpStock.marketCapitalization
            };
        }
    }
}