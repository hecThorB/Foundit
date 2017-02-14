using FoundIt.Web.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FoundIt.Web.Models.Requests
{
    public class ProfileMensBudgetsCreateRequest
    {
        [Required]
        public MensBudgetsAccessoriesKind? AccessoriesType { get; set; }

        [Required]
        public int SuitsType { get; set; }

        [Required]
        public int OuterwearType { get; set; }

        [Required]
        public int ShirtsType { get; set; }

        [Required]
        public int SweatersType { get; set; }

        [Required]
        public int ActivewearType { get; set; }

        [Required]
        public int SwimwearType { get; set; }

        [Required]
        public int ShortsType { get; set; }

        [Required]
        public int BagsType { get; set; }

        [Required]
        public int PantsType { get; set; }

        [Required]
        public int TiesType { get; set; }

        [Required]
        public int ShoesType { get; set; }

        public int FirstMensFind1Type { get; set; }

        public int FirstMensFind2Type { get; set; }

        public int FirstMensFind3Type { get; set; }
    }
}
