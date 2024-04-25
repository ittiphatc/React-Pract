import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "./auth-component/authProvider";
import FoodPage from "./component/food";
import LoginPage from "./auth-component/loginPage";
import ProtectedRoute from "./ProtectedRoute";
import Food_Rest_Page from "./component/food_rest";


const RoutesComponent = () => {

    const { token} = useAuth();


    // Define public routes accessible to all users
    const routesForPublic = [
      {
        path: "/",
        element: <FoodPage/>,
      },
    ];
  
    // Define routes accessible only to authenticated users
    const routesForAuthenticatedOnly = [
      {
        path: "/",
        element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
        children: [
          {
            path: "",
            element: <FoodPage/>,
          },
          {
            path: "/market",
            element: <Food_Rest_Page />,
          },
        ],
      },
    ];
  
    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
      {
        path: "/login",
        element: <LoginPage/>,
      },
    ];
  
    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
      ...routesForPublic,
      ...(!token ? routesForNotAuthenticatedOnly : []),
      ...routesForAuthenticatedOnly,
    ]);
  
    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
}

export default RoutesComponent;