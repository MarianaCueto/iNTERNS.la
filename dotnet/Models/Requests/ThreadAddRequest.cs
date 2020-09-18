using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests
{
    public class ThreadAddRequest
    {
        [Required]
        [StringLength(maximumLength: 250, MinimumLength = 4,
       ErrorMessage = "The property 0 should have {250 maximum" +
           " characters and {5} minimum characters")]
        public string Subject { get; set; }
        [Required]
        public bool IsActive { get; set; }

    }
}
