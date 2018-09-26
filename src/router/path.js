export default [

    {
      path: '*',
      meta: {
        public: true,
      },
      redirect: {
        path: '/404'
      }
    },
    {
      path: '/404',
      meta: {
        public: true,
        title:'Opps ! 404 not found.'
      },
      name: 'NotFound',
      component: () => import(

        '@/components/pages/NotFound.vue'
      )
    },
    {
      path: '/403',
      meta: {
        public: true,
        title:'Bad !! Access denied'
      },
      name: 'AccessDenied',
      component: () => import(

        '@/components/pages/Deny.vue'
      )
    },
    {
      path: '/500',
      meta: {
        public: true,
        title:'Server error'
      },
      name: 'ServerError',
      component: () => import(

        '@/components/pages/Error.vue'
      )
    },
    {
        path: '/sandbox',
        meta: {
          public: true,
        },
        name: 'Sandbox',
        component: () => import(

          '@/components/pages/Sandbox.vue'
        )
      },
      {
        path: '/signin',
        meta: {
          public: true,
          title:'Login | Welcome to EMS'
        },
        name: 'Signin',
        component: () => import(

          '@/components/Signin.vue'
        )
      },

    {
      path: '/signup',
      meta: {
        public: true,
        title:'Sign up here | Welcome to EMS'
      },
      name: 'Signup',
      component: () => import(

        '@/components/Signup.vue'
      )
    },
    {
      path: '/',
      meta: { public: true,title:'Welcome to EMS'},
      name: 'Welcome',
      component: () => import(

        '@/components/Welcome.vue'
      )
    },

    {
      path: '/dashboard',
      meta: { breadcrumb: true,title:'Dashboard | Welcome to EMS' },
      name: 'DashboardOffice',
      component: () => import(

       '@/components/Dashboard/Office'
      )
    },
    {
      path: '/dashboard/help',
      meta: { breadcrumb: true,title:'Help | Welcome to EMS' },
      name: 'Help',
      component: () => import(

        '@/components/pages/Help.vue'
      )
    },
    {
      path: '/office/list',
      meta: {title:'View office | Welcome to EMS'},
      name: 'ViewOffice',
      component: () => import(

        '@/components/OfficeView.vue'
      )
    },
    {
      path: '/office/create',
      meta: {title:'Create new office | Welcome to EMS'},
      name: 'CreateOffice',
      component: () => import(

        '@/components/Office'
      )
    },
    {
      path: `/office/:id/edit/`,
      meta: {title:'Edit office | Welcome to EMS'},
      name: 'OfficeEdit',
      component: () => import(

        '@/components/OfficeEdit'
      )
    },
    {
      path: `/office/edit/`,
      meta: {title:'Edit your office | Welcome to EMS'},
      name: 'EditOffice',
      component: () => import(

        '@/components/EditOffice'
      )
    },
    {
      path: '/personnel/list',
      meta: {title:'View Personnel | Welcome to EMS'},
      name: 'Viewpersonnel',
      component: () => import(

        '@/components/PersonnelView'
      )
    },
    {
      path: '/personnel/create',
      meta: {title:'Create new personnel | Welcome to EMS'},
      name: 'CreatePersonnel',
      component: () => import(

        '@/components/Personnel'
      )
    },
    {
      path: `/personnel/:id/edit/`,
      meta: {title:'Edit personnel | Welcome to EMS'},
      name: 'PersonnelEdit',
      component: () => import(

        '@/components/PersonnelEdit'
      )
    },
    {
      path: `/users/create`,
      meta: {title:'Create User | Welcome to EMS'},
      name: 'UserCreate',
      component: () => import(

        '@/components/UserCreate'
      )
    },
    {
      path: '/users/list',
      meta: {title:'View User | Welcome to EMS'},
      name: 'ViewUser',
      component: () => import(

        '@/components/UsersView'
      )
    },
    {
      path: `/user/:id/edit/`,
      meta: {title:'Edit user | Welcome to EMS'},
      name: 'UserEdit',
      component: () => import(

        '@/components/PersonnelEdit'
      )
    },
    {
      path: `/misreport/district`,
      meta: {title:'See All Report for District | Welcome to EMS'},
      name: 'MISReport District',
      component: () => import(

        '@/components/MisReport'
      )
    },
    {
      path: `/misreport/district/:id`,
      meta: {title:'See All Report for Subdivision | Welcome to EMS'},
      name: 'MISReportSubdivision',
      component: () => import(

        '@/components/MisreportSubdivision'
      )
    },
    {
      path: `/misreport/assembly`,
      meta: {title:'See All Report for Assembly | Welcome to EMS'},
      name: 'MISReport Assembly',
      component: () => import(

        '@/components/MisReportAssembly'
      )
    },
  ];
