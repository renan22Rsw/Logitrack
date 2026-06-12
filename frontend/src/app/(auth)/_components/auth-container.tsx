export const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center px-4 py-24">
      {children}
    </div>
  );
};
