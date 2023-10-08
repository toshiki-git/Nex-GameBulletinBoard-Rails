import Link from "next/link";
import { useMemo } from "react";
import { IconContext } from "react-icons";
import { usePathname } from "next/navigation";
import headerCSS from "./Header.module.scss";

type MenuTabProps = {
  name: string;
  icon: React.ReactNode;
  url: string;
};

const HeaderItem = ({ name, icon, url }: MenuTabProps) => {
  const fontSize = useMemo(() => ({ size: "18px" }), []);
  const router = usePathname();

  let activateClass = "";
  if (router === url) {
    activateClass = "text-primary bg-focus";
  }

  return (
    <Link href={url}>
      <div
        className={`${headerCSS.headerItem} ${activateClass} select-none rounded-lg my-2 hover:bg-focus`}
      >
        <div
          className={`${headerCSS.headerItem__icon} flex flex-col justify-center`}
        >
          <IconContext.Provider value={fontSize}>{icon}</IconContext.Provider>
        </div>
        <div
          className={`${headerCSS.headerItem__name} flex flex-col justify-center font-bold px-4`}
        >
          {name}
        </div>
      </div>
    </Link>
  );
};

export default HeaderItem;
