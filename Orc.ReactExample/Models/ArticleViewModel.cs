using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Orc.ReactExample.Models
{

    public class ArticleViewModel
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string ShortContent { get; set; }
        public int NumberOfComments { get; set; }
        public string UrlName { get; set; }

        public List<CommentViewModel> Comments { get; set; }
    }

    public class CommentViewModel
    {
        public string Author { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
    }
}