using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class Recover
    {
        public Recover(string token, int id, string email)
        {
            this.Token = token;
            this.Id = id;
            this.Email = email;
        }
        public string Token { get; set; }

        public int Id { get; set; }

        public string Email { get; set; }
    }
}
