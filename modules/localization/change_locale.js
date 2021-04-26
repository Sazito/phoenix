import { checkParts } from "./check_locale";
import { REGEXP_LINK_HREF_DIR } from "./consts";
import { env } from "../../code/configs";

export const changeLocale = ({ locale, history }) => {
  const dir = locale.getDirection();
  const lang = locale.getLanguage();
  if (history) {
    const { location } = history;
    const { pathname } = location;
    const urlLocalePart = checkParts(pathname);
    const replacement = lang === env.DEFAULT_LOCALE ? "" : lang;
    let newPathname;
    if (urlLocalePart) {
      newPathname = pathname.replace(urlLocalePart, replacement);
    } else {
      newPathname = `${replacement}/${pathname}`;
    }
    /* if we have same locale code and default locale code, replacement will be null,
     * and we will get double slash at start of path name
     * so we should remove it
     */
    newPathname = newPathname.replace(/\/\//, "/");
    /* we should set an slash, if new path name dose not have any slash at start
     */
    newPathname = /^\//.test(newPathname) ? newPathname : `/${newPathname}`;
    history.replace(newPathname);
  }
  if (typeof window === "object" && "document" in window) {
    const html = document.getElementsByTagName("html")[0];
    const head = document.getElementsByTagName("head")[0];
    const links = document.getElementsByTagName("link");
    html.dir = dir;
    html.lang = lang;
    (links || []).forEach((link) => {
      const newLink = link.cloneNode(true);
      const targetLinks = link.href.match(REGEXP_LINK_HREF_DIR);
      const currentDir = targetLinks && targetLinks.length && targetLinks[0];
      const newDir = `-${dir}`;
      if (currentDir !== newDir) {
        const newLinkHref = link.href.replace(REGEXP_LINK_HREF_DIR, newDir);
        newLink.href = newLinkHref;
        newLink.addEventListener(
          "load",
          function () {
            head.removeChild(link);
          },
          false
        );
        head.appendChild(newLink);
      }
    });
  }
};
