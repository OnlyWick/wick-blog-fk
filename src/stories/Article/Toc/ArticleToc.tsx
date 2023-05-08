// generate: function(t) {
//                     !this.$isServer && t && (this.node = t,
//                     this.catalog = function(t) {
//                         var e = [].slice.call(t.querySelectorAll("h1,h2,h3,h4,h5,h6"))
//                           , n = v();
//                         return e.reduce((function(t, e) {
//                             var title = e.textContent.replace(/\n/g, " ").trim();
//                             if (title) {
//                                 for (var n = v({
//                                     title: title || "<未识别标题>",
//                                     level: +e.nodeName.slice(1),
//                                     hash: "#" + (e.dataset.id || ""),
//                                     childList: []
//                                 }), r = t; r && r.level >= n.level; )
//                                     r = r.parent;
//                                 return n.parent = r,
//                                 n.deep = r.deep + 1,
//                                 n.visible = n.deep <= 3,
//                                 r.childList.push(n),
//                                 n
//                             }
//                             return t
//                         }
//                         ), n),
//                         n
//                     }(t),
//                     this.activeItemByCurrentPosition())

import { useEffect } from "react";

//                 },
export default function ArticleToc() {
  useEffect(() => {
    console.log(
      [].slice.call(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
    );
  }, []);

  return <>Hi</>;
}
