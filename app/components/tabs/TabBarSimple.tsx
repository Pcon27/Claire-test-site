"use client";

import Card from "../flexBox/Card";
import Text from "../text/Text";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TabBarSimple = () => {
  const pathname = usePathname();
  const tabs = [
    { label: "Portfolio", href: "/" },
    { label: "About", href: "/about" },
  ];

  return (
    <header>
      <Card flexDirection="row">
        {tabs.map((tab) => (
          <Link key={tab.label} href={tab.href} passHref>
            <Card key={tab.label}>
              <Text
                color={3}
                hover="underline"
                underline={pathname === tab.href}
              >
                {tab.label}
              </Text>
            </Card>
          </Link>
        ))}
      </Card>
    </header>
  );
};

export default TabBarSimple;
