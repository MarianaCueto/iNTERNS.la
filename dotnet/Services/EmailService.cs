using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Sabio.Data.Providers;
using Sabio.Models.AppKeys;
using Sabio.Models.Requests.Email;
using Sabio.Models.Requests.EmailService;
using Sabio.Services.Interfaces;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{

    public class SendGridMailService : IEmailService
    {
        private SendGridConfig _appKeys;
        private readonly IConfiguration _config;

        public SendGridMailService(IOptions<SendGridConfig> appKeys, IConfiguration config)
        {
            _appKeys = appKeys.Value;
            _config = config;
        }

        private async Task<HttpStatusCode> SendEmailAsync(SendGridMessage message)
        {

            var apiKey = _appKeys.SendgridApiKey;
            var client = new SendGridClient(apiKey);
            var response = await client.SendEmailAsync(message);

            return response.StatusCode;
        }

        //this is an example of how you should use the email service. Please make you're own methods 
        public async Task<HttpStatusCode> SendConfirmation(string toEmail, int id, Guid token)
        {
            string htmlContent = ConfirmationBody(id, token);

            SendGridMessage message = new SendGridMessage()
            {
                From = new EmailAddress(_appKeys.Email, _appKeys.Sender),
                Subject = "Confirm Your Email",
                HtmlContent = htmlContent
            };
            message.AddTo(new EmailAddress(toEmail));

            return await SendEmailAsync(message);
        }

        private string ConfirmationBody(int id, Guid token)
        {
            string domain = _config.GetSection("Domain").Value;
            string directory = System.IO.Directory.GetCurrentDirectory();
            string path = string.Format(directory + "\\EmailTemplates\\Confirm.html");
            string htmlContent = System.IO.File.ReadAllText(path);
            htmlContent = htmlContent.Replace("{{confirmLink}}", domain + "confirm/" + id + "/" + token);
            return htmlContent;
        }

        protected string ContactUsEmailBody(ContactUs model)
        {
            string directory = System.IO.Directory.GetCurrentDirectory();
            string path = string.Format(directory + "\\EmailTemplates\\Contact.html");
            string htmlContent = System.IO.File.ReadAllText(path);
            htmlContent = htmlContent.Replace("&&name", model.FirstName);
            htmlContent = htmlContent.Replace("&&lastname", model.LastName);
            htmlContent = htmlContent.Replace("&&email", model.Email);
            htmlContent = htmlContent.Replace("&&message", model.Message);

            return htmlContent;
        }

        public async Task<HttpStatusCode> ContactUs(ContactUs model)
        {

            string htmlContent = ContactUsEmailBody(model);

            SendGridMessage message = new SendGridMessage()
            {
                From = new EmailAddress(model.Email),
                Subject = "Contact Us Email" + model.FirstName + " " + model.LastName,
                HtmlContent = htmlContent
            };
            message.AddTo(new EmailAddress("dd000@dispostable.com"));

            return await SendEmailAsync(message);
        }

        protected string RecoverPasswordEmailBody(string token)
        {
            string domain = _config.GetSection("Domain").Value;
            string directory = System.IO.Directory.GetCurrentDirectory();
            string path = string.Format(directory + "\\EmailTemplates\\RecoverPassword.html");
            string htmlContent = System.IO.File.ReadAllText(path);

            htmlContent = htmlContent.Replace("{{confirmLink}}", domain + "resetpassword/" + token);

            return htmlContent;
        }

        public async Task<HttpStatusCode> RecoverPassword(string email, string token)
        {

            string htmlContent = RecoverPasswordEmailBody(token);

            SendGridMessage message = new SendGridMessage()
            {
                From = new EmailAddress("admin@interns.la"),

                Subject = "Recover Password Email",
                HtmlContent = htmlContent
            };
            message.AddTo(new EmailAddress(email));

            return await SendEmailAsync(message);
        }
    }


}
