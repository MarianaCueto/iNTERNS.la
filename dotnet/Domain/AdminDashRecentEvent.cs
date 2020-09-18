using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Domain
{
    public class AdminDashRecentEvent
    {
        public int Id { get; set; }
        public string EventName { get; set; }
        public DateTime DateStart { get; set; }
        public string VenueName { get; set; }
        public string City { get; set; }
        public string StateName { get; set; }
        public string StateProvinceCode { get; set; }
    }
}
