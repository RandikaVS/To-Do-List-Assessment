import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import MainLayout from '../../layouts';


// ----------------------------------------------------------------------


export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    // children: [
    //   { path: 'about-us', element: <AboutPage /> },
    //   {
    //     path: 'product',
    //     children: [
    //       { element: <ProductListPage />, index: true },
    //       { path: 'list', element: <ProductListPage /> }
    //     ],
    //   }
    // ],
  }
];
