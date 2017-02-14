using FoundIt.Web.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FoundIt.Web.Domain
{
    public class ProfileWomensBudget
    {
        public int Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public string UserId { get; set; }
        public ProfileWomensBudgetsAccessoriesKind AccessoriesType { get; set; }
        public ProfileWomensBudgetsTopsKind TopsType { get; set; }
        public ProfileWomensBudgetsOuterwearKind OuterwearType { get; set; }
        public ProfileWomensBudgetsDressesKind DressesType { get; set; }
        public ProfileWomensBudgetsSweatersKind SweatersType { get; set; }
        public ProfileWomensBudgetsActivewearKind ActivewearType { get; set; }
        public ProfileWomensBudgetsJacketsKind JacketsType { get; set; }
        public ProfileWomensBudgetsShortsKind ShortsType { get; set; }
        public ProfileWomensBudgetsShoesKind ShoesType { get; set; }
        public ProfileWomensBudgetsPantsKind PantsType { get; set; }
        public ProfileWomensBudgetsJewelryKind JewelryType { get; set; }
        public ProfileWomensBudgetsSkirtsKind SkirtsType { get; set; }
        public ProfileWomensBudgetsSuitsKind SuitsType { get; set; }
        public ProfileWomensBudgetsSwimwearKind SwimwearType { get; set; }
        public ProfileWomensBudgetsBagsKind BagsType { get; set; }
        public ProfileWomensBudgetsMaternityKind MaternityType { get; set; }
        public ProfileWomensBudgetsFirstFindKind FirstWomensFind1Type { get; set; }
        public ProfileWomensBudgetsFirstFindKind FirstWomensFind2Type { get; set; }
        public ProfileWomensBudgetsFirstFindKind FirstWomensFind3Type { get; set; }
        public bool IsDeleted { get; set; }
    }
}
