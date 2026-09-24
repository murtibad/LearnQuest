using Microsoft.AspNetCore.Mvc;

namespace LearnQuest.Web.Controllers
{
    public class QuizController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
