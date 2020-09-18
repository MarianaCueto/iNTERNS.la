using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Domain
{
   public class AdminDashRecentJob
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string JobType { get; set; }
        public string City { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
