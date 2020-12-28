/* eslint-disable import/no-unresolved */
import AdminHomePage from 'containers/AdminHomePage';
import Taskboard from 'containers/Taskboard';
import LoginPage from 'containers/LoginPage';
import SignupPage from 'containers/SignupPage';

export const ADMIN_ROUTES = [
  {
    name: 'Trang quản trị',
    path: '/admin',
    exact: true,
    component: AdminHomePage,
  },
  {
    name: 'Quản lý công việc',
    path: '/admin/task-board',
    component: Taskboard,
  },
];
export const DEFAULT_ROUTES = [
  {
    name: 'Trang đăng nhập',
    path: '/login',
    component: LoginPage,
  },
  {
    name: 'Đăng ký',
    path: '/signup',
    component: SignupPage,
  },
];
