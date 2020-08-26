using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Requests.Token
{
   public class TokenAddRequest
    {
        public string Token { get; set; }

        public int UserId { get; set; }

        public int TokenType { get; set; }
    }
}
