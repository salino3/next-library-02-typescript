import { LayoutDashboard } from "./(layouts)/(dashboard)/page";
import { Aside } from "./components/aside/aside.component";
import style from "./page.module.scss";

export default function Home() {
  return (
    <div className={style.rootHome}>
      <Aside />
      <LayoutDashboard />
    </div>
  );
}
