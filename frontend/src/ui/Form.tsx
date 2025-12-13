import { Box, Card, CardContent, Typography } from "@mui/material";

function Form({
  children,
  title,
  onSubmit,
}: {
  children: React.ReactNode;
  title: string;
  onSubmit?: () => void;
}) {
  return (
    <Box className="bg-main xl:w-4/7 lg:w-4/5 mx-auto p-4">
      <Card
        sx={{
          width: "100%",
          borderRadius: "16px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            sx={{
              background:
                "linear-gradient(to right, var(--color-gradient-1), var(--color-gradient-2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
            }}
          >
            {title}
          </Typography>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {children}
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Form;
