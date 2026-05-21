"use client";
import { useMediaQuery } from "react-responsive";
import { useProviderSelector } from "@/app/store/provider";
import { useAppFunctions } from "@/app/hooks/use-app-functions";
import "./aside.styles.scss";

export const Aside = () => {
  const isMobile: boolean = useMediaQuery({ maxWidth: "724px" });

  const { aside } = useProviderSelector("aside");

  const { handleImgError } = useAppFunctions();

  console.log(`aside_${aside}`);

  return (
    <aside className={`rootAsideComponent aside_${aside}`}>
      <div className="boxTitle">
        <h3> Aside Component</h3>
      </div>
      <div className="publicityContainer">
        <div className="boxImage">
          <img
            src="/uy"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              handleImgError(e, isMobile)
            }
            loading="lazy"
            alt="Advertising Book Layout 1"
          />
        </div>
        <div className="boxImage">
          <img
            src="/uy"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              handleImgError(e, isMobile)
            }
            loading="lazy"
            alt="Advertising Book Layout 2"
          />
        </div>
      </div>
    </aside>
  );
};
