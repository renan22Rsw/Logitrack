import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type AuthCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  footerLabel: string;
  footerLink: string;
};

export const AuthCard = ({
  title,
  description,
  children,
  footerLabel,
  footerLink,
}: AuthCardProps) => {
  return (
    <Card className="w-full max-w-100">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>{children}</CardContent>

      <CardFooter className="flex items-center justify-center">
        <Link href={footerLink}>
          <p className="text-muted-foreground hover:underline">{footerLabel}</p>
        </Link>
      </CardFooter>
    </Card>
  );
};
