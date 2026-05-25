"use client";
import { ImageComponent } from "@/app/common-app/image/image.component";
import "./dashboard-sub-content.styles.scss";

export const DashboardSubContent = () => {
  return (
    <div className="DashboardSubContent">
      <div className="upBox">
        <div className="firstParragraph">
          <h3 className="title">Title Content</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            odit ullam modi accusamus labore atque quasi numquam optio! Quas
            quasi non doloribus, cupiditate libero odit sint iusto accusantium
            perferendis nesciunt. Quidem libero dolor iure, quia cupiditate quas
            labore iste atque repudiandae voluptate sunt debitis accusamus?
            Veritatis nesciunt debitis distinctio optio numquam autem
            perspiciatis fuga architecto labore repellat! Laborum, voluptates
            excepturi? .. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Laboriosam odit ullam modi accusamus labore atque quasi
            numquam optio! Quas quasi non doloribus, cupiditate libero odit sint
            iusto accusantium perferendis nesciunt. Quidem libero dolor iure,
            quia cupiditate quas labore iste atque repudiandae voluptate sunt
            debitis accusamus? Veritatis nesciunt debitis distinctio optio
            numquam autem perspiciatis fuga architecto labore repellat! Laborum,
            voluptates excepturi?
          </p>
        </div>

        <div className="secondParragraph">
          <h3 className="title">Title Content</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            odit ullam modi accusamus labore atque quasi numquam optio! Quas
            quasi non doloribus, cupiditate libero odit sint iusto accusantium
            perferendis nesciunt. Quidem libero dolor iure, quia cupiditate quas
            labore iste atque repudiandae voluptate sunt debitis accusamus?
            Veritatis nesciunt debitis distinctio optio numquam autem
            perspiciatis fuga architecto labore repellat! Laborum, voluptates
            excepturi? .. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Laboriosam odit ullam modi accusamus labore atque quasi
            numquam optio! Quas quasi non doloribus, cupiditate libero odit sint
            iusto accusantium perferendis nesciunt. Quidem libero dolor iure,
            quia cupiditate quas labore iste atque repudiandae voluptate sunt
            debitis accusamus? Veritatis nesciunt debitis distinctio optio
            numquam autem perspiciatis fuga architecto labore repellat! Laborum,
            voluptates excepturi?
          </p>
        </div>
      </div>

      <div className="downBox">
        <ImageComponent
          alt="Authors Image"
          lazy="lazy"
          src="/images/authors_images_bar.png"
          vertical={false}
          customStyle="authorsBarImage"
        />
      </div>
    </div>
  );
};
