using Microsoft.AspNetCore.Mvc;

namespace LearnQuest.Web.Controllers
{
    public class DashboardController : Controller
    {
        public IActionResult Quiz()
        {
            return View();
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
