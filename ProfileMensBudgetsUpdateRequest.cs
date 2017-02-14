using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FoundIt.Web.Models.Requests
{
    public class ProfileMensBudgetsUpdateRequest : ProfileMensBudgetsCreateRequest
    {
        [Required]
        public int Id { get; set; }
    }
}
