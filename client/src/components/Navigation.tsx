import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Button,
} from "@mui/material";
import {
  Home as HomeIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Schedule as ScheduleIcon,
  SwapHoriz as SwapHorizIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Role } from "../generated/graphql";
import { useTranslation } from "react-i18next";

interface NavigationProps {
  user?: User;
  onSignOut: () => Promise<void>;
}

const drawerWidth = 240;

const Navigation: React.FC<NavigationProps> = ({ user, onSignOut }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      text: t("navigation.home"),
      icon: <HomeIcon />,
      path: "/",
      requiresAuth: false,
    },
    {
      text: t("navigation.addItem"),
      icon: <AddIcon />,
      path: "/item/create",
      requiresAuth: true,
      requiresActive: true,
    },
    {
      text: t("navigation.searchItems"),
      icon: <SearchIcon />,
      path: "/item/all",
      requiresAuth: false,
    },
    {
      text: t("navigation.recentItems"),
      icon: <ScheduleIcon />,
      path: "/item/recent",
      requiresAuth: false,
    },
    {
      text: t("navigation.transactions"),
      icon: <SwapHorizIcon />,
      path: "/transaction",
      requiresAuth: true,
      requiresActive: true,
    },
  ];

  const adminMenuItems = [
    {
      text: t("navigation.userManagement"),
      icon: <AdminIcon />,
      path: "/admin/user",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleSignOut = async () => {
    try {
      await onSignOut();
      navigate("/");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {/* App Title */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
          {t("app.title", "DLLM Library")}
        </Typography>
        {user && (
          <Typography variant="caption" color="text.secondary">
            {user.nickname || user.email}
          </Typography>
        )}
      </Box>

      <Divider />

      {/* Main Navigation */}
      <List>
        {menuItems.map((item) => {
          // Hide items that require authentication if user is not logged in
          if (item.requiresAuth && !user) {
            return null;
          }
          // Hide items that require active status if user is not active
          if (item.requiresActive && (!user || !user.isActive)) {
            return null;
          }

          const isActive = location.pathname === item.path;

          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={isActive}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {/* Admin Section */}
      {user?.role === Role.Admin && (
        <>
          <Divider />
          <List>
            <ListItem>
              <Typography variant="caption" color="text.secondary">
                {t("navigation.admin", "Admin")}
              </Typography>
            </ListItem>
            {adminMenuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem key={item.path} disablePadding>
                  <ListItemButton
                    selected={isActive}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </>
      )}

      {/* Sign Out Button - at the bottom */}
      {user && (
        <>
          <Box sx={{ flexGrow: 1 }} />
          <Divider />
          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<LogoutIcon />}
              onClick={handleSignOut}
              color="inherit"
            >
              {t("auth.signOut", "Sign Out")}
            </Button>
          </Box>
        </>
      )}
    </Drawer>
  );
};

export default Navigation;
