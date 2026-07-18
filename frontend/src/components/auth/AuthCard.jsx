function AuthCard({ children }) {
  return (
    <div className="w-full max-w-md rounded-xl bg-zinc-900/90 p-8 shadow-2xl">
      {children}
    </div>
  );
}

export default AuthCard;
