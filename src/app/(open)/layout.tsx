import { AuthProvider } from "@/context/AuthContext";
import VerificationLayout from "@/components/Layout/VerificationLayout";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <VerificationLayout>{children}</VerificationLayout>
    </AuthProvider>
  );
}
