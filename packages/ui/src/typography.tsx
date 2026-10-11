import MuiTypography, {
  type TypographyProps,
} from "@mui/material/Typography";

type AppTypographyVariant =
  | "pageTitle"
  | "sectionTitle"
  | "subtitle"
  | "body"
  | "caption";

interface AppTypographyProps
  extends Omit<TypographyProps, "variant"> {
  variant?: AppTypographyVariant;
}

const variantMap = {
  pageTitle: "h1",
  sectionTitle: "h3",
  subtitle: "h6",
  body: "body1",
  caption: "caption",
} as const;

export function AppTypography({
  variant = "body",
  children,
  ...props
}: AppTypographyProps) {
  return (
    <MuiTypography
      variant={variantMap[variant]}
      {...props}
    >
      {children}
    </MuiTypography>
  );
}