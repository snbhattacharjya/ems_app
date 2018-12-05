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
          title:'Login | Welcome to WBPPMS'
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
          title:'Logout | Welcome to WBPPMS'
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
        title:'Sign up here | Welcome to WBPPMS'
      },
      name: 'Signup',
      component: () => import(

        '@/components/Signup.vue'
      )
    },
    {
      path: '/',
      meta: { public: true,title:'Welcome to WBPPMS'},
      name: 'Welcome',
      component: () => import(

        '@/components/Welcome.vue'
      )
    },

    {
      path: '/dashboard',
      meta: { breadcrumb: true,title:'Dashboard | Welcome to WBPPMS' },
      name: 'DashboardOffice',
      component: () => import(

       '@/components/Dashboard/Office'
      )
    },
    {
      path: '/downloads',
      meta: { breadcrumb: true,title:'Downloads | Welcome to WBPPMS' },
      name: 'Downloads',
      component: () => import(

       '@/components/Downloads'
      )
    },
    {
      path: '/exports',
      meta: { breadcrumb: true,title:'Exports | Welcome to WBPPMS' },
      name: 'Exports',
      component: () => import(

       '@/components/Exports'
      )
    },
    {
      path: '/dashboard/help',
      meta: { breadcrumb: true,title:'Help | Welcome to WBPPMS' },
      name: 'Help',
      component: () => import(

        '@/components/pages/Help.vue'
      )
    },
    {
      path: '/dashboard/contact',
      meta: { breadcrumb: true,title:'Contact | Welcome to WBPPMS' },
      name: 'Contact',
      component: () => import(

        '@/components/pages/Contact.vue'
      )
    },
    {
      path: '/office/list',
      meta: {title:'View office | Welcome to WBPPMS'},
      name: 'ViewOffice',
      component: () => import(

        '@/components/OfficeView.vue'
      )
    },
    {
      path: '/office/create',
      meta: {title:'Create new office | Welcome to WBPPMS'},
      name: 'CreateOffice',
      component: () => import(

        '@/components/Office'
      )
    },
    {
      path: `/office/:id/edit/`,
      meta: {title:'Edit office | Welcome to WBPPMS'},
      name: 'OfficeEdit',
      component: () => import(

        '@/components/OfficeEdit'
      )
    },
    {
      path: `/office/edit/`,
      meta: {title:'Edit your office | Welcome to WBPPMS'},
      name: 'EditOffice',
      component: () => import(

        '@/components/EditOffice'
      )
    },
    {
      path: `/misreport/pp1`,
      meta: {title:'Print PP1 Data | Welcome to WBPPMS'},
      name: 'PrintPP1Data',
      component: () => import(

        '@/components/PrintPP1Data'
      )
    },
    {
      path: `/misreport/pp2`,
      meta: {title:'Print PP2 Data | Welcome to WBPPMS'},
      name: 'PrintPP2Data',
      component: () => import(

        '@/components/PrintPP2Data'
      )
    },
    {
      path: '/personnel/list',
      meta: {title:'View Personnel | Welcome to WBPPMS'},
      name: 'Viewpersonnel',
      component: () => import(

        '@/components/PersonnelView'
      )
    },
    {
      path: '/personnel/create',
      meta: {title:'Create new personnel | Welcome to WBPPMS'},
      name: 'CreatePersonnel',
      component: () => import(

        '@/components/Personnel'
      )
    },
    {
      path: `/personnel/:id/edit/`,
      meta: {title:'Edit personnel | Welcome to WBPPMS'},
      name: 'PersonnelEdit',
      component: () => import(

        '@/components/PersonnelEdit'
      )
    },
    {
      path: `/users/create`,
      meta: {title:'Create User | Welcome to WBPPMS'},
      name: 'UserCreate',
      component: () => import(

        '@/components/UserCreate'
      )
    },
    {
      path: '/users/list',
      meta: {title:'View User | Welcome to WBPPMS'},
      name: 'ViewUser',
      component: () => import(

        '@/components/UsersView'
      )
    },
    {
      path: `/user/:id/edit/`,
      meta: {title:'Edit user | Welcome to WBPPMS'},
      name: 'UserEdit',
      component: () => import(

        '@/components/UserEdit'
      )
    },
    {
      path: `/profile`,
      meta: {title:'Profile | Welcome to WBPPMS'},
      name: 'Profile',
      component: () => import(

        '@/components/UserEdit'
      )
    },
    {
      path: `/misreport/district`,
      meta: {title:'See All Report for District | Welcome to WBPPMS'},
      name: 'MISReport District',
      component: () => import(

        '@/components/MisReport'
      )
    },
    {
      path: `/misreport/district/:id`,
      meta: {title:'See All Report for Subdivision | Welcome to WBPPMS'},
      name: 'MISReportSubdivision',
      component: () => import(

        '@/components/MisreportSubdivision'
      )
    },
    {
      path: `/misreport/assembly`,
      meta: {title:'See All Report for Assembly | Welcome to WBPPMS'},
      name: 'MISReport Assembly',
      component: () => import(

        '@/components/MisReportAssembly'
      )
    },
    {
      path: `/change_password`,
      meta: {title:'Change your password | Welcome to WBPPMS'},
      name: 'Change password',
      component: () => import(

        '@/components/ChangePassword'
      )
    },
    {
      path: `/pppoststat`,
      meta: {title:'Set rules for PP post Status | Welcome to WBPPMS'},
      name: 'PPpostStatus',
      component: () => import(

        '@/components/Pppoststat'
      )
    },
    {
      path: `/pppoststatlist`,
      meta: {title:'View rules for PP post Status | Welcome to WBPPMS'},
      name: 'PPpostStatusList',
      component: () => import(

        '@/components/PppoststatList'
      )
    },
    {
      path: `/resetpassword`,
      meta: {title:'Reset Password for Personnel | Welcome to WBPPMS'},
      name: 'ResetPassword',
      component: () => import(

        '@/components/ResetPassword'
      )
    },
    {
      path: `/poststatus_bulk_update`,
      meta: {title:'Bulk update post status for Personnel | Welcome to WBPPMS'},
      name: 'PoststatusbulkUpdate',
      component: () => import(

        '@/components/PoststatusbulkUpdate'
      )
    },
    {
      path: `/office_status_zero`,
      meta: {title:'Office Status(0% updated) | Welcome to WBPPMS'},
      name: 'OfficeSttatus',
      component: () => import(

        '@/components/OfficeStatus'
      )
    },
    {
      path: `/office_status_complete`,
      meta: {title:'Office Status(100% updated) | Welcome to WBPPMS'},
      name: 'OfficesttatusComplete',
      component: () => import(

        '@/components/OfficestatusComplete'
      )
    },
    {
      path: `/assembly_wise_reserved`,
      meta: {title:'Office Status | Welcome to WBPPMS'},
      name: 'AssemblywiseReserved',
      component: () => import(

        '@/components/AssemblyReserved'
      )
    },
    {
      path: `/assembly_groupby_subdivision`,
      meta: {title:'Subdivision wise Assembly Report | Welcome to WBPPMS'},
      name: 'AssemblybySubdivision',
      component: () => import(

        '@/components/AssemblybySubdivision'
      )
    },
    {
      path: `/pollingpersonnel_progress_report`,
      meta: {title:'Polling Personnel Progress Report | Welcome to WBPPMS'},
      name: 'ProgessReport',
      component: () => import(

        '@/components/ProgressReport'
      )
    },
    {
      path: `/office_partials`,
      meta: {title:'Office list partially updated | Welcome to WBPPMS'},
      name: 'OfficePartial',
      component: () => import(

        '@/components/OfficePartial'
      )
    },
  ];
