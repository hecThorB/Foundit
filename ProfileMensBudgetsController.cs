using Sabio.Web.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Sabio.Web.Controllers
{
    [RoutePrefix("profiles/budgets")]
    public class ProfileMensBudgetsController : BaseController
    {
        // GET: ProfileMensBudgets
        [Route("create")]
        public ActionResult Create()
        {
            return View();
        }

        [Route("{id:int}/edit")]
        public ActionResult Edit(int id)
        {
            WelcomeBaseViewModel viewModel = new WelcomeBaseViewModel();
            viewModel.EditId = id;
            return View("create", viewModel);
        }
    }
}