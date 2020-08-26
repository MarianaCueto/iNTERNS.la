using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
   public class AdminDashRecentUser
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AvatarUrl { get; set; }
        public DateTime DateCreated { get; set; }
    }
}
