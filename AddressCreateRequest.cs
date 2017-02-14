using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sabio.Web.Models.Requests
{
    public class AddressCreateRequest
    {   
        [Required, StringLength(128)]
        public string AddressLine1 { get; set; }

        [StringLength(128)]
        public string AddressLine2 { get; set; }

        [Required, StringLength(128)]
        public string City { get; set; }

        [Required, Range(1, 99)]
        public int StateId { get; set; }

        [Required, StringLength(10, MinimumLength = 5)]
        public string PostalCode { get; set; }

    }
}