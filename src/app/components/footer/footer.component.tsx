import { ImageComponent } from "@/app/common-app/image/image.component";
import "./footer.styles.scss";

export const Footer = () => {
  return (
    <footer className="rootFooter">
      <ImageComponent
        src="/icons/Border_Footer.svg"
        alt="icon"
        lazy="lazy"
        customStyle={"squareImgFooter"}
        vertical
      />
      <div className="contanerFooter">
        <ImageComponent
          src="/icons/Mark_Icon.svg"
          alt="icon"
          lazy="lazy"
          customStyle={"imgMarkIcon"}
          vertical
        />
        <div className="BoxFooterTitle">
          <h3>Next App Library</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
            provident harum! Similique voluptate repellendus, nesciunt accusamus
            et aliquam delectus assumenda provident, modi quia adipisci vel,
            ipsa neque optio in aspernatur.
          </p>
        </div>
        <button className="btnFooter">Lorem ipsum dolor sit</button>
      </div>
    </footer>
  );
};
