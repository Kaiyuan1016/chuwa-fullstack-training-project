import {
  Card,
  TextField,
  CardContent,
  Button,
  Typography,
  Stack,
} from "@mui/material";

const UpdatePasswordForm = ({ userFormHooks }) => {
  const { handleEmailInput, errors, handleUpdatePassword, loading } =
    userFormHooks;

  return (
    <Card
      sx={{
        minWidth: 450,
        marginBottom: "10%",
      }}
    >
      <CardContent>
        <Stack
          direction="column"
          alignItems="center"
          spacing={{ xs: 4, sm: 4 }}
        >
          <Typography variant="h4">Update your password</Typography>
          <Typography>
            Enter you email link, we will send you the recovery link
          </Typography>
          <TextField
            id="email"
            label="Email"
            placeholder="you@example.com"
            variant="standard"
            sx={{ width: "100%" }}
            InputLabelProps={{
              style: { fontSize: "20px" },
            }}
            InputProps={{
              style: { fontSize: "20px" },
            }}
            onChange={handleEmailInput}
            error={Boolean(errors.emailError)}
            helperText={errors.emailError}
          />
            <Button
              variant="contained"
              sx={{
              width: "100%",
              textTransform: "none",
              backgroundColor: '#5048E5', // Set the button color
              '&:hover': {
                backgroundColor: '#4038d5', // Darken the button color slightly on hover for feedback
              },
            }}
            onClick={handleUpdatePassword}
            disabled={loading}
          >
            {loading ? "Loading" : "Update"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UpdatePasswordForm;
