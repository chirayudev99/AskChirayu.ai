import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = ({ to, bg, textColor, text, onClick }: Props) => {
  return (
    <Link
      onClick={onClick}
      to={to}
      style={{
        background: bg,
        color: textColor,
        textDecoration: "none",
        padding: "9px 14px",
        borderRadius: "999px",
        fontSize: "13px",
        fontWeight: 600,
      }}
    >
      {text}
    </Link>
  );
};

export default NavigationLink;
