using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
   public class AdminDashRecentOrg
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Logo { get; set; }
        public string SiteUrl { get; set; }
        public DateTime DateCreated{ get; set; }
        public string City { get; set; }
        public string StateName { get; set; }
        public string StateProvinceCode { get; set; }
    }
}
