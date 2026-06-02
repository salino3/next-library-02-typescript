"use client";
import { ImageComponent } from "@/app/common-app/image/image.component";
import "./dashboard-content.styles.scss";

export const DashboardContent = () => {
  // const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <div className="DashboardContent">
      <div className="boxCardTitle">
        <div className="leftBox">
          <h1>Library with Next</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius
            eveniet rem minus labore quia dolores et, temporibus fuga distinctio
            a, possimus ab aliquid incidunt voluptatibus. Modi officia aliquam
            esse corporis.
          </p>
        </div>
        {/*  */}
        <div className="rightBox">
          <ImageComponent
            vertical
            src="/images/Book_Cover.svg"
            lazy={"lazy"}
            // onLoad={() => setIsLoaded(true)}
            alt="Advertising Book Layout 2"
            customStyle={"boxImageDashboard"}
          />
        </div>
      </div>
    </div>
  );
};
