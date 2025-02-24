import { useRoutes } from 'react-router-dom';
import { mainRoutes } from './main';
import HomePage from '../../pages/home';
import MainLayout from '../../layouts';


export default function Router() {
  
  return useRoutes([


    {
      path: '/',
      element: (
        <MainLayout>
          <HomePage/>
        </MainLayout>
      ),
    },

    ...mainRoutes,

  ]);
}
