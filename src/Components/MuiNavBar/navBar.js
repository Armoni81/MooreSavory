//React imports
import * as React from "react";
//Material UI
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";

export default function ButtonAppBar({ cartLength }) {
  const getSaladCart = JSON.parse(sessionStorage.getItem("cart")) || [];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link color="inherit" sx={{ flexGrow: 1 }} href="/" underline="none">
            Moore Savory Foods
          </Link>
          <Button color="inherit">Login</Button>
          <Button color="inherit" href="/order">
            Order
          </Button>
          <Box sx={{ display: { xs: "flex", md: "flex", lg: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              href="/cart"
            >
              <Badge badgeContent={getSaladCart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
