const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center px-5 mt-20">
      {children}
    </div>
  );
};

export default AuthLayout;
