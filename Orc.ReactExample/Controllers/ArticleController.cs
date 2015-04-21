using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using Orc.ReactExample.Helpers;
using Orc.ReactExample.Models;
using Umbraco.Web;
using Umbraco.Web.Models;

namespace Orc.ReactExample.Controllers
{
    public class ArticleController : Umbraco.Web.Mvc.RenderMvcController
    {
        public override ActionResult Index(RenderModel model)
        {
            Thread.Sleep(500);

            var viewModel = new ArticleViewModel();

            var content = model.Content;

            viewModel.Content = content.GetPropertyValue<string>("bodyText");

            viewModel.UrlName = content.UrlName;
            viewModel.Title = content.Name;
            viewModel.Comments = new List<CommentViewModel>();

            foreach (var child in content.Children)
            {
                var commentModel = new CommentViewModel();
                commentModel.Author = child.GetPropertyValue<string>("author");
                commentModel.Content = child.GetPropertyValue<string>("comment");
                commentModel.Date = child.CreateDate;
                viewModel.Comments.Add(commentModel);
            }
            
            if (Request.IsAjaxRequest())
            {
                return new JsonDotNetResult
                {
                    Data = viewModel
                };
            }
            else
            {

                ViewBag.Model = viewModel;

                //Do some stuff here, then return the base method
                return base.Index(model);
            }
        }

    }
}