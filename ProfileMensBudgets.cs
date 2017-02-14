using FoundIt.Web.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FoundIt.Web.Domain
{
    public class ProfileMensBudgets
    {
        public string UserId { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

        public int IsDeleted { get; set; }

        public MensBudgetsAccessoriesKind? AccessoriesType { get; set; }

        public int SuitsType { get; set; }

        public int OuterwearType { get; set; }

        public int ShirtsType { get; set; }

        public int SweatersType { get; set; }

        public int ActivewearType { get; set; }

        public int SwimwearType { get; set; }

        public int ShortsType { get; set; }

        public int BagsType { get; set; }

        public int PantsType { get; set; }

        public int TiesType { get; set; }

        public int ShoesType { get; set; }

        public int FirstMensFind1Type { get; set; }

        public int FirstMensFind2Type { get; set; }

        public int FirstMensFind3Type { get; set; }

        public int Id { get; set; }
    }
}
