export const FooterSection = () => {
  return (
    <footer className="bg-foreground py-6 px-4">
      <div className="container mx-auto text-center">
        <p className="text-sm font-medium text-cream">
          Pizza Burguer © {new Date().getFullYear()}
        </p>
        <p className="text-xs text-cream/60">
          Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
};
