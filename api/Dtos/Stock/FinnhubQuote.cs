namespace api.Dtos.Stock
{
    public class FinnhubQuote
    {
        public double c { get; set; }  // current price
        public double d { get; set; }  // change (usaremos como lastDiv aproximado)
        public double dp { get; set; } // percent change
        public double h { get; set; }  // high
        public double l { get; set; }  // low
        public double o { get; set; }  // open
        public double pc { get; set; } // previous close
    }
}