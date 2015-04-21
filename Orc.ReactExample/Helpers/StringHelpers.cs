using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace Orc.ReactExample.Helpers
{
    public static  class StringHelpers
    {
        /// <summary>
        /// from http://stackoverflow.com/a/25062079
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static string ScrubHtml(this string value)
        {
            var step1 = Regex.Replace(value, @"<[^>]+>|&nbsp;", "").Trim();
            var step2 = Regex.Replace(step1, @"\s{2,}", " ");
            return step2;
        }
        /// <summary>
        /// from https://nickstips.wordpress.com/2010/02/12/c-truncate-a-string-at-the-end-of-a-word/
        /// </summary>
        /// <param name="s"></param>
        /// <param name="length"></param>
        /// <param name="atWord"></param>
        /// <param name="addEllipsis"></param>
        /// <returns></returns>
        public static string Truncate(this string s, int length, bool atWord, bool addEllipsis)
        {
            // Return if the string is less than or equal to the truncation length
            if (s == null || s.Length <= length)
                return s;

            // Do a simple tuncation at the desired length
            string s2 = s.Substring(0, length);

            // Truncate the string at the word
            if (atWord)
            {
                // List of characters that denote the start or a new word (add to or remove more as necessary)
                List<char> alternativeCutOffs = new List<char>() { ' ', ',', '.', '?', '/', ':', ';', '\'', '\"', '\'', '-' };

                // Get the index of the last space in the truncated string
                int lastSpace = s2.LastIndexOf(' ');

                // If the last space index isn't -1 and also the next character in the original
                // string isn't contained in the alternativeCutOffs List (which means the previous
                // truncation actually truncated at the end of a word),then shorten string to the last space
                if (lastSpace != -1 && (s.Length >= length + 1 && !alternativeCutOffs.Contains(s.ToCharArray()[length])))
                    s2 = s2.Remove(lastSpace);
            }

            // Add Ellipsis if desired
            if (addEllipsis)
                s2 += "...";

            return s2;
        }
    }
}