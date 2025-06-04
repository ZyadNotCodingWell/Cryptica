





export default function Footer() {
  return (
    <footer className="bg-black/80 border-t border-neutral-800 py-6 px-8 text-center text-sm text-neutral-600">
      <p>&copy; {new Date().getFullYear()} Solance AI. All rights reserved.</p>
      <p className="text-xs mt-2">Made with code, countles cigarettes, caffeine, and love, with hopes to inspire learners and devs.</p>
    </footer>
  );
};