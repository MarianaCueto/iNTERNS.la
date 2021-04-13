using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services.Interfaces
{
   public interface IEmailService
    {
        Task<HttpStatusCode> SendConfirmation(string toEmail, int id, Guid token);

        Task<HttpStatusCode> ContactUs(ContactUs model);

        Task<HttpStatusCode> RecoverPassword(string email, string token);

    }
}
