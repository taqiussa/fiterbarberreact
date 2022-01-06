/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Notifications from "views/Notifications.js";
import Pegawai from "views/pages/pegawai/Pegawai";
import Pemasukan from "views/pages/pemasukan/Pemasukan";
import Pengeluaran from "views/pages/pengeluaran/Pengeluaran";
import Laporan from "views/pages/laporan/Laporan";
import Libur from "views/pages/libur/Libur";
import Bon from "views/pages/bon/Bon";
import Keuangan from "views/pages/keuangan/Keuangan";
import Logout from "views/auth/Logout";
const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/pegawai",
    name: "Pegawai",
    icon: "nc-icon nc-circle-09",
    component: Pegawai,
    layout: "/admin",
  },
  {
    path: "/pemasukan",
    name: "Pemasukan",
    icon: "nc-icon nc-chart-bar-32",
    component: Pemasukan,
    layout: "/admin",
  },
  {
    path: "/pengeluaran",
    name: "Pengeluaran",
    icon: "nc-icon nc-cart-simple",
    component: Pengeluaran,
    layout: "/admin",
  },
  {
    path: "/libur",
    name: "Libur",
    icon: "nc-icon nc-badge",
    component: Libur,
    layout: "/admin",
  },
  {
    path: "/bon",
    name: "Bon",
    icon: "nc-icon nc-paper-2",
    component: Bon,
    layout: "/admin",
  },
  {
    path: "/laporan",
    name: "Laporan",
    icon: "nc-icon nc-single-copy-04",
    component: Laporan,
    layout: "/admin",
  },
  {
    path: "/keuangan",
    name: "Keuangan",
    icon: "nc-icon nc-notes",
    component: Keuangan,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    invisible: true,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    invisible: true,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    invisible: true,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    invisible: true,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    invisible: true,
    layout: "/admin",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "nc-icon nc-bell-55",
    component: Logout,
    layout: "/admin",
  },
];

export default dashboardRoutes;
