type AuthLayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="w-full h-screen relative min-h-screen bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle,var(--border)_2px,transparent_2px)] bg-size-[24px_24px] opacity-40"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.25),transparent_70%)]"></div>
      <div className="relative z-10">{children}</div>
    </main>
  );
}
