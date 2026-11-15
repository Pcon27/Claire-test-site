import Card from "../components/flexBox/Card";
import Text from "../components/text/Text";
import { SiteType } from "../siteData/projectData";

export default function InfoSite({ name, url }: SiteType) {
  return (
    <Card
      key={name}
      backgroundColor={5}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      size={40}
      radius={0}
      onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
      hoverColor={2}
      borderColor={2}
    >
      <Text color={3} weight={600} size={40}>
        {name}
      </Text>
      <Text color={3} weight={400} size={20}>
        {url}
      </Text>
    </Card>
  );
}
