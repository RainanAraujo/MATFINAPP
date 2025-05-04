import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  title: string;
}
function Navbar({ title }: NavbarProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row gap-2 h-min p-5 bg-[#0095f4] mb-5 pt-10">
      <CaretLeft
        size={32}
        color="#fff"
        onClick={() => {
          navigate(-1);
        }}
      />
      <div className="text-xl font-bold text-center text-white w-full">
        {title}
      </div>
    </div>
  );
}

export default Navbar;
