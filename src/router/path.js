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
          title:'Login | Welcome to PPMS'
        },
        name: 'Signin',
        beforeEnter: (to, from, next) => {
          //console.log('from -'+this.$route.redirectedFrom)
          next()
        },
        component: () => import(

          '@/components/Signin.vue'
        )
      },
      {
        path: '/signout',
        meta: {
          public: true,
          title:'Logout | Welcome to PPMS'
        },
        name: 'Signout',
        beforeEnter: (to, from, next) => {
          //console.log('from -'+this.$route.redirectedFrom)
          next()
        },
        component: () => import(

          '@/components/Signin.vue'
        )
      },
    {
      path: '/signup',
      meta: {
        public: true,
        title:'Sign up here | Welcome to PPMS'
      },
      name: 'Signup',
      component: () => import(

        '@/components/Signup.vue'
      )
    },
    {
      path: '/',
      meta: { public: true,title:'Welcome to PPMS'},
      name: 'Welcome',
      component: () => import(

        '@/components/Welcome.vue'
      )
    },

    {
      path: '/dashboard',
      meta: { breadcrumb: true,title:'Dashboard | Welcome to PPMS' },
      name: 'DashboardOffice',
      component: () => import(

       '@/components/Dashboard/Office'
      )
    },
    {
      path: '/downloads',
      meta: { breadcrumb: true,title:'Downloads | Welcome to PPMS' },
      name: 'Downloads',
      component: () => import(

       '@/components/Downloads'
      )
    },
    {
      path: '/exports',
      meta: { breadcrumb: true,title:'Exports | Welcome to PPMS' },
      name: 'Exports',
      component: () => import(

       '@/components/Exports'
      )
    },
    {
      path: '/dashboard/help',
      meta: { breadcrumb: true,title:'Help | Welcome to PPMS' },
      name: 'Help',
      component: () => import(

        '@/components/pages/Help.vue'
      )
    },
    {
      path: '/office/list',
      meta: {title:'View office | Welcome to PPMS'},
      name: 'ViewOffice',
      component: () => import(

        '@/components/OfficeView.vue'
      )
    },
    {
      path: '/office/create',
      meta: {title:'Create new office | Welcome to PPMS'},
      name: 'CreateOffice',
      component: () => import(

        '@/components/Office'
      )
    },
    {
      path: `/office/:id/edit/`,
      meta: {title:'Edit office | Welcome to PPMS'},
      name: 'OfficeEdit',
      component: () => import(

        '@/components/OfficeEdit'
      )
    },
    {
      path: `/office/edit/`,
      meta: {title:'Edit your office | Welcome to PPMS'},
      name: 'EditOffice',
      component: () => import(

        '@/components/EditOffice'
      )
    },
    {
      path: `/report/pp1`,
      meta: {title:'Print PP1 Data | Welcome to PPMS'},
      name: 'PrintPP1Data',
      component: () => import(

        '@/components/PrintPP1Data'
      )
    },
    {
      path: `/report/pp2`,
      meta: {title:'Print PP2 Data | Welcome to PPMS'},
      name: 'PrintPP2Data',
      component: () => import(

        '@/components/PrintPP2Data'
      )
    },
    {
      path: '/personnel/list',
      meta: {title:'View Personnel | Welcome to PPMS'},
      name: 'Viewpersonnel',
      component: () => import(

        '@/components/PersonnelView'
      )
    },
    {
      path: '/personnel/create',
      meta: {title:'Create new personnel | Welcome to PPMS'},
      name: 'CreatePersonnel',
      component: () => import(

        '@/components/Personnel'
      )
    },
    {
      path: `/personnel/:id/edit/`,
      meta: {title:'Edit personnel | Welcome to PPMS'},
      name: 'PersonnelEdit',
      component: () => import(

        '@/components/PersonnelEdit'
      )
    },
    {
      path: `/users/create`,
      meta: {title:'Create User | Welcome to PPMS'},
      name: 'UserCreate',
      component: () => import(

        '@/components/UserCreate'
      )
    },
    {
      path: '/users/list',
      meta: {title:'View User | Welcome to PPMS'},
      name: 'ViewUser',
      component: () => import(

        '@/components/UsersView'
      )
    },
    {
      path: `/user/:id/edit/`,
      meta: {title:'Edit user | Welcome to PPMS'},
      name: 'UserEdit',
      component: () => import(

        '@/components/PersonnelEdit'
      )
    },
    {
      path: `/misreport/district`,
      meta: {title:'See All Report for District | Welcome to PPMS'},
      name: 'MISReport District',
      component: () => import(

        '@/components/MisReport'
      )
    },
    {
      path: `/misreport/district/:id`,
      meta: {title:'See All Report for Subdivision | Welcome to PPMS'},
      name: 'MISReportSubdivision',
      component: () => import(

        '@/components/MisreportSubdivision'
      )
    },
    {
      path: `/misreport/assembly`,
      meta: {title:'See All Report for Assembly | Welcome to PPMS'},
      name: 'MISReport Assembly',
      component: () => import(

        '@/components/MisReportAssembly'
      )
    },
    {
      path: `/change_password`,
      meta: {title:'Change your password | Welcome to PPMS'},
      name: 'Change password',
      component: () => import(

        '@/components/ChangePassword'
      )
    },
  ];
