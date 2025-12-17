import { CacheProvider } from "@emotion/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo, useEffect, type ReactNode } from "react";
import rtlCache, { ltrCache } from "./config/directionSetup";

type Props = {
  children: ReactNode;
  language: "en" | "ar";
};

export default function DirectionProvider({ children, language }: Props) {
  const isRTL = language === "ar";

  const theme = useMemo(
    () =>
      createTheme({
        direction: isRTL ? "rtl" : "ltr",
      }),
    [isRTL]
  );

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  return (
    <CacheProvider value={isRTL ? rtlCache : ltrCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
