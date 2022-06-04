import React from "react";
import { NavigateFunction, useLocation, useNavigate, useParams } from "react-router";

// 你说 react-router 一版一版换了多少API了，兼容过不啦。
// 人家 v5 也有话说的，我用的什么API啊，我用的props.match.params，你这批什么API啊，叫我用，
// v6 你现在什么设计，砍这么多API，你推荐函数式写法，它能写吗，没这个能力知道吧
// 再下去要转Vue了，转完Vue转Python，接下来没人用了
// props.match.params 用的蛮好的，你把它砍了干什么你说
// 你现在还要我手动包装一个withRouter，你倒告诉我，怎么解释呢？
// 脸都不要了

export function withRouter( Child ) {
    return ( props ) => {
      const location = useLocation();
      const navigate = useNavigate();
      return <Child { ...props } navigate={ navigate } location={ location } />;
    }
}  