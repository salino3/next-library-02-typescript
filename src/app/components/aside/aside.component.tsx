"use client";
import { useAppFunctions } from "@/app/hooks/use-app-functions";
import "./aside.styles.scss";

export const Aside = () => {
  const { handleImgError } = useAppFunctions();

  return (
    <aside>
      <h3> Aside Component</h3>
      <div className="publicityContainer">
        <div className="boxImage">
          <img
            src="/uy"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              handleImgError(e, true)
            }
            loading="lazy"
            alt="Advertising 1"
          />
        </div>
        <div className="boxImage">
          <img
            src="/ie"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) =>
              handleImgError(e, true)
            }
            loading="lazy"
            alt="Advertising 2"
          />
        </div>
      </div>
    </aside>
  );
};
