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
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "/nft-marketplace",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
  //   path: "/data-tables",
  //   component: DataTables,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "/profile",
  //   icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
  //   component: Profile,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "/sign-in",
  //   icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
  //   component: SignInCentered,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "/rtl-default",
  //   icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
  //   component: RTL,
  // },
];

export default routes;
