using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Requests.EmailService
{
    public class EmailBase
    {

        public string To { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }

    }
}
