export default function Footer() {
  return (
    <footer className="p-4 text-center bg-gray-400 text-gray-700 text-lg">
      {" "}
      © {new Date().getFullYear()} - @
      <a href="https://github.com/VohraAK" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-500" >VohraAK</a>
    </footer>
  );
}
