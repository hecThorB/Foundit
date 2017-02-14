using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace FoundIt.Web.Enums
{
    public enum MensBudgetsAccessoriesKind
    {
        [Display(Name = "$0-25")]
        ZeroToFifty = 0,
        [Display(Name = "$25-50")]
        TwentyFiveToFifty = 1,
        [Display(Name = "$50-75")]
        FiftyToSeventyFive = 2,
        [Display(Name = "$75-100")]
        SeventyFiveToOneHundred = 3,
        [Display(Name = "$100+")]
        OneHundred = 4
    }
}
