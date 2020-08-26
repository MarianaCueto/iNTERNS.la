using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Requests.Email
{
   public class ContactUs
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Message { get; set; }      
    }
}
