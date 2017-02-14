using Sabio.Web.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sabio.Web.Controllers
{
    [RoutePrefix("addresses")]
    public class AddressesController : BaseController
    {
        [Route("create")]
        public ActionResult Anglrcreate()
        {
            return View("AnglrCreate");
        }
        [Route]
        public ActionResult Index()
        {
            return View("Index");
        }
        [Route("{id:int}/edit")]
        public ActionResult Edit(int id)
        {
            WelcomeBaseViewModel model = new WelcomeBaseViewModel();
            model.EditId = id;
            return View("AnglrCreate", model);
        }
    }
}