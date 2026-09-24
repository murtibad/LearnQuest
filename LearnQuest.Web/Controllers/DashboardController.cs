using Microsoft.AspNetCore.Mvc;

namespace LearnQuest.Web.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Quiz()
        {
            return View();
        }

        public IActionResult Profile()
        {
            return View();
        }

        public IActionResult Statistics()
        {
            return View();
        }
    }
}

