using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Sabio.Web.Enums
{
    public enum MensBudgetsBagsKind
    {
        Unknown = 0,

        [Display(Name = "$0-25")]
        ZeroToFifty = 1,

        [Display(Name = "$25-50")]
        TwentyFiveToFifty = 2,

        [Display(Name = "$50-75")]
        FiftyToSeventyFive = 3,

        [Display(Name = "$75-100")]
        SeventyFiveToOneHundred = 4,

        [Display(Name = "$100+")]
        OneHundred = 5
    }
}