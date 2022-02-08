import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          background: "#CACED1",
        }}
      >
        <Toolbar>
          <Box alignContent={"right"}>
            <Button
              style={{ color: "white", background: "#2196F3" }}
              onClick={() => {
                history.push("/");
              }}
            >
              <Typography variant="h6" component="div">
                HOME
              </Typography>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
