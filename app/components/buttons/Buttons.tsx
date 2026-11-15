import Card from "../flexBox/Card";
import Text from "../text/Text";
import Link from "next/link";

type ButtonProps = {
  label: string;
  path?: string;
  onClick?: () => void;
};

export const BackButton = ({ label, path }: ButtonProps) => {
  return (
    <Link href={{ pathname: path }} passHref>
      <Card
        size={60}
        backgroundColor={2}
        justifyContent="center"
        alignItems="center"
        style={{ cursor: "pointer" }}
      >
        <Text weight={600} color={1}>
          {label}
        </Text>
      </Card>
    </Link>
  );
};

export const NextButton = ({ label, path, onClick }: ButtonProps) => {
  return (
    <Link href={{ pathname: path }} passHref onClick={onClick}>
      <Card
        size={50}
        backgroundColor={2}
        justifyContent="center"
        alignItems="center"
        style={{ cursor: "pointer" }}
      >
        <Text weight={600} color={1}>
          {label}
        </Text>
      </Card>
    </Link>
  );
};
