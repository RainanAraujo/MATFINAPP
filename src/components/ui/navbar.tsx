import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  title: string;
}
function Navbar({ title }: NavbarProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row gap-2 h-min">
      <CaretLeft
        size={32}
        color="#000"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="text-2xl font-bold text-center text-gray-800 w-full">
        {title}
      </div>
    </div>
  );
}

export default Navbar;
