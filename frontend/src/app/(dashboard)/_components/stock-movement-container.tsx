export const StockMovementContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <section className="grid gap-4 xl:grid-cols-3">{children}</section>;
};
