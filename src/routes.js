// import React from "react";

// import { Icon } from "@chakra-ui/react";

// Admin Imports
import Admin from "./views/dashboard/admin/Admin";
import Profile from "./views/profile/Profile";

import { Icon } from "@chakra-ui/react";
import {
  MdHome,
} from "react-icons/md";

const routes = [
  {
    name: "Admin",
    layout: "/admin",
    path: "/admin",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Admin,
  },
  {
    name: "Profile",
    layout: "/profile",
    path: "/profile",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: Profile,
  }
];

export default routes;
