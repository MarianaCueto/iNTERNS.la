using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class Thread
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public bool IsActive { get; set; }
        public int CreatedBy { get; set; }
        public string FirstName { get; set; }
        public string Mi { get; set; }
        public string LastName { get; set; }
        public string AvatarUrl { get; set; }
        public DateTime DateCreated { get; set; }
        public int PostCount { get; set; }
    }
}
