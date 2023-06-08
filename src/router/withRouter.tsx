import React, { FC, useContext } from 'react';
import { Route, withRouter, Redirect, useLocation } from 'react-router-dom';

import UserInfoContext from '../store/userInfoContext';

interface PrivateRouteProps {
    component: React.ComponentType<any>;
    path: string;
    exact?: boolean;
}

function parseQueryString(url: string) {
    const queryString = url.split('?')[1];
    if (!queryString) {
        return {};
    }

    const pairs = queryString.split('&');
    const result: any = {};
    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        result[key] = decodeURIComponent(value || '');
    });

    return result;
}


const PrivateRoute: FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {

    const { search } = useLocation();
    const { shareUserId }: any = parseQueryString(search);

    const { globalInfo } = useContext(UserInfoContext);

    return (
        <Route
            {...rest}
            render={props => {
                // console.log(props, 'sss');
                // if (!globalInfo?.finised) return null;

                return globalInfo?.loggedIn && !shareUserId ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: `/home?shareUserId=${shareUserId}`,
                            state: { from: props.location }
                        }}
                    />
                )
            }
            }
        />
    );
}

export default PrivateRoute;



// // 使用 withRouter 包装组件，以便获取路由相关参数
// const AuthButton = withRouter(({ history }) => {
//     function handleLogout() {
//         // 执行退出登录逻辑
//         history.push('/');
//     }

//     return (
//         isAuthenticated ? (
//             <p>
//                 欢迎！<button onClick={() => handleLogout()}>退出</button>
//             </p>
//         ) : (
//             <p>请先登录</p>
//         )
//     );
// });

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // 检查是否已经登录
//     setIsAuthenticated(true);
//   }, []);

//   return (
//     <div>
//       <AuthButton />
//       <nav>
//         <ul>
//           <li>
//             <Link to="/">首页</Link>
//           </li>
//           <li>
//             <Link to="/dashboard">仪表盘</Link>
//           </li>
//         </ul>
//       </nav>
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <PrivateRoute path="/dashboard" component={Dashboard} isAuthenticated={isAuthenticated} />
//         <Route path="/login" component={Login} />
//       </Switch>
//     </div>
//   );
// }
