using Microsoft.AspNetCore.Mvc;

namespace LearnQuest.Web.Controllers
{
    public class AuthController : Controller
    {
        // Login
        public IActionResult Login()
        {
            return View();
        }

        // Register
        public IActionResult Register()
        {
            return View();
        }

        // Forgot Password
        public IActionResult ForgotPassword()
        {
            return View();
        }
    }
}