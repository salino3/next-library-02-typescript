import { LayoutDashboard } from "./(layouts)/(dashboard)/page";
import style from "./page.module.scss";

export default function Home() {
  return (
    <div className={style.rootHome}>
      <aside>Aside</aside>
      <LayoutDashboard />
    </div>
  );
}
