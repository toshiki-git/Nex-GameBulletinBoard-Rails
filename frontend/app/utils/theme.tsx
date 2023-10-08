import { useTheme } from "next-themes";

const useSwitchTheme = () => {
  const { theme, setTheme } = useTheme();

  function switchTheme() {
    switch (theme) {
      case "dark":
        setTheme("light");
        break;
      case "light":
        setTheme("dark");
        break;
      default:
        setTheme("dark");
        break;
    }
  }

  return switchTheme;
};

export default useSwitchTheme;
